import { IUser } from "@/interfaces/IUser";
import { LoginProps } from "@/types";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function RegisterUser(user: IUser): Promise<IUser> {
  try {
    const res = await fetch(`${apiURL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      const errorDetails = await res.json();
      throw new Error(
        `Error creando usuario: ${res.status} - ${errorDetails.message}`
      );
    }

    const newUser = await res.json();

    return newUser;
  } catch (error: any) {
    throw new Error(`Error creando usuario: ${error.message}`);
  }
}
export async function LoginUser(user: LoginProps): Promise<IUser> {
  try {
    const res = await fetch(`${apiURL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      const errorDetails = await res.json();
      throw new Error(
        `Error iniciando sesion: ${res.status} - ${errorDetails.message}`
      );
    }

    const User = await res.json();
    console.log(User);

    return User;
  } catch (error: any) {
    throw new Error(`Error iniciando sesion: ${error.message}`);
  }
}
