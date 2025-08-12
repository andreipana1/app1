import React from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

import Heading from "@/components/heading";
import Input from "@/components/inputs/input";

type Props = {
  loading: boolean;
  register: any;
  errors: FieldErrors<FieldValues>;
};

export default function StepDescription({ loading, errors, register }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="How would you describe your hotel?"
        subtitle="Help guests understand what makes your hotel special!"
      />
      <Input
        id="title"
        label="Hotel Name"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <hr />
      <Input
        id="description"
        label="Hotel Description"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
}
