import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import {
  LoginUserTerceros,
  RegisterUserTerceros,
} from "@/helpers/AutenticacionTerceros.helper";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const email = user.email as string;
      const name = user.name as string;

      try {
        // Intentar registrar al usuario
        try {
          await RegisterUserTerceros({ email, name });

          // Registro exitoso, intentar iniciar sesión

          const data = await LoginUserTerceros(email);
          const cookieData = JSON.stringify(data);

          // Iniciar sesión exitoso, crear y establecer cookie
          cookies().set("userSession", cookieData, {
            path: "/",
            maxAge: 3600,
            sameSite: "lax",
          });

          return true;
        } catch (registerError) {
          console.error(
            "Error during user registration and login:",
            registerError
          );
          return false; // Registro fallido
        }
      } catch (error) {
        console.error("Error during the signIn process:", error);
        return false; // Fallo general
      }
    },
  },
});

export { handler as GET, handler as POST };
