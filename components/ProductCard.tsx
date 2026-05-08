'use client';

import { Pulsera } from '@/data/pulseras';

interface ProductCardProps {
  product: Pulsera;
  onAddToCart: (product: Pulsera) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
      {/* Imagen */}
      <div className="bg-gradient-to-br from-green-100 to-emerald-100 h-48 flex items-center justify-center text-6xl border-b border-gray-200">
        {product.imagen}
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-1">
          {product.nombre}
        </h3>
        <p className="text-sm text-green-600 font-semibold mb-3">
          {product.color}
        </p>
        <p className="text-gray-600 text-sm mb-6 h-12 overflow-hidden">
          {product.descripcion}
        </p>

        {/* Precio y Botón */}
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-green-600">
            ${product.precio}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2 rounded-lg font-bold hover:from-green-600 hover:to-emerald-700 transition shadow-md hover:shadow-lg active:scale-95"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
