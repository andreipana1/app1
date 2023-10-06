import React from "react";

import Button from "@/components/Button";
import Calendar from "@/components/inputs/Calendar";
import { ListingReservationProps as Props } from "@/types";
import { formatToMoney } from "@/utils/helpers";

export default function ListingReservation({
  dateRange,
  disabledDates,
  onChangeDate,
  disabled,
  price,
  totalPrice,
  onSubmit,
}: Props) {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">{formatToMoney(price)}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button label="Reserve" onClick={onSubmit} disabled={disabled} />
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>{formatToMoney(totalPrice)}</div>
      </div>
    </div>
  );
}
