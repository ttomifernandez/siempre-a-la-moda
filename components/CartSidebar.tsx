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
      {/* Botón Carrito - Fixed */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-3xl shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center relative group"
      >
        🛍️
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            {items.length}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onToggle}
        />
      )}

      {/* Sidebar Carrito */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-96 bg-white z-50 shadow-2xl overflow-y-auto transition-all duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header Sticky */}
        <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 flex justify-between items-center shadow-md z-10">
          <div>
            <h2 className="text-2xl font-bold">Tu Pedido</h2>
            <p className="text-green-100 text-xs font-medium">Siempre a la Moda</p>
          </div>
          <button
            onClick={onToggle}
            className="text-white hover:bg-green-700/50 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200"
          >
            <span className="text-2xl font-bold">✕</span>
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 pb-32">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🛍️</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-sm text-gray-600">
                Agrega pulseras para comenzar tu compra
              </p>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-green-300 hover:bg-green-50/30 transition-all duration-200 group"
                  >
                    {/* Producto Info */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                            {idx + 1}
                          </span>
                          <h3 className="font-bold text-gray-900">
                            {item.nombre}
                          </h3>
                        </div>
                        <p className="text-xs text-gray-600 ml-7">
                          {item.color}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full w-7 h-7 flex items-center justify-center transition-colors duration-200"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Cantidad y Precio */}
                    <div className="flex items-center justify-between">
                      {/* Controles Cantidad */}
                      <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg p-1">
                        <button
                          onClick={() =>
                            onQuantityChange(item.id, Math.max(1, item.cantidad - 1))
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-colors duration-200 text-gray-700 font-bold"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-bold text-gray-900 text-sm">
                          {item.cantidad}
                        </span>
                        <button
                          onClick={() =>
                            onQuantityChange(item.id, item.cantidad + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-colors duration-200 text-gray-700 font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Precios */}
                      <div className="text-right">
                        <p className="text-xs text-gray-600 mb-1">
                          ${item.precio.toLocaleString('es-AR')} c/u
                        </p>
                        <p className="font-bold text-green-600">
                          ${(item.precio * item.cantidad).toLocaleString('es-AR')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Línea separadora */}
              <div className="border-t-2 border-gray-200 my-6" />

              {/* Resumen */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200 mb-8">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ${total.toLocaleString('es-AR')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>Envío</span>
                    <span className="font-semibold text-gray-500">A confirmar</span>
                  </div>
                  <div className="border-t border-green-200 pt-3 flex justify-between text-lg">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-green-600 text-xl">
                      ${total.toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto sm:left-auto sm:right-auto bg-white border-t border-gray-200 p-6 space-y-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-lg font-bold text-base hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
                >
                  <span className="mr-2">💬</span>
                  Confirmar por WhatsApp
                </a>

                <button
                  onClick={() => {
                    onCheckout();
                    onToggle();
                  }}
                  className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors duration-300"
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
