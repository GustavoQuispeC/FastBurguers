import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import {
  LoginUserTerceros,
  RegisterUserTerceros,
} from "@/helpers/AutenticacionTerceros.helper";

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
        // Intentar iniciar sesión
        try {
          await LoginUserTerceros(email);

          return true; // Inicio de sesión exitoso
        } catch (loginError) {
          console.error(
            "Login failed, attempting to register user:",
            loginError
          );

          // Si el inicio de sesión falla, intentar registrar al usuario
          try {
            await RegisterUserTerceros({ email, name });

            return true; // Registro exitoso
          } catch (registerError) {
            console.error("Error during user registration:", registerError);
            return false; // Registro fallido
          }
        }
      } catch (error) {
        console.error("Error during the signIn process:", error);
        return false; // Fallo general
      }
    },
  },
});

export { handler as GET, handler as POST };
