export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard"] }; //paginas para proteger si no esta logueado
