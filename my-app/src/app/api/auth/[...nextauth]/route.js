import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions= {
  pages: {
    signIn: "/signIn",
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials;
          const user = await prisma.user.findUnique({ where: { email: email } });

          if (!user) {
            throw new Error("User Not Found");
          }

          const isValid = await compare(password, user.password);
          if (!isValid) {
            throw new Error("Invalid Password");
          }

          return {
            id: user.id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          };
        } catch (error) {
          // Log the error for debugging purposes
          console.error("Authentication error:", error.message);
          throw error;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
