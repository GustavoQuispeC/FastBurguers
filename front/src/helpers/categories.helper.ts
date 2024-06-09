import { ICategory } from "@/interfaces/ICategory";
import { IProduct } from "@/interfaces/IProduct";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

//! Get all products by category
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

//! Get all categories
export async function getCategories() {
  try {
    const res = await fetch(`${apiURL}/categories`);
    const categories = await res.json();
    return categories;
  } catch (error: any) {
    throw new Error(`Error fetching categories: ${error.message}`);
  }
}

//! Add a new category
export async function addCategory(
  categoryName: string,
  token: string
): Promise<ICategory> {
  if (!token) {
    throw new Error("No token, authorization denied");
  }

  try {
    const res = await fetch(`${apiURL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: categoryName }),
    });

    if (!res.ok) {
      throw new Error(
        `Failed to add category: ${res.status} ${res.statusText}`
      );
    }

    const category = await res.json();
    return category;
  } catch (error: any) {
    throw new Error(`Error adding category: ${error.message}`);
  }
}

//! Update a category
export async function UpdateCategory(
  categoryName: string,
  categoryId: string,
  token: string
): Promise<ICategory> {
  if (!token) {
    throw new Error("No token, authorization denied");
  }

  try {
    const res = await fetch(`${apiURL}/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: categoryName }),
    });

    if (!res.ok) {
      throw new Error(
        `Failed to update category: ${res.status} ${res.statusText}`
      );
    }

    const category = await res.json();
    return category;
  } catch (error: any) {
    throw new Error(`Error updating category: ${error.message}`);
  }
}

//!Delete a category
export async function deleteCategory(
  categoryId: string,
  token: string
): Promise<ICategory> {
  if (!token) {
    throw new Error("No token, authorization denied");
  }

  try {
    const res = await fetch(`${apiURL}/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to delete category: ${res.status} ${res.statusText}`
      );
    }

    const category = await res.json();
    return category;
  } catch (error: any) {
    throw new Error(`Error deleting category: ${error.message}`);
  }
}
