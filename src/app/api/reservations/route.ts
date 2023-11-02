import { NextRequest, NextResponse as res } from "next/server";
import * as z from "zod";

import { getCurrentUser } from "@/utils/auth";
import prisma from "@/utils/connect";

const postSchema = z.object({
  listingId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  totalPrice: z.number(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { listingId, startDate, endDate, totalPrice } = postSchema.parse(body);

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      return res.json({ message: "Unauthorized" }, { status: 401 });

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
    return res.json({ message: "Error Reservation!" }, { status: 500 });
  }
}
