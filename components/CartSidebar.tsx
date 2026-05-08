'use client';

import { CartItem } from '@/data/pulseras';
import { generateWhatsAppMessage, getWhatsAppLink } from '@/lib/whatsapp';

interface CartSidebarProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, cantidad: number) => void;
  onCheckout: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const WHATSAPP_NUMBER = '5493515929043'; // +54 351 5 92 90 43

export default function CartSidebar({
  items,
  onRemove,
  onQuantityChange,
  onCheckout,
  isOpen,
  onToggle,
}: CartSidebarProps) {
  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const whatsappMessage = generateWhatsAppMessage(items);
  const whatsappLink = getWhatsAppLink(WHATSAPP_NUMBER, whatsappMessage);

  return (
    <>
      {/* Botón Toggle */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-r from-lime-400 via-cyan-400 to-magenta-400 text-black font-bold text-2xl shadow-2xl hover:shadow-lime-500/50 transform hover:scale-110 transition flex items-center justify-center animate-pulse-glow"
      >
        🛍️
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-96 bg-gradient-to-b from-violet-900 via-purple-900 to-black z-50 border-l-4 border-cyan-400 shadow-2xl overflow-y-auto transition-all ${
          isOpen ? 'animate-slide-in' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-magenta-500">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-magenta-400 to-cyan-400 bg-clip-text text-transparent">
              🛍️ Tu Carrito
            </h2>
            <button
              onClick={onToggle}
              className="text-cyan-400 hover:text-magenta-400 text-2xl font-bold transition"
            >
              ✕
            </button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-cyan-300 text-lg">Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="bg-gradient-to-r from-magenta-500/10 to-cyan-500/10 rounded-lg p-4 border-2 border-magenta-500/50 hover:border-cyan-400 transition animate-bounce-in"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="font-bold text-cyan-300">{item.nombre}</p>
                        <p className="text-sm text-magenta-300">{item.color}</p>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-lime-400 hover:text-lime-300 font-bold"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <button
                        onClick={() =>
                          onQuantityChange(item.id, Math.max(1, item.cantidad - 1))
                        }
                        className="bg-magenta-500 hover:bg-magenta-400 text-white px-2 py-1 rounded transition"
                      >
                        -
                      </button>
                      <span className="px-3 font-bold text-cyan-300">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() =>
                          onQuantityChange(item.id, item.cantidad + 1)
                        }
                        className="bg-cyan-500 hover:bg-cyan-400 text-black px-2 py-1 rounded transition"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">
                        ${item.precio.toLocaleString('es-AR')} x {item.cantidad}
                      </span>
                      <span className="font-bold text-lime-400">
                        ${(item.precio * item.cantidad).toLocaleString('es-AR')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="bg-gradient-to-r from-magenta-500/20 to-cyan-500/20 rounded-lg p-4 border-2 border-cyan-400 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-cyan-300">Total:</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-magenta-400 via-cyan-400 to-lime-400 bg-clip-text text-transparent">
                    ${total.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>

              {/* Botones */}
              <div className="space-y-3">
                <button
                  onClick={onCheckout}
                  className="w-full bg-gradient-to-r from-lime-400 via-cyan-400 to-magenta-400 text-black py-3 rounded-lg hover:from-lime-300 hover:via-cyan-300 hover:to-magenta-300 transition font-bold text-lg shadow-lg transform hover:scale-105"
                >
                  💳 Checkout
                </button>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full bg-gradient-to-r from-green-500 to-lime-500 text-white py-3 rounded-lg hover:from-green-400 hover:to-lime-400 transition font-bold text-lg shadow-lg transform hover:scale-105"
                >
                  📱 Enviar por WhatsApp
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
