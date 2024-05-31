import axios from "axios";
import { IProduct } from "@/interfaces/IProduct";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsByCategory(
  categoryName: string
): Promise<IProduct[]> {
  try {
    const response = await axios.get(`${apiURL}/products/categories`, {
      params: { category: categoryName }, // Usar parámetros de consulta
    });

    const products: IProduct[] = response.data;
    console.log(products);
    return products;
  } catch (error: any) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
}
