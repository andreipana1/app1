"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

import Container from "@/components/Container";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import ListingReservation from "@/components/listings/ListingReservation";
import { categories } from "@/constants";
import useLoginModal from "@/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/types";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing:
    | (SafeListing & {
        user: SafeUser;
      })
    | any;
  currentUser?: SafeUser | null;
}

export default function ListingClient({
  listing,
  currentUser,
  reservations,
}: ListingClientProps) {
  const router = useRouter();
  const loginModal = useLoginModal();

  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      axios.post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      }),
    onSuccess: () => {
      toast.success("Listing reserved!");
      setDateRange(initialDateRange);
      router.push("/trips");
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const handleCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();
    mutate();
  }, [currentUser, loginModal, mutate]);

  const disableDates = useMemo(() => {
    if (!reservations || reservations.length === 0) {
      return [];
    }

    // @ts-ignore
    return reservations.reduce((allDates, reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      return [...allDates, ...range];
    }, []);
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category);
  }, [listing.category]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead {...listing} currentUser={currentUser} />

          <section className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo {...listing} category={category} />
            <aside className="order-first md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={handleCreateReservation}
                disabled={isLoading}
                // @ts-ignore
                disabledDates={disableDates}
              />
            </aside>
          </section>
        </div>
      </div>
    </Container>
  );
}
