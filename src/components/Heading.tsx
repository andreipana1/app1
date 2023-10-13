import { HeadingProps } from "@/types";

const Heading = ({ center, subtitle, title }: HeadingProps) => (
  <header className={center ? "text-center" : "text-start"}>
    <h1 className="text-2xl font-bold">{title}</h1>
    <h3 className="font-light text-neutral-500 mt-2">{subtitle}</h3>
  </header>
);

export default Heading;
