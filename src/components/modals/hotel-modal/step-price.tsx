import { FieldErrors } from "react-hook-form";

import Heading from "@/components/heading";
import Input from "@/components/inputs/input";

type Props = {
  loading: boolean;
  register: any;
  errors: FieldErrors;
};

export default function StepPrice({ loading, register, errors }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Set your room rate"
        subtitle="What's your nightly rate per room?"
      />
      <Input
        id="price"
        label="Nightly Rate (USD)"
        formatPrice
        type="number"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
}
