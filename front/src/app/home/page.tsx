import Carrusel from "../components/carrusel/Carrusel";
import GridProducts from "../components/gridProducts/GridProducts";

const Home = () => {
  return (
    <div className="my-10">
      <Carrusel />

      <h1 className=" font-bold mt-10 ml-5">
        PROMOCIONES DE HAMBURGUESAS ONLINE
      </h1>

      <GridProducts />

      <h1 className=" font-bold mt-10 ml-5">MENU DE HAMBURGUESAS</h1>

      <GridProducts />
    </div>
  );
};

export default Home;
