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
    const res = await fetch(`${apiURL}/products/${id}`);

    const products: IProduct[] = await res.json();
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
