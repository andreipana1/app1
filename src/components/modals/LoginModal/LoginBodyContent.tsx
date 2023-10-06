import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";

interface Props {
  isLoading: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export default function LoginBodyContent({
  errors,
  register,
  isLoading,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
}
