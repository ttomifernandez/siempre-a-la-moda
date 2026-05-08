'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import CartSidebar from '@/components/CartSidebar';
import { pulseras, Pulsera, CartItem } from '@/data/pulseras';

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCartSidebar, setShowCartSidebar] = useState(false);

  // Cargar carrito del localStorage
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch {
        setCartItems([]);
      }
    }
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Pulsera) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, cantidad: 1 }]);
    }
    setShowCartSidebar(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, cantidad: number) => {
    if (cantidad === 0) {
      removeFromCart(id);
    } else {
      setCartItems(
        cartItems.map(item =>
          item.id === id ? { ...item, cantidad } : item
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">✨ Siempre a la Moda</h1>
              <p className="text-green-100 text-sm mt-1">
                Pulseras hermosas para cada momento
              </p>
            </div>
            <button
              onClick={() => setShowCartSidebar(true)}
              className="relative bg-white text-green-600 px-6 py-3 rounded-full font-bold text-lg hover:bg-green-50 transition shadow-lg flex items-center gap-2"
            >
              🛍️ Carrito
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Nuestras Pulseras
        </h2>
        <p className="text-gray-600 text-lg mb-10">
          Descubre nuestras colecciones exclusivas
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pulseras.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      {/* Carrito Sidebar */}
      <CartSidebar
        items={cartItems}
        onRemove={removeFromCart}
        onQuantityChange={updateQuantity}
        onCheckout={() => {}}
        isOpen={showCartSidebar}
        onToggle={() => setShowCartSidebar(!showCartSidebar)}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-8 mt-16">
        <p className="text-gray-400">
          © 2025 Siempre a la Moda - Tienda Online
        </p>
      </footer>
    </div>
  );
}
