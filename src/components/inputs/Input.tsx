"use client";

import cx from "classnames";
import { BiDollar } from "react-icons/bi";

import { InputProps } from "@/types";

export default function Input({ id, register, required, ...rest }: InputProps) {
  return (
    <div className="relative w-full">
      {rest.formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}

      <input
        {...register(id, { required })}
        id={id}
        disabled={rest.disabled}
        type={rest.type}
        className={cx(
          `peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed`,
          rest.formatPrice ? "pl-9" : "pl-4",
          rest.errors[id]
            ? "border-rose-500 focus:border-rose-500"
            : "border-neutral-300 focus:border-black",
        )}
      />
      <label
        htmlFor={id}
        className={cx(
          `absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`,
          rest.formatPrice ? "left-9" : "left-4",
          rest.errors[id] ? "text-rose-500" : "text-zinc-400",
        )}
      >
        {rest.label}
      </label>
    </div>
  );
}
