import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import Heading from "@/components/heading";
import Input from "@/components/inputs/input";

interface LoginBodyContentProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  isPending?: boolean;
}

export default function LoginBodyContent({
  register,
  errors,
  isPending,
}: LoginBodyContentProps) {
  return (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back to RuralHOP" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isPending}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isPending}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
}
