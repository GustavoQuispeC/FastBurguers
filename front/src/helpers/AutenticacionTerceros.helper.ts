import { IUserTerceros } from "@/interfaces/IUserTerceros";
import { LoginTerceros } from "@/types";

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
export async function LoginUserTerceros(
  user: LoginTerceros
): Promise<IUserTerceros> {
  try {
    const res = await fetch(`${apiURL}/third/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const User = await res.json();

    return User;
  } catch (error: any) {
    throw new Error(`Error iniciando sesion: ${error.message}`);
  }
}
