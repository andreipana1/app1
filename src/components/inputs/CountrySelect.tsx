import React from "react";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

function CountrySelect({ onChange, value }: CountrySelectProps) {
  return <div>Country select</div>;
}

export default CountrySelect;
