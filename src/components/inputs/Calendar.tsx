import { DateRange, Range, RangeKeyDict } from "react-date-range";

interface DatePickerProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

export default function Calendar(props: DatePickerProps) {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[props.value]}
      date={new Date()}
      onChange={props.onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={props.disabledDates}
    />
  );
}
