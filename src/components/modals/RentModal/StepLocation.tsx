import React from "react";

import Heading from "@/components/Heading";
import CountrySelect, {
  CountrySelectValue,
} from "@/components/inputs/CountrySelect";
import Map from "@/components/Map";

type Props = {
  location: CountrySelectValue | null;
  setCustomValue: (id: string, value: any) => void;
};

export default function StepLocation({ location, setCustomValue }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where is your place located?"
        subtitle="Help guests find you!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setCustomValue("location", value)}
      />

      <Map center={location?.latlng} />
    </div>
  );
}
