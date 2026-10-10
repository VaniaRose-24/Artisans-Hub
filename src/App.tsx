/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem, User, RealtimeSyncEvent } from './types';
import { INITIAL_PRODUCTS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { ExploreCraftsSection } from './components/ExploreCraftsSection';
import { FeaturedCreationsSection } from './components/FeaturedCreationsSection';
import { MeetMakersSection } from './components/MeetMakersSection';
import { CraftJournalSection } from './components/CraftJournalSection';
import { WhyArtisansHubSection } from './components/WhyArtisansHubSection';
import { AiMakerSuiteSection } from './components/AiMakerSuiteSection';
import { ShopView } from './components/ShopView';
import { CraftsView } from './components/CraftsView';
import { ArtisansView } from './components/ArtisansView';
import { JournalView } from './components/JournalView';
import { AiStudioView } from './components/AiStudioView';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CommandPalette } from './components/CommandPalette';
import { StartSellingModal } from './components/StartSellingModal';
import { AuthModal } from './components/AuthModal';
import { RealtimeStatusBadge } from './components/RealtimeStatusBadge';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set(['prod-1', 'prod-2']));
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isStartSellingOpen, setIsStartSellingOpen] = useState(false);

  // Real-time synchronization state
  const [realtimeConnected, setRealtimeConnected] = useState(false);
  const [lastRealtimeEvent, setLastRealtimeEvent] = useState<RealtimeSyncEvent | null>(null);

  // Fetch initial products from backend
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        }
      })
      .catch(() => {
        // Fallback to initial seed
      });
  }, []);

  // Connect to Server-Sent Events (SSE) for Real-Time Sync
  useEffect(() => {
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/sync/stream');

      eventSource.onopen = () => {
        setRealtimeConnected(true);
      };

      eventSource.onmessage = (event) => {
        try {
          const data: RealtimeSyncEvent = JSON.parse(event.data);
          if (data.type === 'stock_update') {
            setProducts((prev) =>
              prev.map((p) =>
                p.id === data.productId && typeof data.newStock === 'number'
                  ? { ...p, stock: data.newStock }
                  : p
              )
            );
            setLastRealtimeEvent(data);
          } else if (data.type === 'new_drop') {
            fetch('/api/products')
              .then((res) => res.json())
              .then((d) => {
                if (d.products) setProducts(d.products);
              });
            setLastRealtimeEvent(data);
          }
        } catch {
          // non-json or heartbeat
        }
      };

      eventSource.onerror = () => {
        setRealtimeConnected(false);
      };
    } catch {
      setRealtimeConnected(false);
    }

    return () => {
      if (eventSource) eventSource.close();
    };
  }, []);

  // Auto-clear real-time event toast
  useEffect(() => {
    if (lastRealtimeEvent) {
      const timer = setTimeout(() => setLastRealtimeEvent(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [lastRealtimeEvent]);

  // Scroll to top on tab change
  const handleNavigate = (tab: string, filter?: string) => {
    setCurrentTab(tab);
    if (filter) {
      setSearchQuery(filter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Management
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Checkout with real-time stock sync
  const handleCheckout = async (): Promise<boolean> => {
    try {
      for (const item of cart) {
        await fetch(`/api/products/${item.product.id}/order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quantity: item.quantity,
            buyerName: currentUser ? currentUser.name : 'Collector',
          }),
        });
      }
      setCart([]);
      return true;
    } catch {
      return false;
    }
  };

  // Wishlist Management
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
      } else {
        next.add(product.id);
      }
      return next;
    });
  };

  // Artisan Add Product
  const handleAddProduct = async (newProductData: Omit<Product, 'id'>) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProductData),
      });
      const data = await res.json();
      if (data.product) {
        setProducts((prev) => [data.product, ...prev]);
      }
    } catch {
      // local fallback
      const created = { ...newProductData, id: `prod-${Date.now()}` };
      setProducts((prev) => [created, ...prev]);
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4] text-[#1b1c19] selection:bg-[#ffdbce] selection:text-[#370e00]">
      {/* Fixed Sticky Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCommand={() => setIsCommandOpen(true)}
        onOpenStartSelling={() => setIsStartSellingOpen(true)}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-32 sm:pt-36">
        <AnimatePresence mode="wait">
          {currentTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col w-full"
            >
              <HeroSection
                onNavigate={handleNavigate}
                onOpenStartSelling={() => setIsStartSellingOpen(true)}
              />
              <ExploreCraftsSection onNavigate={handleNavigate} />
              <FeaturedCreationsSection
                products={products}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
                onNavigate={handleNavigate}
                currency={currency}
              />
              <MeetMakersSection onNavigate={handleNavigate} />
              <CraftJournalSection onNavigate={handleNavigate} />
              <WhyArtisansHubSection />
              <AiMakerSuiteSection
                onNavigate={handleNavigate}
                onOpenStartSelling={() => setIsStartSellingOpen(true)}
              />
            </motion.div>
          )}

          {currentTab === 'shop' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ShopView
                products={products}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                currency={currency}
              />
            </motion.div>
          )}

          {currentTab === 'explore-crafts' && (
            <motion.div
              key="explore-crafts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CraftsView onNavigateToShop={(cat) => handleNavigate('shop', cat)} />
            </motion.div>
          )}

          {currentTab === 'meet-the-artisans' && (
            <motion.div
              key="meet-the-artisans"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArtisansView onNavigateToShop={(filter) => handleNavigate('shop', filter)} />
            </motion.div>
          )}

          {currentTab === 'our-story' && (
            <motion.div
              key="our-story"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <JournalView />
            </motion.div>
          )}

          {currentTab === 'ai-studio-and-tools' && (
            <motion.div
              key="ai-studio-and-tools"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AiStudioView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenStartSelling={() => setIsStartSellingOpen(true)}
      />

      {/* Interactive Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
        currency={currency}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={products}
        wishlistIds={wishlistIds}
        onAddToCart={handleAddToCart}
        onRemoveFromWishlist={handleToggleWishlist}
        currency={currency}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
        currency={currency}
      />

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onNavigate={handleNavigate}
      />

      <StartSellingModal
        isOpen={isStartSellingOpen}
        onClose={() => setIsStartSellingOpen(false)}
        onAddProduct={handleAddProduct}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Real-time SSE Status Pill & Toast Notifications */}
      <RealtimeStatusBadge
        connected={realtimeConnected}
        lastEvent={lastRealtimeEvent}
        onClearToast={() => setLastRealtimeEvent(null)}
      />
    </div>
  );
}
