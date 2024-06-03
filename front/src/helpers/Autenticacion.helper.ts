import { IUser } from "@/interfaces/IUser";

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
    console.log(newUser);

    return newUser;
  } catch (error: any) {
    throw new Error(`Error creando usuario: ${error.message}`);
  }
}
