import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

declare module "next-auth" {
  interface User {
    firstName?: string;
    lastName?: string;
    role?: string;
  }
  interface Session {
    user: User & {
      role: string;
    };
  }
}
