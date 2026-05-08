'use client';

import { Pulsera } from '@/data/pulseras';

interface ProductCardProps {
  product: Pulsera;
  onAddToCart: (product: Pulsera) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 group">
      {/* Imagen */}
      <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 h-56 flex items-center justify-center text-7xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-green-100/30 group-hover:from-green-50/50 transition-all duration-300" />
        <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
          {product.imagen}
        </span>
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col h-full">
        {/* Título y color */}
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
            {product.nombre}
          </h3>
          <p className="text-sm text-green-700 font-semibold mb-4 bg-green-50 inline-block px-3 py-1 rounded-full">
            {product.color}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {product.descripcion}
          </p>
        </div>

        {/* Precio y botón */}
        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 mb-1">Precio</p>
            <p className="text-2xl font-bold text-green-600">
              ${product.precio.toLocaleString('es-AR')}
            </p>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
