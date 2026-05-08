'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import CartSidebar from '@/components/CartSidebar';
import Checkout from '@/components/Checkout';
import { pulseras, Pulsera, CartItem } from '@/data/pulseras';

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Cargar carrito del localStorage
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Pulsera) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
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
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, cantidad } : item
      ));
    }
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    setShowCartSidebar(false);
  };

  const handleConfirmOrder = () => {
    setOrderComplete(true);
    setCartItems([]);
    setTimeout(() => {
      setOrderComplete(false);
      setShowCheckout(false);
    }, 3000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-black flex items-center justify-center px-4">
        <div className="bg-gradient-to-br from-purple-800 to-violet-800 rounded-2xl shadow-2xl p-8 text-center max-w-md border-2 border-cyan-400 animate-bounce-in">
          <div className="text-6xl mb-4">✨</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-magenta-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            ¡Compra Confirmada!
          </h1>
          <p className="text-cyan-300 mb-4">Gracias por tu compra Martina 💕</p>
          <p className="text-sm text-gray-400">Redireccionando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-black">
      {/* Header */}
      <header className="bg-gradient-to-r from-magenta-600 via-purple-600 to-cyan-600 text-white py-8 px-4 shadow-2xl border-b-4 border-lime-400 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold drop-shadow-lg mb-2">
            ✨ Siempre a la Moda ✨
          </h1>
          <p className="text-cyan-100 text-lg">
            Pulseras que brillan como vos 💎⚡
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto py-12 px-4">
        {!showCheckout ? (
          <>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-magenta-400 to-cyan-400 bg-clip-text text-transparent mb-8">
              Nuestras Pulseras Electrizantes
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pulseras.map(producto => (
                <ProductCard
                  key={producto.id}
                  product={producto}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </>
        ) : (
          <Checkout
            items={cartItems}
            onConfirm={handleConfirmOrder}
            onBack={() => setShowCheckout(false)}
          />
        )}
      </main>

      {/* CartSidebar */}
      <CartSidebar
        items={cartItems}
        onRemove={removeFromCart}
        onQuantityChange={updateQuantity}
        onCheckout={handleCheckout}
        isOpen={showCartSidebar}
        onToggle={() => setShowCartSidebar(!showCartSidebar)}
      />

      {/* Footer */}
      <footer className="bg-black text-center py-8 mt-12 border-t-4 border-cyan-400">
        <p className="text-cyan-400 text-lg">
          © 2025 Siempre a la Moda - Tienda Online ⚡
        </p>
      </footer>
    </div>
  );
}
