import CredentialsProvider from "next-auth/providers/credentials";
import auth from "@/app/api/auth";
import { UserAuthDto } from "@/app/dto/user-auth.dto";
import NextAuth from "next-auth";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        const payload: UserAuthDto = {
          email: username,
          password: password,
        };
        const { data } = await auth(payload);

        if (data) {
          cookies().set("JWToken", data.token);

          return {
            ...data.user,
            name: data.user?.firstName,
            role: data.user?.role,
          };
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },
    session({ session, token, user }) {
      if (token) {
        session.user = token;
        session.user.role = token.role;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
});

export { handler as GET, handler as POST };
