import prisma from "@/utils/connect";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { userId, authorId, listingId } = params;
    let query = {};

    query = {
      ...query,
      ...(userId ? { userId } : {}),
      ...(listingId ? { listingId } : {}),
      ...(authorId ? { listing: { userId: authorId } } : {}),
    };

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));
  } catch (error) {
    throw new Error("error get reservation");
  }
}
