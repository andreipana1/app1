import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse as res } from "next/server";
import prisma from "@/utils/connect";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return res.error();
  }

  const body = await req.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return res.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return res.json(listingAndReservation, { status: 200 });
}
