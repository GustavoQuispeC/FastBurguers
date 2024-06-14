import { IRating } from "@/interfaces/IRating";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function postRating(
  rating: number,
  comment: string,
  orderId: string,
  userId: string
) {
  try {
    const res = await fetch(`${apiURL}/order-ratings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating, comment, orderId, userId }),
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function postProductRating(
  userId: string,
  productRatings: { productId: string; rating: number; comment: string }[]
) {
  try {
    const res = await fetch(`${apiURL}/product-ratings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, rating: productRatings }),
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getRating(): Promise<IRating[]> {
  try {
    const response = await fetch(`${apiURL}/order-ratings`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: IRating[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export async function geProductRating() {
  try {
    const response = await fetch(`${apiURL}/product-ratings`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: IRating[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}
