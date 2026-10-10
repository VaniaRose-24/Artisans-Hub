export interface Product {
  id: string;
  title: string;
  category: 'pottery' | 'textiles' | 'metalwork' | 'woodcraft' | 'jewelry' | 'decor';
  categoryLabel: string;
  badge: string;
  priceUSD: number;
  priceINR: number;
  artisanId: string;
  artisanName: string;
  artisanLocation: string;
  artisanAvatar: string;
  rating: number;
  reviewCount: number;
  image: string;
  altText: string;
  stock: number;
  leadTime: string;
  materials: string[];
  dimensions: string;
  provenanceDetails: {
    technique: string;
    firingTemp?: string;
    heritageAge: string;
    fairWagePercentage: number;
    hoursToCraft: number;
  };
  story: string;
}

export interface Artisan {
  id: string;
  name: string;
  title: string;
  location: string;
  experienceYears: number;
  image: string;
  quote: string;
  bio: string;
  craft: string;
  guildCertification: string;
  featuredProductIds: string[];
}

export interface JournalArticle {
  id: string;
  title: string;
  tag: string;
  readTime: string;
  author: string;
  image: string;
  summary: string;
  content: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'artisan' | 'admin';
  avatar: string;
  mfaEnabled: boolean;
  mfaSecret?: string;
  backupCodes?: string[];
  joinedDate: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  ip: string;
  device: string;
  status: 'success' | 'warning' | 'failed';
}

export interface RealtimeSyncEvent {
  type: 'stock_update' | 'new_order' | 'cart_sync' | 'new_drop' | 'artisan_milestone';
  productId?: string;
  newStock?: number;
  message: string;
  timestamp: string;
  data?: any;
}
