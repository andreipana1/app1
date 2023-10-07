import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import useSearchModal from "@/hooks/useSearchModal";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export default function SearchModal() {
  const router = useRouter();
  const searchModal = useSearchModal();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);

  return (
    <div>
      <div>SearchModal</div>
    </div>
  );
}
