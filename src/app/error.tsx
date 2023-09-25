"use client";

import React, { useEffect } from "react";
import EmptyState from "@/components/EmptyState";

type ErrorStateProps = {
  error: Error;
};

export default function ErrorState({ error }: ErrorStateProps) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
}
