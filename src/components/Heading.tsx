import cx from "classnames";

import { HeadingProps } from "@/types";

export default function Heading({ center, subtitle, title }: HeadingProps) {
  return (
    <div className={cx(center ? "text-center" : "text-start")}>
      <h1 className="text-2xl font-bold">{title}</h1>
      <h3 className="font-light text-neutral-500 mt-2">{subtitle}</h3>
    </div>
  );
}
