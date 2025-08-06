"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback } from "react";
import { GiBarn, GiMountains } from "react-icons/gi";
import { MdPets } from "react-icons/md";

interface Filter {
  id: string;
  label: string;
  icon: React.ElementType;
  param: string;
}

const ruralFilters: Filter[] = [
  {
    id: "pets",
    label: "Pet Friendly",
    icon: MdPets,
    param: "petsAllowed"
  },
  {
    id: "rural",
    label: "Rural Location",
    icon: GiBarn,
    param: "rural"
  },
  {
    id: "mountain",
    label: "Mountain View",
    icon: GiMountains,
    param: "mountain"
  }
];

export default function RuralFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterClick = useCallback((param: string) => {
    let currentQuery = {};

    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      [param]: currentQuery[param as keyof typeof currentQuery] ? undefined : "true"
    };

    if (!updatedQuery[param]) {
      delete updatedQuery[param];
    }

    const url = qs.stringifyUrl({
      url: "/",
      query: updatedQuery
    }, { skipNull: true });

    router.push(url);
  }, [router, searchParams]);

  return (
    <div className="flex flex-row items-center gap-2 overflow-x-auto pb-2">
      {ruralFilters.map((filter) => {
        const isSelected = searchParams?.get(filter.param) === "true";
        const Icon = filter.icon;

        return (
          <button
            key={filter.id}
            onClick={() => handleFilterClick(filter.param)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all
              ${isSelected 
                ? "border-green-600 bg-green-50 text-green-700" 
                : "border-gray-300 hover:border-gray-400 text-gray-600"
              }
            `}
          >
            <Icon size={16} />
            <span className="text-sm font-medium">{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
}