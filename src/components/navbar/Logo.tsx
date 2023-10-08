"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();

  return (
    <Image
      src="/images/logo.png"
      alt="Logo"
      width={100}
      height={100}
      onClick={() => router.push("/")}
      className="hidden md:block cursor-pointer h-auto w-auto"
    />
  );
}
