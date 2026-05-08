'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import Checkout from '@/components/Checkout';
import { pulseras, Pulsera, CartItem } from '@/data/pulseras';

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
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
    }, 3000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 text-center max-w-md">
          <div className="text-6xl mb-4">✨</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Compra Confirmada!</h1>
          <p className="text-gray-600 mb-4">Gracias por tu compra Martina 💕</p>
          <p className="text-sm text-gray-500">Redireccionando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-400 to-purple-400 text-white py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">✨ Siempre a la Moda ✨</h1>
          <p className="text-pink-100 mt-1">Pulseras hermosas para cada momento</p>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Productos */}
          <div className="lg:col-span-2">
            {!showCheckout ? (
              <>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Nuestras Pulseras</h2>
                <div className="grid md:grid-cols-2 gap-6">
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
          </div>

          {/* Carrito */}
          <div className="lg:col-span-1 h-fit">
            {!showCheckout && (
              <Cart
                items={cartItems}
                onRemove={removeFromCart}
                onQuantityChange={updateQuantity}
                onCheckout={handleCheckout}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-12">
        <p className="text-gray-400">© 2025 Siempre a la Moda - Tienda Online</p>
      </footer>
    </div>
  );
}
