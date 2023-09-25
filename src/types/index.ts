import { Session, User } from "next-auth";
import { Listing, Reservation } from "@prisma/client";
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

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  favoriteIds?: string[];
};

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};
