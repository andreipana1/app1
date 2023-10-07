import { twJoin } from "tailwind-merge";

import { ButtonProps as Props } from "@/types";

export default function Button({ icon: Icon, ...rest }: Props) {
  return (
    <button
      type={rest.type}
      disabled={rest.disabled}
      onClick={rest.onClick}
      className={twJoin(
        "relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition duration-300 w-full",
        rest.outline
          ? "bg-white border-black"
          : "bg-rose-500 text-white border-transparent",
        rest.small
          ? "text-sm py-1 font-light border-[1px]"
          : "text-md py-3 font-semibold border-2",
      )}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {rest.label}
    </button>
  );
}
