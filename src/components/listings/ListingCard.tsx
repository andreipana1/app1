"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ListingCardProps {
  data: any;
  reservation?: any;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: any | null;
}

export default function ListingCard({
  currentUser,
  actionId,
  onAction,
  actionLabel,
  reservation,
  data,
  disabled,
}: ListingCardProps) {
  const router = useRouter();

  return (
    <section
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listing/${data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            src={data.imageSrc}
            alt="Listing"
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div></div>
        </div>
      </div>
    </section>
  );
}
