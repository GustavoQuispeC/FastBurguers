import { IPedido } from "@/interfaces/IPedido";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function GetPedidos(token: string): Promise<IPedido[]> {
  try {
    const res = await fetch(`${apiURL}/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const order = await res.json();
    console.log(order);

    return order;
  } catch (error: any) {
    throw new Error(`Error al traer las ordenes: ${error.message}`);
  }
}
