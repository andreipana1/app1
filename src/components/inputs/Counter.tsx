import React from "react";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

export default function Counter({
  onChange,
  value,
  subtitle,
  title,
}: CounterProps) {
  return <div>Counter</div>;
}
