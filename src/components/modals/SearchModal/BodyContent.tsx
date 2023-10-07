import dynamic from "next/dynamic";
import React, { useMemo } from "react";

import Heading from "@/components/Heading";
import CountrySelect, {
  CountrySelectValue,
} from "@/components/inputs/CountrySelect";

interface Props {
  location: CountrySelectValue | undefined;
  setLocation: (value: CountrySelectValue) => void;
}

export default function BodyContent({ setLocation, location }: Props) {
  const Map = useMemo(
    () =>
      dynamic(() => import("../../Map"), {
        ssr: false,
      }),
    [],
  );

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );
}
