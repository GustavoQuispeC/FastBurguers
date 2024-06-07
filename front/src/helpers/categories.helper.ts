import { IProduct } from "@/interfaces/IProduct";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsByCategory(
  categoryName: string
): Promise<IProduct[]> {
  try {
    const res = await fetch(`${apiURL}/products/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categories: [categoryName] }),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const products: IProduct[] = await res.json();

    return products;
  } catch (error: any) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`${apiURL}/categories`);
    const categories = await res.json();
    return categories;
  } catch (error: any) {
    throw new Error(`Error fetching categories: ${error.message}`);
  }
}
