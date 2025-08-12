import React from "react";

import Heading from "@/components/heading";
import Counter from "@/components/inputs/counter";

type Props = {
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  setCustomValue: (id: string, value: any) => void;
};

export default function StepInfo({
  setCustomValue,
  guestCount,
  roomCount,
  bathroomCount,
}: Props) {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Share some basics about your hotel"
        subtitle="What amenities and accommodations do you offer?"
      />
      <Counter
        onChange={(value) => setCustomValue("guestCount", value)}
        value={guestCount}
        title="Maximum Guests"
        subtitle="How many guests can you accommodate per room?"
      />
      <hr />
      <Counter
        onChange={(value) => setCustomValue("roomCount", value)}
        value={roomCount}
        title="Hotel Rooms"
        subtitle="How many rooms does your hotel have?"
      />
      <hr />
      <Counter
        onChange={(value) => setCustomValue("bathroomCount", value)}
        value={bathroomCount}
        title="Bathrooms"
        subtitle="How many bathrooms are available?"
      />
    </div>
  );
}
