import { IProduct } from "@/interfaces/IProduct";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsByCategory(
  categoryName: string
): Promise<IProduct[]> {
  try {
    const res = await fetch(`${apiURL}/products/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categories: categoryName }),
    });

    const products: IProduct[] = await res.json();
    console.log(products);
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
