"use client";

import dynamic from "next/dynamic";

import useCountries from "@/hooks/useCountries";
import { ListingInfoProps as Props } from "@/types";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

export default function ListingInfo({
  category,
  bathroomCount,
  guestCount,
  roomCount,
  user,
  locationValue,
  description,
}: Props) {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div>ListingInfo</div>
    </div>
  );
}
