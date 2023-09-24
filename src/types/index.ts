import { Session, User } from "next-auth";
import { ReactNode } from "react";

export interface Props {
  children: ReactNode;
}

export interface SessionInterface extends Session {
  user: User & {
    name: string;
    email: string;
    image: string;
    isAdmin: boolean;
  };
}
