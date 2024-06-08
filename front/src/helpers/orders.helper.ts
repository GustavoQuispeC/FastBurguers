export async function createOrder(order: { userId: string; products: { id: string }[] }, token: string) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${apiURL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify(order),
    });

    if (!res.ok) {
      throw new Error('Failed to create order');
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getOrder(orderId: string, token: string) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${apiURL}/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch orders');
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}