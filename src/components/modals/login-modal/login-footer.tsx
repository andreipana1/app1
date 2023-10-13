"use client";

import { signIn } from "next-auth/react";
import { useCallback } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import Button from "@/components/button";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

export default function LoginFooter() {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  return (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <div
        className="
      text-neutral-500 text-center mt-4 font-light"
      >
        <p>
          First time using Airbnb?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer
              hover:underline
            "
          >
            {" "}
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}
