import { IProduct } from "../interfaces/IProduct";

const productosPreload: IProduct[] = [
  {
    id: 1,
    name: "Hamburguesa Clásica",
    description:
      "Carne de res, lechuga, tomate, cebolla, pepinillos, queso cheddar y salsa especial.",
    price: 5.99,
    stock: 10,
    imgUrl: "/hamburguesa1.png",
    categoryId: 1,
  },
  {
    id: 2,
    name: "Hamburguesa BBQ",
    description:
      "Carne de res, salsa BBQ, cebolla caramelizada, queso cheddar y bacon crujiente.",
    price: 6.99,
    stock: 15,
    imgUrl: "/hamburguesa2.jpg",
    categoryId: 1,
  },
  {
    id: 3,
    name: "Hamburguesa Vegetariana",
    description:
      "Filete de soja marinada, lechuga, tomate, cebolla, pepinillos, queso suizo y salsa de aguacate.",
    price: 5.49,
    stock: 8,
    imgUrl: "/hamburguesa3.webp",
    categoryId: 1,
  },
  {
    id: 4,
    name: "Hamburguesa Doble Queso",
    description:
      "Doble carne de res, doble queso cheddar, lechuga, tomate, cebolla y salsa especial.",
    price: 7.49,
    stock: 12,
    imgUrl: "/hamburguesa4.jpg",
    categoryId: 1,
  },
  {
    id: 5,
    name: "Hamburguesa Picante",
    description:
      "Carne de res sazonada con especias, jalapeños, queso pepper jack, cebolla morada y salsa picante.",
    price: 6.49,
    stock: 9,
    imgUrl: "/loginHamburguesa.jpeg",
    categoryId: 1,
  },
  {
    id: 6,
    name: "Sandwich de Pollo Clásico",
    description:
      "Filete de pollo a la parrilla, lechuga, tomate, cebolla, mayonesa y mostaza.",
    price: 5.99,
    stock: 20,
    imgUrl: "/sandwich-pollo1.jpg",
    categoryId: 2,
  },
  {
    id: 7,
    name: "Sandwich de Pollo BBQ",
    description:
      "Filete de pollo a la parrilla con salsa BBQ, cebolla caramelizada y queso cheddar.",
    price: 6.99,
    stock: 15,
    imgUrl: "/sandwich-pollo2.jpg",
    categoryId: 2,
  },
  {
    id: 8,
    name: "Papas Fritas",
    description:
      "Papas fritas crujientes y doradas, perfectas como acompañamiento.",
    price: 2.99,
    stock: 30,
    imgUrl: "/papas1.jpg",
    categoryId: 3,
  },
  {
    id: 9,
    name: "Aros de Cebolla",
    description: "Aros de cebolla empanizados y fritos hasta quedar dorados.",
    price: 3.49,
    stock: 25,
    imgUrl: "/aros_cebolla.jpg",
    categoryId: 3,
  },
  {
    id: 10,
    name: "Refresco",
    description: "Selección de refrescos variados.",
    price: 1.99,
    stock: 50,
    imgUrl: "/refresco.jpg",
    categoryId: 4,
  },
  {
    id: 11,
    name: "Batido de Chocolate",
    description: "Delicioso batido de chocolate cremoso.",
    price: 3.99,
    stock: 20,
    imgUrl: "/batido_chocolate.jpg",
    categoryId: 4,
  },
  {
    id: 12,
    name: "Helado de Vainilla",
    description: "Helado cremoso de vainilla, perfecto para un postre.",
    price: 2.99,
    stock: 15,
    imgUrl: "/helado_vainilla.jpg",
    categoryId: 5,
  },
  {
    id: 13,
    name: "Pastel de Chocolate",
    description: "Delicioso pastel de chocolate con cobertura de chocolate.",
    price: 4.99,
    stock: 10,
    imgUrl: "/pastel_chocolate.jpg",
    categoryId: 5,
  },
  {
    id: 14,
    name: "Ensalada César",
    description: "Lechuga, crutones, queso parmesano y aderezo César.",
    price: 5.49,
    stock: 12,
    imgUrl: "/ensalada_cesar.jpg",
    categoryId: 6,
  },
  {
    id: 15,
    name: "Ensalada Griega",
    description: "Tomate, pepino, cebolla, aceitunas y queso feta.",
    price: 5.99,
    stock: 10,
    imgUrl: "/ensalada_griega.jpg",
    categoryId: 6,
  },
];

export default productosPreload;
