import { IOrderList } from "@/interfaces/IOrder";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function GetPedidos(token: string): Promise<IOrderList[]> {
  try {
    const res = await fetch(`${apiURL}/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const order = await res.json();

    return order;
  } catch (error: any) {
    throw new Error(`Error al traer las ordenes: ${error.message}`);
  }
}

export async function ChangeStatus(
  token: string,
  id: string,
  status: string
): Promise<IOrderList[]> {
  try {
    const res = await fetch(`${apiURL}/status-histories/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status }),
    });

    const order = await res.json();

    return order;
  } catch (error: any) {
    throw new Error(`Error al traer las ordenes: ${error.message}`);
  }
}
