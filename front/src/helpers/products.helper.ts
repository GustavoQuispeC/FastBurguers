import { IProduct, InsertProductProps, UpdateProductProps } from "@/interfaces/IProduct";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

//! Get all products
export async function getProducts() {
  try {
    const res = await fetch(`${apiURL}/products`);

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

//! obtener productos desde productlist
export const getProductListById = async (id: string) => {
  console.log("getProductListById called with:", id); // Log the productId
  if (!id) {
    throw new Error("Product ID is undefined");
  }
  const response = await fetch(`http://localhost:3001/product/${id}`);
  if (!response.ok) {
    throw new Error(`Error fetching product list: ${response.statusText}`);
  }
  return await response.json();
};

//! Insert product
export const insertProduct = async (
  product: InsertProductProps,
  imageFile: File | null,
  token: string
) => {
  try {
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("stock", product.stock.toString());
    formData.append("discount", product.discount.toString());
    formData.append("categoryID", product.categoryID);
    formData.append("size", product.size);

    if (imageFile) {
      formData.append("file", imageFile);
    }
    const response = await fetch(`${apiURL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to insert product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in insertProduct:", error);
    throw error;
  }
};

//! Update product
export const updateProduct = async (
  id: string,
  product: UpdateProductProps,
  imageFile: File | null,
  token: string
) => {
  try {
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("stock", product.stock.toString());
    formData.append("discount", product.discount.toString());
    formData.append("categoryID", product.categoryID);
    formData.append("size", product.size);

    if (imageFile) {
      formData.append("file", imageFile);
    }

    const response = await fetch(`${apiURL}/products/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in updateProduct:", error);
    throw error;
  }
};
