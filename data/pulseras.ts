export interface Pulsera {
  id: string;
  nombre: string;
  precio: number;
  color: string;
  descripcion: string;
  imagen: string;
  stock: number;
}

export interface CartItem extends Pulsera {
  cantidad: number;
}

export const pulseras: Pulsera[] = [
  {
    id: '1',
    nombre: 'Pulsera Perlas Rosa',
    precio: 1200,
    color: 'Rosa pastel',
    descripcion: 'Delicada pulsera con perlas de agua dulce',
    imagen: '💝',
    stock: 10,
  },
  {
    id: '2',
    nombre: 'Pulsera Cuero Lila',
    precio: 950,
    color: 'Lila',
    descripcion: 'Estilo casual con correas de cuero suave',
    imagen: '💜',
    stock: 8,
  },
  {
    id: '3',
    nombre: 'Pulsera Cadena Oro',
    precio: 1500,
    color: 'Dorado',
    descripcion: 'Cadena fina dorada con cierre seguro',
    imagen: '✨',
    stock: 12,
  },
  {
    id: '4',
    nombre: 'Pulsera Piedras Azul',
    precio: 1350,
    color: 'Azul pastel',
    descripcion: 'Con piedras semi-preciosas naturales',
    imagen: '💎',
    stock: 6,
  },
  {
    id: '5',
    nombre: 'Pulsera Hilos Pasteles',
    precio: 850,
    color: 'Multicolor',
    descripcion: 'Tejida con hilos de algodón de colores',
    imagen: '🎨',
    stock: 15,
  },
  {
    id: '6',
    nombre: 'Pulsera Acero Inoxidable',
    precio: 1100,
    color: 'Plateado',
    descripcion: 'Resistente al agua con diseño moderno',
    imagen: '⌚',
    stock: 9,
  },
];
