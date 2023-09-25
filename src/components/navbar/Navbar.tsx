import React from "react";
import { SafeUser } from "@/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

function Navbar({ currentUser }: NavbarProps) {
  return <div>Navbar</div>;
}

export default Navbar;
