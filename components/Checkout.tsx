'use client';

import { CartItem } from '@/data/pulseras';
import { useState } from 'react';

interface CheckoutProps {
  items: CartItem[];
  onConfirm: () => void;
  onBack: () => void;
}

export default function Checkout({ items, onConfirm, onBack }: CheckoutProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
  });

  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nombre && formData.email && formData.telefono && formData.direccion) {
      onConfirm();
    } else {
      alert('Por favor completa todos los campos');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Resumen */}
        <div>
          <h3 className="font-bold text-lg text-gray-800 mb-4">Resumen de Compra</h3>
          <div className="bg-pink-50 rounded-lg p-4 space-y-2 mb-4">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.nombre} x{item.cantidad}</span>
                <span>${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
              </div>
            ))}
            <div className="border-t-2 pt-2 mt-4 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-pink-600">${total.toLocaleString('es-AR')}</span>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div>
          <h3 className="font-bold text-lg text-gray-800 mb-4">Datos de Entrega</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <textarea
              name="direccion"
              placeholder="Dirección de entrega"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 h-20 resize-none"
              required
            />

            <div className="space-y-2 pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-3 rounded-lg hover:from-green-500 hover:to-green-600 transition font-bold"
              >
                ✓ Confirmar Compra
              </button>
              <button
                type="button"
                onClick={onBack}
                className="w-full bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition font-bold"
              >
                ← Volver al Carrito
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
