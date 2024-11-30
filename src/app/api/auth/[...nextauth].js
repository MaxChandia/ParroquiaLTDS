import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma"; // Asegúrate de que el archivo "@/prisma" exporte correctamente el cliente de Prisma.

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Define tus proveedores aquí, por ejemplo:
    // GitHub
    /*
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    */
  ],
  session: {
    strategy: "jwt", // Usa "database" si deseas almacenar sesiones en la base de datos
  },
  callbacks: {
    // Define tus callbacks personalizados si es necesario
    async session({ session, token, user }) {
      return session;
    },
    async signIn({ user, account, profile }) {
      return true; // Permite iniciar sesión
    },
  },
};

export default NextAuth(authOptions);