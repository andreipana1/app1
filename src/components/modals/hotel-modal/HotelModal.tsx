"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import BodyContent from "@/components/modals/hotel-modal/body-content";
import StepDescription from "@/components/modals/hotel-modal/step-description";
import StepImages from "@/components/modals/hotel-modal/step-images";
import StepInfo from "@/components/modals/hotel-modal/step-info";
import StepLocation from "@/components/modals/hotel-modal/step-location";
import StepPrice from "@/components/modals/hotel-modal/step-price";
import Modal from "@/components/modals/modal";
import { useModalStore } from "@/store";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const uploadImage = async (imagePath: string) => {
  try {
    const { data } = await axios.post(`/api/upload`, { path: imagePath });
    return data;
  } catch (error) {
    throw error;
  }
};

export default function HotelModal() {
  const router = useRouter();
  const { closeRent: closeHotel, isRentOpen: isHotelOpen } = useModalStore();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const location = watch("location");
  const category = watch("category");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const setCustomValue = useCallback(
    (id: any, value: any) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue],
  );

  const onNext = () => setStep((prevState) => prevState + 1);
  const onBack = () => setStep((prevState) => prevState - 1);

  const { mutate, isPending: loading } = useMutation({
    mutationFn: async (newHotel: FieldValues) => {
      try {
        const imageUrl = await uploadImage(imageSrc);

        if (imageUrl.url) {
          const { data } = await axios.post("/api/hotels", {
            ...newHotel,
            imageSrc: imageUrl.url,
          });

          return data;
        }
      } catch (error) {
        throw new Error("Error");
      }
    },
    onSuccess: () => {
      toast.success("Hotel listing created!");
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY);
      closeHotel();
    },
    onError: () => {
      toast.error("Error creating Hotel listing");
    },
  });

  const handleNewItem = useCallback(
    (data: FieldValues) => {
      if (step !== STEPS.PRICE) return onNext();
      mutate(data);
    },
    [mutate, step],
  );

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create Hotel Listing";
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;
    return "Back";
  }, [step]);

  const ChangeSection = useMemo(() => {
    switch (step) {
      case STEPS.LOCATION:
        return (
          <StepLocation location={location} setCustomValue={setCustomValue} />
        );
      case STEPS.INFO:
        return (
          <StepInfo
            guestCount={guestCount}
            roomCount={roomCount}
            bathroomCount={bathroomCount}
            setCustomValue={setCustomValue}
          />
        );
      case STEPS.IMAGES:
        return (
          <StepImages imageSrc={imageSrc} setCustomValue={setCustomValue} />
        );
      case STEPS.DESCRIPTION:
        return (
          <StepDescription
            loading={loading}
            register={register}
            errors={errors}
          />
        );
      case STEPS.PRICE:
        return (
          <StepPrice errors={errors} register={register} loading={loading} />
        );
      default:
        return (
          <BodyContent category={category} setCustomValue={setCustomValue} />
        );
    }
  }, [
    bathroomCount,
    category,
    errors,
    guestCount,
    imageSrc,
    loading,
    location,
    register,
    roomCount,
    setCustomValue,
    step,
  ]);

  return (
    <Modal
      disabled={loading}
      isOpen={isHotelOpen}
      title="List your rural hotel on RuralHop!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(handleNewItem)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={closeHotel}
      body={ChangeSection}
    />
  );
}
