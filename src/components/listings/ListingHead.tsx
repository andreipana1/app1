import Image from "next/image";
import React from "react";

import Heading from "@/components/Heading";
import HeartButton from "@/components/HeartButton";
import useCountries from "@/hooks/useCountries";
import { ListingHeadProps as Props } from "@/types";

export default function ListingHead({ id, ...rest }: Props) {
  const { getByValue } = useCountries();
  const location = getByValue(rest.locationValue);

  return (
    <>
      <Heading
        title={rest.title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={rest.imageSrc}
          alt="Image"
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={rest.currentUser} />
        </div>
      </div>
    </>
  );
}
