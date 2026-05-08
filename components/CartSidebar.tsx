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

const WHATSAPP_NUMBER = '5493515929043';

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
      {/* Botón Fixed Carrito */}
      <button
        onClick={onToggle}
        className="fixed bottom-8 right-8 z-40 w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-3xl shadow-2xl hover:shadow-green-500/50 hover:scale-110 transition-all flex items-center justify-center"
      >
        🛍️
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur z-40 transition-opacity"
          onClick={onToggle}
        />
      )}

      {/* Sidebar Carrito - Estilo Pedidos Ya */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-96 bg-white z-50 shadow-2xl overflow-y-auto transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Tu Pedido</h2>
            <p className="text-green-100 text-sm">Siempre a la Moda</p>
          </div>
          <button
            onClick={onToggle}
            className="text-3xl font-bold hover:bg-green-700 rounded-full w-10 h-10 flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-3xl mb-4">🛍️</p>
              <p className="text-gray-600 text-lg font-semibold">Tu carrito está vacío</p>
              <p className="text-gray-500 text-sm mt-2">Agrega pulseras para comenzar</p>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-green-300 transition"
                  >
                    {/* Nombre y Precio */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">
                          {item.nombre}
                        </h3>
                        <p className="text-sm text-gray-600">{item.color}</p>
                      </div>
                      <p className="font-bold text-green-600 text-lg">
                        ${item.precio.toLocaleString('es-AR')}
                      </p>
                    </div>

                    {/* Cantidad y Total */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1">
                        <button
                          onClick={() =>
                            onQuantityChange(item.id, Math.max(1, item.cantidad - 1))
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition font-bold text-gray-700"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-bold text-gray-900">
                          {item.cantidad}
                        </span>
                        <button
                          onClick={() =>
                            onQuantityChange(item.id, item.cantidad + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition font-bold text-gray-700"
                        >
                          +
                        </button>
                      </div>

                      <p className="font-bold text-gray-900">
                        ${(item.precio * item.cantidad).toLocaleString('es-AR')}
                      </p>

                      <button
                        onClick={() => onRemove(item.id)}
                        className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full w-8 h-8 flex items-center justify-center transition font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumen */}
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>${total.toLocaleString('es-AR')}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Envío:</span>
                    <span>A confirmar</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-bold text-lg text-gray-900">
                    <span>Total:</span>
                    <span className="text-green-600">
                      ${total.toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="space-y-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-lg font-bold text-lg text-center hover:from-green-600 hover:to-emerald-700 transition shadow-lg"
                >
                  💬 Confirmar por WhatsApp
                </a>

                <button
                  onClick={() => {
                    onCheckout();
                    onToggle();
                  }}
                  className="w-full bg-gray-200 text-gray-900 py-3 rounded-lg font-bold hover:bg-gray-300 transition"
                >
                  Continuar comprando
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
