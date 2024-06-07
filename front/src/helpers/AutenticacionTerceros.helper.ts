import { IUserTerceros } from "@/interfaces/IUserTerceros";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function RegisterUserTerceros(
  user: Partial<IUserTerceros> // Cambiado a Partial para aceptar solo name y email
): Promise<IUserTerceros> {
  try {
    const res = await fetch(`${apiURL}/auth/third/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const newUser = await res.json();

    return newUser;
  } catch (error: any) {
    throw new Error(`Error creando usuario: ${error.message}`);
  }
}
export async function LoginUserTerceros(email: string): Promise<IUserTerceros> {
  try {
    const res = await fetch(`${apiURL}/auth/third/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      throw new Error(
        `Error iniciando sesión: ${res.status} - ${res.statusText}`
      );
    }

    const user = await res.json();

    return user;
  } catch (error: any) {
    throw new Error(`Error iniciando sesion: ${error.message}`);
  }
}
