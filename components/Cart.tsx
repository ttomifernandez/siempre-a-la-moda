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
      <div className="bg-gradient-to-br from-purple-800 to-violet-800 rounded-xl p-8 text-center border-2 border-cyan-400">
        <p className="text-cyan-300 text-lg">Tu carrito está vacío 🛍️</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-800 to-violet-800 rounded-xl shadow-2xl p-6 border-2 border-magenta-500">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-magenta-400 to-cyan-400 bg-clip-text text-transparent mb-4">🛍️ Tu Carrito</h2>
      
      <div className="space-y-4 mb-6">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center border-b-2 border-magenta-500/30 pb-4 hover:border-cyan-400 transition">
            <div className="flex-1">
              <p className="font-semibold text-cyan-300">{item.nombre}</p>
              <p className="text-sm text-magenta-300">${item.precio} x {item.cantidad}</p>
            </div>
            
            <div className="flex items-center gap-2 mr-4">
              <button
                onClick={() => onQuantityChange(item.id, Math.max(1, item.cantidad - 1))}
                className="bg-magenta-500 hover:bg-magenta-400 text-white px-3 py-1 rounded transition font-bold"
              >
                -
              </button>
              <span className="px-2 font-semibold text-cyan-300">{item.cantidad}</span>
              <button
                onClick={() => onQuantityChange(item.id, item.cantidad + 1)}
                className="bg-cyan-500 hover:bg-cyan-400 text-black px-3 py-1 rounded transition font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={() => onRemove(item.id)}
              className="text-lime-400 hover:text-lime-300 font-bold text-xl"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-cyan-400 pt-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-cyan-300">Total:</span>
          <span className="text-3xl font-bold bg-gradient-to-r from-magenta-400 via-cyan-400 to-lime-400 bg-clip-text text-transparent">${total.toLocaleString('es-AR')}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-gradient-to-r from-magenta-500 via-purple-500 to-cyan-500 text-white py-3 rounded-lg hover:from-magenta-400 hover:via-purple-400 hover:to-cyan-400 transition font-bold text-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105"
      >
        ⚡ Ir a Checkout 💳
      </button>
    </div>
  );
}
