'use client';

import { Pulsera } from '@/data/pulseras';

interface ProductCardProps {
  product: Pulsera;
  onAddToCart: (product: Pulsera) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105">
      <div className="bg-gradient-to-br from-pink-100 to-purple-100 h-48 flex items-center justify-center text-6xl">
        {product.imagen}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-1">{product.nombre}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.color}</p>
        <p className="text-sm text-gray-700 mb-4">{product.descripcion}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-pink-600">${product.precio}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-full hover:from-pink-500 hover:to-purple-500 transition font-semibold text-sm"
          >
            + Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
