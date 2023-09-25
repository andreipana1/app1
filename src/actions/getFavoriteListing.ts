import prisma from "@/utils/connect";
import getCurrentUser from "@/actions/getCurrentUser";

export async function getFavoriteListing() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    return favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
    }));
  } catch (error) {
    throw new Error("Error get Favorite Listing");
  }
}
