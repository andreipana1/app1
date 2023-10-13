"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import LoginBodyContent from "@/components/modals/LoginModal/login-body-content";
import LoginFooter from "@/components/modals/LoginModal/login-footer";
import Modal from "@/components/modals/modal";
import useLoginModal from "@/hooks/useLoginModal";

export default function LoginModal() {
  const router = useRouter();
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SubmitHandler<FieldValues>) => {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (response?.error) {
        toast.error("Error trying to login");
        return;
      }

      toast.success("Logged in");
      router.refresh();
      loginModal.onClose();
    },
  });

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      // @ts-ignore
      onSubmit={handleSubmit(mutate)}
      body={
        <LoginBodyContent
          errors={errors}
          register={register}
          isLoading={isLoading}
        />
      }
      footer={<LoginFooter />}
    />
  );
}
