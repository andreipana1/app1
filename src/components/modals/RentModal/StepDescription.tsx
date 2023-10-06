import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";

type Props = {
  loading: boolean;
  register: any;
  errors: FieldErrors<FieldValues>;
};

export default function StepDescription({ loading, errors, register }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="How would you describe your place?"
        subtitle="Short and sweet works best!"
      />
      <Input
        id="title"
        label="Title"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <hr />
      <Input
        id="description"
        label="Description"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
}
