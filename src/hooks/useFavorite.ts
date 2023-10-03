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

  const toggleFavorite = useCallback(
    async (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;
        if (hasFavorite)
          request = () => axios.delete(`/api/favorites/${listingId}`);
        else request = () => axios.post(`/api/favorites/${listingId}`);
        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      }
    },
    [currentUser, hasFavorite, listingId, loginModal, router],
  );

  return {
    hasFavorite,
    toggleFavorite,
  };
}
