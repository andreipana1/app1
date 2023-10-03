import cx from "classnames";
import React from "react";

import { CategoryBoxProps as Props } from "@/types";

export default function CategoryInput({ icon: Icon, ...rest }: Props) {
  return (
    <div
      onClick={() => rest.onClick(rest.label)}
      className={cx(
        `rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer`,
        rest.selected ? "border-black" : "border-neutral-200",
      )}
    >
      <Icon size={30} />
      <div className="font-semibold">{rest.label}</div>
    </div>
  );
}
