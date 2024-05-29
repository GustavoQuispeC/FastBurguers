import productosPreload from "../../helpers/productos";
import Link from "next/link";

interface GridProductsProps {
  categoryId: number;
}

const FiltroProductos: React.FC<GridProductsProps> = ({ categoryId }) => {
  const filteredProducts = productosPreload.filter((product) =>
    product.categoryId.includes(categoryId)
  );

  return (
    <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 w-11/12 justify-items-center">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md p-4 text-center "
        >
          <img
            src={product.imgUrl}
            alt={product.name}
            className="w-72 h-72 object-cover rounded-t-lg "
          />
          <h2 className="font-bold text-lg mt-2">{product.name}</h2>
          <p className="text-gray-600 mt-1">{product.description}</p>
          <p className="text-gray-800 text-2xl font-bold mt-2">
            ${product.price}
          </p>
          <Link href={`/product/${product.id}`} key={product.name}>
            <button className=" bg-orange-500 rounded-xl p-2 px-10 mt-2 text-white font-bold border-none">
              Ver más
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FiltroProductos;
