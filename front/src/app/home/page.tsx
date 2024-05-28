import Carrusel from "../components/carrusel/Carrusel";
import GridProducts from "../components/gridProducts/GridProducts";

const Home = () => {
  return (
    <div className="my-10">
      <Carrusel />

      <ul className="flex gap-3 bg-slate-800 mt-10 p-3 justify-around font-bold text-white w-11/12 rounded-lg items-center m-auto">
        <li>
          <button className=" p-2 rounded-xl  border-none hover:bg-black hover:text-orange-400">
            Hamburguesas
          </button>
        </li>
        <li>
          <button className=" p-2 rounded-xl border-none hover:bg-black hover:text-orange-400">
            Sandwich de pollo
          </button>
        </li>
        <li>
          <button className=" p-2 rounded-xl border-none hover:bg-black hover:text-orange-400">
            Papas y complementos
          </button>
        </li>
        <li>
          <button className=" p-2 rounded-xl border-none hover:bg-black hover:text-orange-400">
            Bebidas
          </button>
        </li>
        <li>
          <button className=" p-2 rounded-xl border-none hover:bg-black hover:text-orange-400">
            Postres
          </button>
        </li>
        <li>
          <button className=" p-2 rounded-xl border-none hover:bg-black hover:text-orange-400">
            Ensaladas
          </button>
        </li>
      </ul>

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
