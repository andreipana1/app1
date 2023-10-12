"use client";

import "react-loading-skeleton/dist/skeleton.css";

import Skeleton from "react-loading-skeleton";

import Container from "@/components/Container";

export default function Loader() {
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {[...new Array(10)].map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton height={256} />
            <Skeleton height={28} />
            <Skeleton height={28} />
          </div>
        ))}
      </div>
    </Container>
  );
}
