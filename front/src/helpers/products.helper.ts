import { IProduct } from "@/interfaces/IProduct";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts() {
  try {
    const res = await fetch(`${apiURL}/products`);

    const products: IProduct[] = await res.json();
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getProductsById(id: string) {
  try {
    const products = await getProducts();
    const product = products.find((product) => product.id.toString() === id);
    if (!product) throw new Error("Product no encontrado");
    return product;
  } catch (error: any) {
    throw new Error(error);
  }
}
