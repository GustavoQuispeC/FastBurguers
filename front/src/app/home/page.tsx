import Carrusel from "../components/carrusel/Carrusel";
import GridProducts from "../components/gridProducts/GridProducts";
import productosPreload from "../helpers/productos";

const Home = () => {
  // Filtrar productos de la categoría de promociones
  const promocionesProducts = productosPreload.filter(
    (product) => product.categoryId === 7
  );

  const MenuHamburguesas = productosPreload.filter(
    (product) => product.categoryId === 1
  );

  return (
    <div className="my-10">
      <Carrusel />

      <h1 className="font-bold mt-10 ml-5">
        PROMOCIONES DE HAMBURGUESAS ONLINE
      </h1>

      <GridProducts products={promocionesProducts} />

      <h1 className="font-bold mt-10 ml-5">MENU DE HAMBURGUESAS</h1>

      <GridProducts products={MenuHamburguesas} />
    </div>
  );
};

export default Home;
