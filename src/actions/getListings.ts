import prisma from "@/utils/connect";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    // Get all listings first
    const allListings = await prisma.listing.findMany();
    
    // Filter listings based on parameters
    let filteredListings = allListings.filter((listing) => {
      // Filter by userId
      if (userId && listing.userId !== userId) return false;
      
      // Filter by category
      if (category && listing.category !== category) return false;
      
      // Filter by location
      if (locationValue && listing.locationValue !== locationValue) return false;
      
      // Filter by room count (greater than or equal)
      if (roomCount && listing.roomCount < roomCount) return false;
      
      // Filter by guest count (greater than or equal)
      if (guestCount && listing.guestCount < guestCount) return false;
      
      // Filter by bathroom count (greater than or equal)
      if (bathroomCount && listing.bathroomCount < bathroomCount) return false;
      
      return true;
    });

    // Note: Date filtering for reservations is simplified for now
    // In a real implementation, you'd check against existing reservations
    
    // Sort by creation date (newest first)
    filteredListings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return filteredListings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
  } catch (error: any) {
    console.error("Error in getListings:", error);
    return []; // Return empty array instead of throwing
  }
}
