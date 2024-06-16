const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function getStorageBack(token: string, userId: string) {
  try {
    const res = await fetch(`${apiURL}/storage/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

export async function postStorageBack(
  token: string,
  userId: string,
  id: string,
  quantity: number,
  size: string
) {
  try {
    const res = await fetch(`${apiURL}/storage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        userId: userId,
        products: [{ id: id, quantity: quantity, size: size }],
      }),
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
