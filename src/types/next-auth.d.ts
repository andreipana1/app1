import NextAuth, { Session, User } from "next-auth";

import { SafeUser } from "@/types/index";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User &
      SafeUser & {
        name: string;
        email: string;
        image: string;
        isAdmin: boolean;
      };
  }
}
