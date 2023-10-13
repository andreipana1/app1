import React from "react";
import { twJoin } from "tailwind-merge";

import { CategoryBoxProps as Props } from "@/types";

const CategoryInput = ({ icon: Icon, ...rest }: Props) => (
  <div
    onClick={() => rest.onClick(rest.label)}
    className={twJoin(
      `rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer`,
      rest.selected ? "border-black" : "border-neutral-200",
    )}
  >
    <Icon size={30} />
    <div className="font-semibold">{rest.label}</div>
  </div>
);

export default CategoryInput;
