"use client";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useCallback, useMemo } from "react";

import Button from "@/components/button";
import HeartButton from "@/components/heart-button";
import RuralHopBadge from "@/components/RuralHopBadge";
import useCountries from "@/hooks/useCountries";
import { ListingCardProps as Props } from "@/types";
import { formatToMoney } from "@/utils/helpers";

export default function ListingCard({
  actionId = "",
  onAction,
  actionLabel,
  reservation,
  data,
  disabled,
  currentUser,
}: Props) {
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [actionId, disabled, onAction],
  );

  const price = useMemo(() => {
    if (reservation) return formatToMoney(reservation.totalPrice);
    return formatToMoney(data.price);
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <Link href={`/listings/${data.id}`}>
      <article className="col-span-1 cursor-pointer group">
        <div className="flex flex-col gap-2 w-full">
          <figure className="aspect-square w-full relative overflow-hidden rounded-xl border border-dior-cream bg-dior-cream/10 hover:shadow-[0_4px_12px_rgba(42,92,84,0.1)] transition-all">
            <Image
              src={data.imageSrc}
              alt="Listing"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover h-full w-full grayscale hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
            />
            
                          {/* Eco-Friendly Badge positioned at top-left */}
            <RuralHopBadge amenity={(data as any)?.ecoFriendly} />
            
            {/* Heart Button positioned at top-right */}
            <div className="absolute top-3 right-3">
              <HeartButton listingId={data.id} currentUser={currentUser} />
            </div>
          </figure>

          <h1 className="font-semibold text-lg text-dior-green">
            {location?.region}, {location?.label}
          </h1>

          <p className="font-light text-dior-saddle">
            {reservationDate || data.category}
          </p>

          <footer className="flex flex-row items-center gap-1">
            <h3 className="font-semibold text-dior-green">{price}</h3>
            {!reservation && <p className="font-light text-dior-saddle">Night</p>}
          </footer>

          {onAction && actionLabel && (
            <Button
              small
              disabled={disabled}
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </article>
    </Link>
  );
}
