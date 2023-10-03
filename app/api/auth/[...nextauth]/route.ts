import prisma from "@libs/prismaDb";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        name: {
          label: "name",
          type: "text",
          placeholder: "username",
        },
        email: {
          label: "Email",
          type: "email",
          placeholder: "useremail@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return new Error("Please enter an email & password");
        }

        const currentUser = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!currentUser || !currentUser?.password) {
          return new Error("User not found");
        }

        const isPasswordValid = await compare(
          credentials.password,
          currentUser.password
        );

        if (!isPasswordValid) {
          return new Error("Incorrect password");
        }

        const {password, ...userWithoutPassword} = currentUser

        return userWithoutPassword;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
