import { NextResponse as res } from "next/server";

import { getCurrentUser } from "@/utils/auth";
import prisma from "@/utils/connect";

export async function POST(req: Request) {
  const body = await req.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return res.error();

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
            userId: currentUser.user.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });

    return res.json(listingAndReservation, { status: 200 });
  } catch (error) {
    return res.error();
  }
}
