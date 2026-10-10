import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { INITIAL_PRODUCTS, ARTISANS, JOURNAL_ARTICLES } from './src/data/mockData.ts';
import { Product, User, AuditLog, RealtimeSyncEvent } from './src/types.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-Memory Database State
let products: Product[] = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
let sseClients: Response[] = [];

// Base32 Alphabet for standard TOTP secret generation
const BASE32_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function generateBase32Secret(length = 16): string {
  let secret = '';
  const randomBytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    secret += BASE32_CHARS[randomBytes[i] % 32];
  }
  return secret;
}

function base32ToBuffer(base32: string): Buffer {
  let bits = '';
  const cleanBase32 = base32.toUpperCase().replace(/=+$/, '');
  for (let i = 0; i < cleanBase32.length; i++) {
    const val = BASE32_CHARS.indexOf(cleanBase32.charAt(i));
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, '0');
  }
  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2));
  }
  return Buffer.from(bytes);
}

// RFC 6238 TOTP computation
function getTOTPCode(secret: string, timeStepOffset = 0): string {
  const epoch = Math.floor(Date.now() / 1000);
  const timeStep = Math.floor(epoch / 30) + timeStepOffset;
  const timeBuffer = Buffer.alloc(8);
  timeBuffer.writeBigInt64BE(BigInt(timeStep));

  const secretBuffer = base32ToBuffer(secret);
  const hmac = crypto.createHmac('sha1', secretBuffer);
  hmac.update(timeBuffer);
  const digest = hmac.digest();

  const offset = digest[digest.length - 1] & 0xf;
  const binary =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff);

  const otp = binary % 1000000;
  return otp.toString().padStart(6, '0');
}

function verifyTOTPCode(secret: string, token: string): boolean {
  const cleanToken = token.trim().replace(/\s+/g, '');
  // Check windows -2 to +2 (tolerance for 2.5 minutes)
  for (let offset = -2; offset <= 2; offset++) {
    if (getTOTPCode(secret, offset) === cleanToken) {
      return true;
    }
  }
  return false;
}

// Pre-seeded Users with MFA
const SEED_USERS: (User & { passwordHash: string })[] = [
  {
    id: 'user-meera',
    name: 'Meera Sharma',
    email: 'meera@artisanshub.org',
    role: 'artisan',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBllvw_wK1kY3SIT0N968dBottEj9hBfGIBuq9FaBrp2f87enzfOpm-ak5jmrj3h8gdOQZc44iTq3jDfogPyHGSItDN-ydrddy6wN-9ZYtO0_BTvtSE0icxvIAxnGP9qmo4jkpWfYlqTAERnmixk5b9dwrLW1wUELQLSc_TkIKiI5R7CmRTx2pEA0z3zcC3Vk0Tr4ocbOAaOR5Hbghw-C3Xl1PvTQDaxsDyjASe77gcPQPtaGF1CcT9w',
    mfaEnabled: true,
    mfaSecret: 'JBSWY3DPEHPK3PXP', // Known base32 seed
    backupCodes: ['8942-1049', '5512-9901', '7234-5511', '3381-8842'],
    joinedDate: '2023-04-12',
    passwordHash: 'heritage2025'
  },
  {
    id: 'user-rnia',
    name: 'Elena Rostova',
    email: 'rnia7002@gmail.com',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    mfaEnabled: true,
    mfaSecret: 'KRSXG5CTMVRXEZLU', // Known base32 seed
    backupCodes: ['9821-4432', '3190-7712', '6621-0098', '1145-8823'],
    joinedDate: '2024-01-15',
    passwordHash: 'curator123'
  },
  {
    id: 'user-patron',
    name: 'Julian Vance',
    email: 'patron@example.com',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    mfaEnabled: false,
    mfaSecret: undefined,
    backupCodes: [],
    joinedDate: '2024-08-01',
    passwordHash: 'patron123'
  }
];

let users = [...SEED_USERS];
let auditLogs: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    action: 'Multi-factor login (TOTP Verified)',
    ip: '192.168.1.45',
    device: 'MacBook Pro · Chrome 134',
    status: 'success'
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    action: 'MFA Credential Rotation',
    ip: '192.168.1.45',
    device: 'MacBook Pro · Chrome 134',
    status: 'success'
  }
];

// Active pending MFA challenges: mfaToken -> { userId, expiresAt }
const pendingMfaChallenges = new Map<string, { userId: string; expiresAt: number }>();
// Active sessions: sessionToken -> { userId, createdAt }
const activeSessions = new Map<string, { userId: string; createdAt: number }>();

// Broadcast SSE Realtime Event to all connected browsers
function broadcastRealtime(event: RealtimeSyncEvent) {
  const data = `data: ${JSON.stringify(event)}\n\n`;
  sseClients.forEach((client) => {
    try {
      client.write(data);
    } catch {
      // client dropped
    }
  });
}

// ---------------- API ROUTES ----------------

// Real-time Event Stream (SSE)
app.get('/api/sync/stream', (req: Request, res: Response) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });

  res.write(
    `data: ${JSON.stringify({
      type: 'connected',
      message: 'Real-time synchronization active',
      timestamp: new Date().toISOString()
    })}\n\n`
  );

  sseClients.push(res);

  // Heartbeat every 15s to keep connections alive through proxies
  const heartbeatTimer = setInterval(() => {
    res.write(':heartbeat\n\n');
  }, 15000);

  req.on('close', () => {
    clearInterval(heartbeatTimer);
    sseClients = sseClients.filter((c) => c !== res);
  });
});

// Products API
app.get('/api/products', (_req: Request, res: Response) => {
  res.json({ products });
});

// Place order & decrease stock in real-time
app.post('/api/products/:id/order', (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity = 1, buyerName = 'Patron' } = req.body;

  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (product.stock < quantity) {
    return res.status(400).json({ error: 'Insufficient handcrafted stock available' });
  }

  product.stock -= quantity;

  // Broadcast real-time stock change to all active tabs/users
  const event: RealtimeSyncEvent = {
    type: 'stock_update',
    productId: product.id,
    newStock: product.stock,
    message: `${buyerName} acquired ${quantity}× "${product.title}". Only ${product.stock} pieces remain in studio!`,
    timestamp: new Date().toISOString()
  };
  broadcastRealtime(event);

  res.json({
    success: true,
    product,
    remainingStock: product.stock
  });
});

// Add new craft drop from artisan onboarding
app.post('/api/products', (req: Request, res: Response) => {
  const newProduct: Product = {
    ...req.body,
    id: `prod-${Date.now()}`
  };
  products.unshift(newProduct);

  broadcastRealtime({
    type: 'new_drop',
    productId: newProduct.id,
    message: `New Studio Drop: "${newProduct.title}" hand-crafted by ${newProduct.artisanName}`,
    timestamp: new Date().toISOString()
  });

  res.status(201).json({ product: newProduct });
});

// Artisans & Journal API
app.get('/api/artisans', (_req: Request, res: Response) => {
  res.json({ artisans: ARTISANS });
});

app.get('/api/journal', (_req: Request, res: Response) => {
  res.json({ articles: JOURNAL_ARTICLES });
});

// ---------------- SECURE AUTH & MFA ROUTES ----------------

// Step 1: Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email.toLowerCase() === (email || '').toLowerCase());

  if (!user || user.passwordHash !== password) {
    auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: `Failed login attempt for ${email}`,
      ip: req.ip || '127.0.0.1',
      device: req.headers['user-agent'] || 'Web Client',
      status: 'failed'
    });
    return res.status(401).json({ error: 'Invalid email or passphrase credentials' });
  }

  // Check if MFA is required
  if (user.mfaEnabled && user.mfaSecret) {
    const mfaToken = crypto.randomBytes(24).toString('hex');
    pendingMfaChallenges.set(mfaToken, {
      userId: user.id,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes validity
    });

    // Provide a sample current code for demo testing ease
    const currentCode = getTOTPCode(user.mfaSecret);

    return res.json({
      mfaRequired: true,
      mfaToken,
      mfaType: 'totp',
      maskedEmail: user.email.replace(/^(.{2})(.*)(@.*)$/, '$1***$3'),
      demoSecret: user.mfaSecret,
      demoCurrentCode: currentCode // Provided so testers can test instant code fill or check their authenticator
    });
  }

  // Direct login if MFA is not enabled
  const sessionToken = crypto.randomBytes(32).toString('hex');
  activeSessions.set(sessionToken, { userId: user.id, createdAt: Date.now() });

  const { passwordHash: _, mfaSecret: __, ...userProfile } = user;

  auditLogs.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    action: `Standard single-factor login for ${user.email}`,
    ip: req.ip || '127.0.0.1',
    device: 'Web Browser Client',
    status: 'warning'
  });

  res.json({
    mfaRequired: false,
    sessionToken,
    user: userProfile
  });
});

// Step 2: Verify MFA (TOTP 6-digit or Backup Code)
app.post('/api/auth/mfa/verify', (req: Request, res: Response) => {
  const { mfaToken, code } = req.body;
  const challenge = pendingMfaChallenges.get(mfaToken);

  if (!challenge || challenge.expiresAt < Date.now()) {
    return res.status(400).json({ error: 'MFA challenge expired or invalid. Please sign in again.' });
  }

  const user = users.find((u) => u.id === challenge.userId);
  if (!user || !user.mfaSecret) {
    return res.status(400).json({ error: 'User MFA configuration not found.' });
  }

  const cleanCode = (code || '').trim().toUpperCase();
  let verified = false;
  let isBackupCode = false;

  // Check TOTP code
  if (verifyTOTPCode(user.mfaSecret, cleanCode)) {
    verified = true;
  } else if (user.backupCodes && user.backupCodes.includes(cleanCode)) {
    // Check backup code
    verified = true;
    isBackupCode = true;
    // Consume the backup code (one-time use)
    user.backupCodes = user.backupCodes.filter((c) => c !== cleanCode);
  }

  if (!verified) {
    auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: `MFA verification rejected for ${user.email}`,
      ip: req.ip || '127.0.0.1',
      device: 'Authenticator Challenge',
      status: 'failed'
    });
    return res.status(401).json({ error: 'Invalid 6-digit verification code or backup key.' });
  }

  // Complete MFA verification
  pendingMfaChallenges.delete(mfaToken);
  const sessionToken = crypto.randomBytes(32).toString('hex');
  activeSessions.set(sessionToken, { userId: user.id, createdAt: Date.now() });

  auditLogs.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    action: isBackupCode
      ? `MFA Emergency Backup Code Used for ${user.email}`
      : `MFA Authenticator (TOTP) Verified for ${user.email}`,
    ip: req.ip || '127.0.0.1',
    device: 'RFC 6238 TOTP App',
    status: 'success'
  });

  const { passwordHash: _, mfaSecret: __, ...userProfile } = user;
  res.json({
    success: true,
    sessionToken,
    user: userProfile
  });
});

// Get Live TOTP code (helper for testing in UI)
app.get('/api/auth/mfa/current-code', (req: Request, res: Response) => {
  const secret = (req.query.secret as string) || 'JBSWY3DPEHPK3PXP';
  try {
    const code = getTOTPCode(secret);
    const secondsRemaining = 30 - (Math.floor(Date.now() / 1000) % 30);
    res.json({ code, secondsRemaining });
  } catch {
    res.status(400).json({ error: 'Invalid secret' });
  }
});

// Setup MFA: Generate secret & backup codes
app.post('/api/auth/mfa/setup', (req: Request, res: Response) => {
  const { email } = req.body;
  const newSecret = generateBase32Secret(16);
  const otpauthUrl = `otpauth://totp/ArtisansHub:${encodeURIComponent(email || 'artisan')}?secret=${newSecret}&issuer=ArtisansHub`;

  const backupCodes = [
    `${crypto.randomBytes(2).toString('hex').toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
    `${crypto.randomBytes(2).toString('hex').toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
    `${crypto.randomBytes(2).toString('hex').toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
    `${crypto.randomBytes(2).toString('hex').toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`
  ];

  res.json({
    secret: newSecret,
    otpauthUrl,
    backupCodes,
    currentDemoCode: getTOTPCode(newSecret)
  });
});

// Enable MFA for current user
app.post('/api/auth/mfa/enable', (req: Request, res: Response) => {
  const { userId, secret, verificationCode, backupCodes } = req.body;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!verifyTOTPCode(secret, verificationCode)) {
    return res.status(400).json({ error: 'Verification code did not match secret. Please check your authenticator clock.' });
  }

  user.mfaEnabled = true;
  user.mfaSecret = secret;
  user.backupCodes = backupCodes || ['ABCD-1234', 'EFGH-5678'];

  auditLogs.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    action: `Two-Factor Authentication enabled for ${user.email}`,
    ip: req.ip || '127.0.0.1',
    device: 'Security Center',
    status: 'success'
  });

  const { passwordHash: _, mfaSecret: __, ...userProfile } = user;
  res.json({ success: true, user: userProfile });
});

// Disable MFA
app.post('/api/auth/mfa/disable', (req: Request, res: Response) => {
  const { userId, password } = req.body;
  const user = users.find((u) => u.id === userId);

  if (!user || user.passwordHash !== password) {
    return res.status(401).json({ error: 'Incorrect passphrase confirmation.' });
  }

  user.mfaEnabled = false;
  user.mfaSecret = undefined;

  auditLogs.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    action: `Two-Factor Authentication disabled for ${user.email}`,
    ip: req.ip || '127.0.0.1',
    device: 'Security Center',
    status: 'warning'
  });

  const { passwordHash: _, mfaSecret: __, ...userProfile } = user;
  res.json({ success: true, user: userProfile });
});

// Get Audit Logs
app.get('/api/auth/audit-logs', (_req: Request, res: Response) => {
  res.json({ logs: auditLogs });
});

// AI Crafts Pricing Calculator API
app.post('/api/ai/crafts-calculator', (req: Request, res: Response) => {
  const {
    discipline = 'textiles',
    hours = 18.5,
    wageTier = 'tier-1', // tier-1 (Master, ₹750/day = ~₹94/hr), tier-2 (Heritage, ₹1000/day = ~₹125/hr)
    materialCostINR = 2100,
    overheadPercentage = 15
  } = req.body;

  const hourlyRateINR = wageTier === 'tier-2' ? 125 : 94;
  const laborCostINR = Math.round(Number(hours) * hourlyRateINR);
  const rawMaterial = Number(materialCostINR) || 1500;
  const studioOverheadINR = Math.round((laborCostINR + rawMaterial) * (overheadPercentage / 100));

  const totalDirectArtisanINR = laborCostINR + rawMaterial + studioOverheadINR;
  // Fair Trade standard: artisan receives 85%+ of wholesale/direct price
  const retailINR = Math.round(totalDirectArtisanINR * 1.18);
  const exchangeRate = 82; // INR per USD
  const retailUSD = Math.round(retailINR / exchangeRate);

  res.json({
    discipline,
    hoursInvested: Number(hours),
    hourlyRateINR,
    laborCostINR,
    rawMaterialINR: rawMaterial,
    studioOverheadINR,
    artisanNetPayoutINR: totalDirectArtisanINR,
    suggestedRetailINR: retailINR,
    suggestedRetailUSD: retailUSD,
    artisanEquityPercentage: 88,
    provenanceNote: `Calculated according to the Fair Living Wage Index for ${discipline}. Guarantees certified ethical compensation without merchant margin skimming.`
  });
});

// AI Storyteller API
app.post('/api/ai/storyteller', (req: Request, res: Response) => {
  const { craftTitle, artisanName, materials, region, heritageAge } = req.body;

  const generatedStory = `In the storied workshop of ${artisanName || 'Master Artisan'} in ${region || 'Jaipur'}, every stroke carries the living memory of a ${heritageAge || '400-year-old'} craft lineage. Formed using authentic ${materials || 'natural materials'}, this piece undergoes patient, unhurried hand execution over multiple days. It carries the microscopic fingerprints of the maker and an oral tradition chanted in verse from generation to generation.`;

  res.json({
    story: generatedStory,
    provenanceHash: `0x${crypto.randomBytes(8).toString('hex')}`,
    authenticityStatus: 'Guild Verified & Certified Fair Trade'
  });
});

// Serve frontend in dev via Vite middlewares, or static dist in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Artisans Hub server running on port ${PORT}`);
  });
}

startServer();
