'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import Checkout from '@/components/Checkout';
import { pulseras, Pulsera, CartItem } from '@/data/pulseras';

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
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
  };

  const handleConfirmOrder = () => {
    // Simular pedido confirmado
    setOrderComplete(true);
    setCartItems([]);
    setTimeout(() => {
      setOrderComplete(false);
      setShowCheckout(false);
      setShowCartModal(false);
    }, 3000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-black flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md border-2 border-cyan-400">
          <div className="text-6xl mb-4">✨</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-magenta-500 to-cyan-500 bg-clip-text text-transparent mb-2">¡Compra Confirmada!</h1>
          <p className="text-gray-600 mb-4">Gracias por tu compra Martina 💕</p>
          <p className="text-sm text-gray-500">Redireccionando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-black">
      {/* Header */}
      <header className="bg-gradient-to-r from-magenta-600 via-purple-600 to-cyan-600 text-white py-6 px-4 shadow-2xl border-b-4 border-cyan-400">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold drop-shadow-lg">✨ Siempre a la Moda ✨</h1>
            <p className="text-cyan-100 mt-1">Pulseras electrizantes para cada momento</p>
          </div>
          <button
            onClick={() => setShowCartModal(true)}
            className="relative bg-gradient-to-r from-cyan-400 to-lime-400 text-black px-6 py-3 rounded-full font-bold text-lg hover:from-cyan-300 hover:to-lime-300 transition transform hover:scale-110 shadow-lg"
          >
            🛍️ Carrito ({cartItems.length})
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        {!showCheckout ? (
          <>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-magenta-400 to-cyan-400 bg-clip-text text-transparent mb-6">Nuestras Pulseras</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Modal Carrito */}
      {showCartModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 z-50">
          <div className="bg-gradient-to-br from-purple-900 to-violet-900 rounded-2xl shadow-2xl max-w-2xl w-full border-2 border-cyan-400 relative">
            <button
              onClick={() => setShowCartModal(false)}
              className="absolute top-4 right-4 text-cyan-400 hover:text-magenta-400 text-3xl font-bold"
            >
              ✕
            </button>
            <div className="p-8">
              <Cart
                items={cartItems}
                onRemove={removeFromCart}
                onQuantityChange={updateQuantity}
                onCheckout={() => {
                  handleCheckout();
                  setShowCartModal(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-center py-6 mt-12 border-t-2 border-cyan-400">
        <p className="text-cyan-400">© 2025 Siempre a la Moda - Tienda Online ⚡</p>
      </footer>
    </div>
  );
}
