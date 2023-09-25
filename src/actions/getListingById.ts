import prisma from "@/utils/connect";

type IParams = {
  listingId?: string;
};

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) return null;

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updateAt: listing.user.createdAt.toString(),
        emailVerified: listing.user.emailVerified?.toString() || null,
      },
    };
  } catch (error) {
    throw new Error("Error get listing by ID");
  }
}
