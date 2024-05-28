import { IProduct } from "../interfaces/IProduct";

const promociones: IProduct[] = [
  {
    id: 1,
    name: "Hamburguesa Clásica",
    description:
      "Carne de res, lechuga, tomate, cebolla, pepinillos, queso cheddar y salsa especial.",
    price: 5.99,
    stock: 10,
    imgUrl: "https://via.placeholder.com/150/808080/FFFFFF?text=Imagen+1",
    categoryId: 1,
    discount: 10, // 10% de descuento
  },
  {
    id: 2,
    name: "Hamburguesa BBQ",
    description:
      "Carne de res, salsa BBQ, cebolla caramelizada, queso cheddar y bacon crujiente.",
    price: 6.99,
    stock: 15,
    imgUrl: "https://via.placeholder.com/150/808080/FFFFFF?text=Imagen+2",
    categoryId: 1,
    discount: 15, // 15% de descuento
  },
  {
    id: 3,
    name: "Hamburguesa Vegetariana",
    description:
      "Filete de soja marinada, lechuga, tomate, cebolla, pepinillos, queso suizo y salsa de aguacate.",
    price: 5.49,
    stock: 8,
    imgUrl: "https://via.placeholder.com/150/808080/FFFFFF?text=Imagen+3",
    categoryId: 1,
    discount: 5, // 5% de descuento
  },
  {
    id: 4,
    name: "Hamburguesa Doble Queso",
    description:
      "Doble carne de res, doble queso cheddar, lechuga, tomate, cebolla y salsa especial.",
    price: 7.49,
    stock: 12,
    imgUrl: "https://via.placeholder.com/150/808080/FFFFFF?text=Imagen+4",
    categoryId: 1,
    discount: 20, // 20% de descuento
  },
  {
    id: 5,
    name: "Hamburguesa Picante",
    description:
      "Carne de res sazonada con especias, jalapeños, queso pepper jack, cebolla morada y salsa picante.",
    price: 6.49,
    stock: 9,
    imgUrl: "https://via.placeholder.com/150/808080/FFFFFF?text=Imagen+5",
    categoryId: 1,
    discount: 10, // 10% de descuento
  },
  {
    id: 6,
    name: "Sandwich de Pollo Clásico",
    description:
      "Filete de pollo a la parrilla, lechuga, tomate, cebolla, mayonesa y mostaza.",
    price: 5.99,
    stock: 20,
    imgUrl: "https://via.placeholder.com/150/808080/FFFFFF?text=Imagen+6",
    categoryId: 2,
    discount: 5, // 5% de descuento
  },
];

export default promociones;
