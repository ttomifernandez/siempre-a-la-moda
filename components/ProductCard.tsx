'use client';

import { Pulsera } from '@/data/pulseras';

interface ProductCardProps {
  product: Pulsera;
  onAddToCart: (product: Pulsera) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-gradient-to-br from-purple-800 to-violet-900 rounded-2xl shadow-2xl overflow-hidden hover:shadow-cyan-500/50 transition-all transform hover:scale-105 border-2 border-magenta-600 hover:border-cyan-400 group animate-bounce-in">
      <div className="relative bg-gradient-to-br from-magenta-600/30 via-purple-600/30 to-cyan-600/30 h-48 flex items-center justify-center text-6xl border-b-4 border-cyan-400 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/10 to-transparent group-hover:from-magenta-500/20 group-hover:via-cyan-500/20 group-hover:to-magenta-500/20 transition-all" />
        <span className="relative z-10 group-hover:scale-125 transition-transform drop-shadow-lg">
          {product.imagen}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl text-cyan-300 mb-1 group-hover:text-lime-400 transition">
          {product.nombre}
        </h3>
        <p className="text-sm font-semibold text-magenta-400 mb-3">
          {product.color}
        </p>
        <p className="text-sm text-cyan-200 mb-6 leading-relaxed">
          {product.descripcion}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-4xl font-bold bg-gradient-to-r from-lime-400 via-cyan-400 to-magenta-400 bg-clip-text text-transparent">
            ${product.precio}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-gradient-to-r from-cyan-500 via-magenta-500 to-lime-500 text-black px-6 py-3 rounded-full hover:from-cyan-400 hover:via-magenta-400 hover:to-lime-400 transition font-bold text-sm shadow-lg hover:shadow-lime-500/50 transform hover:scale-110 active:scale-95"
          >
            ⚡ +Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
