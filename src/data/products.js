// src/data/products.js

// Importar las imágenes locales
import camisetaImg from '../assets/camiseta-basica.jpg'
import pantalonImg from '../assets/pantalon-mezclilla.jpg'
import sudaderaImg from '../assets/sudadera-capucha.jpg'

import laptopHpImg from '../assets/laptop-hp.jpg'
import laptopAsusImg from '../assets/laptop-asus.jpg'
import pcEscritorioImg from '../assets/pc-escritorio.jpg'

import tecladoImg from '../assets/teclado-gaming.jpg'
import comboImg from '../assets/combo-7-en-1.jpg'
import mouseImg from '../assets/mouse-inalambrico.jpg'

// Lista de productos
export const products = [
  // ROPA
  {
    id: 1,
    name: 'Camiseta básica',
    description: 'Camiseta de algodón unisex',
    price: 10,
    category: 'ropa',
    imageUrl: camisetaImg,
  },
  {
    id: 2,
    name: 'Pantalón de mezclilla',
    description: 'Pantalón de mezclilla azul clásico',
    price: 25,
    category: 'ropa',
    imageUrl: pantalonImg,
  },
  {
    id: 3,
    name: 'Sudadera con capucha',
    description: 'Sudadera cómoda para clima frío',
    price: 30,
    category: 'ropa',
    imageUrl: sudaderaImg,
  },

  // COMPUTADORAS
  {
    id: 4,
    name: 'Laptop HP 14"',
    description: 'Laptop con procesador Intel i7 y 16GB RAM',
    price: 1000,
    category: 'computadoras',
    imageUrl: laptopHpImg,
  },
  {
    id: 5,
    name: 'Laptop Gamer ASUS',
    description: 'Laptop gamer con tarjeta gráfica dedicada',
    price: 1500,
    category: 'computadoras',
    imageUrl: laptopAsusImg,
  },
  {
    id: 6,
    name: 'PC de Escritorio',
    description: 'PC de escritorio para oficina',
    price: 800,
    category: 'computadoras',
    imageUrl: pcEscritorioImg,
  },

  // ACCESORIOS
  {
    id: 7,
    name: 'Teclado Gaming RGB',
    description: 'Teclado mecánico con iluminación RGB',
    price: 50,
    category: 'accesorios',
    imageUrl: tecladoImg,
  },
  {
    id: 8,
    name: 'Combo Pro 7 en 1',
    description: 'Combo de accesorios para laptop 14”',
    price: 16.43,
    category: 'accesorios',
    imageUrl: comboImg,
  },
  {
    id: 9,
    name: 'Mouse inalámbrico',
    description: 'Mouse ergonómico inalámbrico',
    price: 20,
    category: 'accesorios',
    imageUrl: mouseImg,
  },
]

// Helpers para reutilizar en las vistas
export function getProductsByCategory(category) {
  return products.filter(
    (p) => p.category.toLowerCase() === String(category).toLowerCase()
  )
}

export function getProductById(id) {
  return products.find((p) => p.id === Number(id))
}
