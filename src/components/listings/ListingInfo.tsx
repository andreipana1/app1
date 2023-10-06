"use client";

import dynamic from "next/dynamic";

import Avatar from "@/components/Avatar";
import ListingCategory from "@/components/listings/ListingCategory";
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
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex items-center gap-2">
          <div>Hosted by {user.name}</div>
          <Avatar src={user.image} />
        </div>
        <div className="flex items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          description={category.description}
          label={category.label}
          icon={category.icon}
        />
      )}
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
}
