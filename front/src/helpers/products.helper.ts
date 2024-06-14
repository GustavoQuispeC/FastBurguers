import { IProduct } from "@/interfaces/IProduct";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

//! Get all products
export async function getProducts() {
  try {
    const res = await fetch(`${apiURL}/products/available`);

    const products: IProduct[] = await res.json();
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}

//! Get product by ID
export async function getProductsById(id: number): Promise<IProduct> {
  try {
    const res = await fetch(`${apiURL}/products/${id}`);

    const productData: any = await res.json();

    const product: IProduct = {
      ...productData,
      price: parseFloat(productData.price),
      stock: parseInt(productData.stock),
    };

    return product;
  } catch (error: any) {
    throw new Error(error);
  }
}
