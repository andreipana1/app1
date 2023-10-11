"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import { SafeReservation, SessionInterface } from "@/types";

interface Props {
  reservations: SafeReservation[];
  currentUser?: SessionInterface | null;
}

export default function TripContainer({ reservations, currentUser }: Props) {
  const [deletingId, setDeletingId] = useState("");

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: (id: string) => {
      setDeletingId(id);
      return axios.delete(`/api/reservations/${id}`);
    },
    onSuccess: () => {
      toast.success("Reservation cancelled");
      router.refresh();
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            // @ts-ignore
            onAction={mutate}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
