"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Modal from "@/components/modals/modal";
import RegisterBody from "@/components/modals/register-modal/RegisterBody";
import RegisterFooter from "@/components/modals/register-modal/RegisterFooter";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

export default function RegisterModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => axios.post("/api/register", data),
    onSuccess: () => {
      toast.success("Registered!");
      registerModal.onClose();
      loginModal.onOpen();
    },
    onError: () => {
      toast.error("Error Register");
    },
  });

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      // @ts-ignore
      onSubmit={handleSubmit(mutate)}
      actionLabel="Continue"
      title="Register"
      body={
        <RegisterBody
          register={register}
          errors={errors}
          isLoading={isLoading}
        />
      }
      footer={<RegisterFooter />}
    />
  );
}
