"use client";

import { useMemo } from "react";
import useCountries from "@/hooks/useCountries";
import { useSearchParams } from "next/navigation";
import { differenceInDays } from "date-fns";
import { BiSearch } from "react-icons/bi";

export default function Search() {
  const searchParams = useSearchParams();

  const { getByValue } = useCountries();
  const locationValue = searchParams?.get("locationValue");
  const startDate = searchParams?.get("startDate");
  const endDate = searchParams?.get("endDate");
  const guestCount = searchParams?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) return getByValue(locationValue)?.label;
    return "Anywhere";
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diff = differenceInDays(end, start);
      const days = diff === 0 ? 1 : diff;

      return `${days} Day${days !== 1 ? "s" : ""}`;
    }

    return "Any Week";
  }, [endDate, startDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) return `${guestCount} Guests`;
    return "Add Guests";
  }, [guestCount]);

  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          {durationLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
