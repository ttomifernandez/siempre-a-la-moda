'use client';

import { CartItem } from '@/data/pulseras';

interface CartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, cantidad: number) => void;
  onCheckout: () => void;
}

export default function Cart({ items, onRemove, onQuantityChange, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  if (items.length === 0) {
    return (
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-6 text-center">
        <p className="text-gray-600 text-lg">Tu carrito está vacío 🛍️</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🛍️ Tu Carrito</h2>
      
      <div className="space-y-4 mb-6">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center border-b pb-4">
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{item.nombre}</p>
              <p className="text-sm text-gray-600">${item.precio} x {item.cantidad}</p>
            </div>
            
            <div className="flex items-center gap-2 mr-4">
              <button
                onClick={() => onQuantityChange(item.id, Math.max(1, item.cantidad - 1))}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
              >
                -
              </button>
              <span className="px-2 font-semibold">{item.cantidad}</span>
              <button
                onClick={() => onQuantityChange(item.id, item.cantidad + 1)}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={() => onRemove(item.id)}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="border-t-2 pt-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-gray-800">Total:</span>
          <span className="text-3xl font-bold text-pink-600">${total.toLocaleString('es-AR')}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg hover:from-pink-600 hover:to-purple-600 transition font-bold text-lg"
      >
        Ir a Checkout 💳
      </button>
    </div>
  );
}
