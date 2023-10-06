import { Listing, Reservation } from "@prisma/client";
import { Session, User } from "next-auth";
import React, { ReactNode } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

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

export interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

export interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

export interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

export interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export interface CategoryViewProps {
  icon: IconType;
  label: string;
  description: string;
}

export interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}
