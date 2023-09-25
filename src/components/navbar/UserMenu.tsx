"use client";

import { useState } from "react";
import { SafeUser } from "@/types";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

export default function UserMenu({ currentUser }: UserMenuProps) {
  const [item, setItem] = useState(null);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="">Airbnb your home</div>
      </div>
    </div>
  );
}
