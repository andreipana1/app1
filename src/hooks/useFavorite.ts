import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "@/hooks/useLoginModal";
import { SafeUser } from "@/types";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

export default function useFavorite({ currentUser, listingId }: IUseFavorite) {
  const router = useRouter();
  let loginModal = useLoginModal();

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [listingId, currentUser]);

  const { mutate } = useMutation(
    () => {
      if (hasFavorite) {
        return axios.delete(`/api/favorites/${listingId}`);
      } else {
        return axios.post(`/api/favorites/${listingId}`);
      }
    },
    {
      onSuccess: () => {
        router.refresh();
        toast.success("Success");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Something went wrong.");
      },
    },
  );

  const toggleFavorite = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (!currentUser) return loginModal.onOpen();
      mutate();
    },
    [currentUser, loginModal, mutate],
  );

  return {
    hasFavorite,
    toggleFavorite,
  };
}
