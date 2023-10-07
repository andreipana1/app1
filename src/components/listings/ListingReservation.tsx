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
    <section className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <header className="flex items-center gap-1 p-4">
        <h2 className="text-2xl font-semibold">{formatToMoney(price)}</h2>
        <p className="font-light text-neutral-600">night</p>
      </header>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <footer>
        <div className="p-4">
          <Button label="Reserve" onClick={onSubmit} disabled={disabled} />
        </div>
        <hr />
        <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
          <h2>Total</h2>
          <p>{formatToMoney(totalPrice)}</p>
        </div>
      </footer>
    </section>
  );
}
