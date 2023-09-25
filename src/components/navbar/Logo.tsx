"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Logo() {
  const router = useRouter();

  return (
    <Image
      src="/images/logo.png"
      alt="Logo"
      className="hidden md:block cursor-pointer"
      width={100}
      height={100}
      onClick={() => router.push("/")}
    />
  );
}
