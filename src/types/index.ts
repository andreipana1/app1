import { Listing, Reservation } from "@prisma/client";
import { Session, User } from "next-auth";
import React, {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";
import { Range } from "react-date-range";
import { FieldError, FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

export interface Props {
  children?: React.ReactNode;
  error?: FieldError;
  register?: UseFormRegister<FieldValues>;
  required?: boolean;
  errors?: FieldErrors;
  label?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  type?: string;
  id?: string;
  categories?: Array<{ label: string; icon: IconType; description: string }>;
  category?: string;
  setCategory?: (category: string) => void;
  categoryError?: boolean;
  onCounterChange?: (action: string, value: number) => void;
  map?: React.ReactElement;
  onLocationChange?: (value: CountrySelectValue) => void;
  imageSrc?: string;
  onUpload?: (value: string) => void;
  price?: number;
  onPriceChange?: (value: number) => void;
  onClick?: () => void;
  isPending?: boolean;
}

export interface SessionInterface extends Session {
  user: User &
    SafeUser & {
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
  currentUser?: SessionInterface | null;
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
  currentUser?: SessionInterface | null;
}

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  type?: "button" | "submit" | "reset" | undefined;
}

export interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined
    | any;
  locationValue: string;
}

export interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[] | SafeReservation | never[];
}

export interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

export interface ListingCardProps {
  data: SafeListing | Favorite;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SessionInterface | null;
}

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

export interface CountrySelectProps {
  value?: CountrySelectValue | null | any;
  onChange: (value: CountrySelectValue) => void;
}

export interface LoginBodyContentProps {
  isPending: boolean;
  register: UseFormRegister<FieldValues> | any;
  errors: FieldErrors<FieldValues>;
}

export type Favorite = {
  bathroomCount: number;
  category: string;
  createdAt: string;
  description: string;
  guestCount: number;
  id: string;
  imageSrc: string;
  locationValue: string;
  price: number;
  roomCount: number;
  title: string;
  userId: string;
};

export interface ListingClientProps {
  currentUser?: SessionInterface | null;
  reservations?: SafeReservation[];
  listing:
    | (SafeListing & {
        user: SafeUser;
      })
    | any;
}
