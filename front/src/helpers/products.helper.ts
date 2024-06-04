import { IProduct, InsertProductProps } from "@/interfaces/IProduct";

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
//! Insert product
export const insertProduct = async (product: InsertProductProps, token: string) => {
  try {
    const response = await fetch(`${apiURL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Failed to insert product");
    }

    console.log(response); // Logging before returning response data
    return await response.json();
  } catch (error) {
    console.error("Error in insertProduct:", error);
    throw error;
  }
};

// export const insertProduct = async (formData: FormData, token: string) => {
//   try {
//     const response = await fetch(`${apiURL}/products`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("Failed to insert product");
//     }

//     console.log(response);
//     return await response.json();
//   } catch (error) {
//     console.error("Error in insertProduct:", error);
//     throw error;
//   }
// };