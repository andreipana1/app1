"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Modal from "@/components/modals/Modal";
import BodyContent from "@/components/modals/RentModal/BodyContent";
import StepDescription from "@/components/modals/RentModal/StepDescription";
import StepImages from "@/components/modals/RentModal/StepImages";
import StepInfo from "@/components/modals/RentModal/StepInfo";
import StepLocation from "@/components/modals/RentModal/StepLocation";
import StepPrice from "@/components/modals/RentModal/StepPrice";
import useRentModal from "@/hooks/useRentModal";

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
    const { data } = await axios.post(`/upload`, { path: imagePath });
    return data;
  } catch (error) {
    throw error;
  }
};

export default function RentModal() {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const rentModal = useRentModal();
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

  const { mutate } = useMutation({
    mutationFn: async (newProduct: FieldValues) => {
      if (step !== STEPS.PRICE) return onNext();

      const imageUrl = await uploadImage(imageSrc);

      if (imageUrl.url) {
        const { data } = await axios.post("/api/listings", {
          ...newProduct,
          img: imageUrl.url,
        });

        return data;
      }
    },
    onSuccess: () => {
      toast.success("Listing created!");
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY);
      rentModal.onClose();
    },
    onError: () => {
      toast.error("Error creating Product");
    },
  });

  /**
  function onSubmit(data: FieldValues) {
    if (step !== STEPS.PRICE) return onNext();
    setLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setLoading(false);
      });
  }
      **/

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create";
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

  // @ts-ignore
  return (
    <Modal
      disabled={loading}
      isOpen={rentModal.isOpen}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      // @ts-ignore
      onSubmit={handleSubmit(mutate)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={ChangeSection}
    />
  );
}
