import prisma from "@/utils/connect";

type IParams = {
  listingId?: string;
};

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;
    
    if (!listingId) return null;
    
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });

    if (!listing) return null;

    // Fetch user data separately since our mock doesn't support include
    const user = await prisma.user.findUnique({
      where: {
        id: listing.userId,
      },
    });

    if (!user) return null;

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        emailVerified: user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error) {
    console.error("Error in getListingById:", error);
    return null;
  }
}
