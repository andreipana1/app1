import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { CounterProps as Props } from "@/types";

export default function Counter({ onChange, value, subtitle, title }: Props) {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) return;
    onChange(value + 1);
  }, [onChange, value]);

  return (
    <div className="counter">
      <div className="control__header">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>

      <div className="flex flex-row items-center gap-4">
        <div onClick={onReduce} className="control-counter">
          <AiOutlineMinus />
        </div>
        <div className="font-light text-xl text-neutral-600">{value}</div>
        <div onClick={onAdd} className="control-counter">
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
}
