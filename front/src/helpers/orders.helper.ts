const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function createOrder(
  order: { userId: string; products: { id: string; size: string }[] },
  token: string
) {
  try {
    const res = await fetch(`${apiURL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });

    if (!res.ok) {
      const errorDetails = await res.json();
      throw new Error(
        `Error creando orden: ${res.status} - ${errorDetails.message}`
      );
    }

    const data = await res.json();

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getOrders(userId: string, token: string) {
  try {
    const res = await fetch(`${apiURL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getOrdersByID(orderId: string) {
  try {
    const res = await fetch(`${apiURL}/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
