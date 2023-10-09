import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MouseEvent, useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "@/hooks/useLoginModal";
import { SessionInterface } from "@/types";

interface IUseFavorite {
  listingId: string;
  currentUser?: SessionInterface | null;
}

export default function useFavorite({ listingId, currentUser }: IUseFavorite) {
  const router = useRouter();
  let loginModal = useLoginModal();
  const { status } = useSession();

  const hasFavorite = useMemo(() => {
    const list = currentUser?.user.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser?.user.favoriteIds, listingId]);

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
      if (status === "unauthenticated") return loginModal.onOpen();
      mutate();
    },
    [loginModal, mutate, status],
  );

  return {
    hasFavorite,
    toggleFavorite,
  };
}
