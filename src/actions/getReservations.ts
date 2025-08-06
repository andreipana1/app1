import prisma from "@/utils/connect";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { userId, authorId, listingId } = params;
    
    // Get all reservations first
    const allReservations = await prisma.reservation.findMany();
    
    // Filter reservations based on parameters
    let filteredReservations = allReservations.filter((reservation) => {
      // Filter by userId
      if (userId && reservation.userId !== userId) return false;
      
      // Filter by listingId
      if (listingId && reservation.listingId !== listingId) return false;
      
      return true;
    });

    // If filtering by authorId, we need to check listing ownership
    if (authorId) {
      const allListings = await prisma.listing.findMany();
      const authorListingIds = allListings
        .filter(listing => listing.userId === authorId)
        .map(listing => listing.id);
      
      filteredReservations = filteredReservations.filter(reservation =>
        authorListingIds.includes(reservation.listingId)
      );
    }

    // Sort by creation date (newest first)
    filteredReservations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Fetch listing data for each reservation
    const reservationsWithListings = await Promise.all(
      filteredReservations.map(async (reservation) => {
        const listing = await prisma.listing.findUnique({
          where: { id: reservation.listingId },
        });

        return {
          ...reservation,
          createdAt: reservation.createdAt.toISOString(),
          startDate: reservation.startDate.toISOString(),
          endDate: reservation.endDate.toISOString(),
          listing: listing ? {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
          } : null,
        };
      })
    );

    return reservationsWithListings.filter(r => r.listing !== null);
  } catch (error) {
    console.error("Error in getReservations:", error);
    return [];
  }
}
