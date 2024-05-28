interface Burger {
  id: number;
  name: string;
  price: number;
  photo: string;
  details: string;
}

const productosPreload: Burger[] = [
  {
    id: 1,
    name: "Hamburguesa Clásica",
    price: 5.99,
    photo: "/hamburguesa1.png",
    details:
      "Carne de res, lechuga, tomate, cebolla, pepinillos, queso cheddar y salsa especial.",
  },
  {
    id: 2,
    name: "Hamburguesa BBQ",
    price: 6.99,
    photo: "/hamburguesa2.jpg",
    details:
      "Carne de res, salsa BBQ, cebolla caramelizada, queso cheddar y bacon crujiente.",
  },
  {
    id: 3,
    name: "Hamburguesa Vegetariana",
    price: 5.49,
    photo: "/hamburguesa3.webp",
    details:
      "Filete de soja marinada, lechuga, tomate, cebolla, pepinillos, queso suizo y salsa de aguacate.",
  },
  {
    id: 4,
    name: "Hamburguesa Doble Queso",
    price: 7.49,
    photo: "/hamburguesa4.jpg",
    details:
      "Doble carne de res, doble queso cheddar, lechuga, tomate, cebolla y salsa especial.",
  },
  {
    id: 5,
    name: "Hamburguesa Picante",
    price: 6.49,
    photo: "loginHamburguesa.jpeg",
    details:
      "Carne de res sazonada con especias, jalapeños, queso pepper jack, cebolla morada y salsa picante.",
  },
  {
    id: 6,
    name: "Hamburguesa de Pollo",
    price: 5.99,
    photo: "/hamburguesa5.webp",
    details:
      "Filete de pollo a la parrilla, lechuga, tomate, cebolla, mayonesa y mostaza.",
  },
];

export default productosPreload;
