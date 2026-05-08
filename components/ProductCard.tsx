'use client';

import { Pulsera } from '@/data/pulseras';

interface ProductCardProps {
  product: Pulsera;
  onAddToCart: (product: Pulsera) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-gradient-to-br from-purple-800 to-violet-800 rounded-2xl shadow-2xl overflow-hidden hover:shadow-cyan-500/50 transition transform hover:scale-105 border-2 border-magenta-500/50 hover:border-cyan-400">
      <div className="bg-gradient-to-br from-magenta-500/20 via-purple-500/20 to-cyan-500/20 h-48 flex items-center justify-center text-6xl border-b-2 border-cyan-400">
        {product.imagen}
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg text-cyan-300 mb-1">{product.nombre}</h3>
        <p className="text-sm text-magenta-300 mb-2">{product.color}</p>
        <p className="text-sm text-cyan-100 mb-4">{product.descripcion}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold bg-gradient-to-r from-magenta-400 to-lime-400 bg-clip-text text-transparent">${product.precio}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-gradient-to-r from-cyan-400 via-magenta-400 to-lime-400 text-black px-4 py-2 rounded-full hover:from-cyan-300 hover:via-magenta-300 hover:to-lime-300 transition font-bold text-sm shadow-lg hover:shadow-cyan-500/50 transform hover:scale-110"
          >
            ⚡ +Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
