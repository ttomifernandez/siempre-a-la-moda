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
    <div className="bg-gradient-to-br from-purple-800 to-violet-800 rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto border-2 border-cyan-400">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-magenta-400 to-cyan-400 bg-clip-text text-transparent mb-8">⚡ Checkout</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Resumen */}
        <div>
          <h3 className="font-bold text-xl text-cyan-300 mb-4">📋 Resumen de Compra</h3>
          <div className="bg-gradient-to-br from-magenta-500/10 to-cyan-500/10 rounded-lg p-4 space-y-2 mb-4 border-2 border-magenta-500/50">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm text-cyan-200">
                <span>{item.nombre} x{item.cantidad}</span>
                <span className="text-magenta-300">${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
              </div>
            ))}
            <div className="border-t-2 border-cyan-500/50 pt-2 mt-4 flex justify-between font-bold text-lg text-cyan-300">
              <span>Total:</span>
              <span className="bg-gradient-to-r from-magenta-400 to-lime-400 bg-clip-text text-transparent">${total.toLocaleString('es-AR')}</span>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div>
          <h3 className="font-bold text-xl text-cyan-300 mb-4">📬 Datos de Entrega</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-purple-700 border-2 border-magenta-500 rounded-lg text-cyan-100 placeholder-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-purple-700 border-2 border-magenta-500 rounded-lg text-cyan-100 placeholder-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
              required
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-purple-700 border-2 border-magenta-500 rounded-lg text-cyan-100 placeholder-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
              required
            />
            <textarea
              name="direccion"
              placeholder="Dirección de entrega"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-purple-700 border-2 border-magenta-500 rounded-lg text-cyan-100 placeholder-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 h-20 resize-none"
              required
            />

            <div className="space-y-2 pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-lime-400 via-cyan-400 to-magenta-400 text-black py-3 rounded-lg hover:from-lime-300 hover:via-cyan-300 hover:to-magenta-300 transition font-bold text-lg shadow-lg hover:shadow-lime-500/50 transform hover:scale-105"
              >
                ✓ Confirmar Compra
              </button>
              <button
                type="button"
                onClick={onBack}
                className="w-full bg-purple-600 border-2 border-cyan-400 text-cyan-300 py-3 rounded-lg hover:bg-purple-700 hover:border-magenta-400 transition font-bold"
              >
                ← Volver
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
