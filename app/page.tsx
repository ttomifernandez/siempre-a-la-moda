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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Sticky */}
      <header className="sticky top-0 z-30 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                ✨ Siempre a la Moda
              </h1>
              <p className="text-green-100 text-sm mt-2">
                Pulseras hermosas para cada momento
              </p>
            </div>
            <button
              onClick={() => setShowCartSidebar(true)}
              className="relative bg-white text-green-600 px-4 sm:px-6 py-3 rounded-lg font-bold text-sm sm:text-base hover:bg-green-50 transition-colors duration-300 shadow-md hover:shadow-lg flex items-center gap-2 ml-4"
            >
              <span>🛍️</span>
              <span className="hidden sm:inline">Carrito</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 sm:py-16 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Descubre Nuestras Pulseras
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Colecciones exclusivas diseñadas para brillar en cada momento
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pulseras.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">Siempre a la Moda</h3>
              <p className="text-sm">
                Tienda online de pulseras hermosas y modernas
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Contacto</h3>
              <p className="text-sm">📱 WhatsApp: 351 5 92 90 43</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Información</h3>
              <p className="text-sm">Envíos a toda Argentina</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>
              © 2025 Siempre a la Moda. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Carrito Sidebar */}
      <CartSidebar
        items={cartItems}
        onRemove={removeFromCart}
        onQuantityChange={updateQuantity}
        onCheckout={() => {}}
        isOpen={showCartSidebar}
        onToggle={() => setShowCartSidebar(!showCartSidebar)}
      />
    </div>
  );
}
