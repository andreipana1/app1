import { NextRequest, NextResponse as res } from "next/server";
import * as z from "zod";

import { getCurrentUser } from "@/utils/auth";
import prisma from "@/utils/connect";

const postSchema = z.object({
  listingId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  totalPrice: z.number(),
  // Pet-related fields for RuralHOP
  hasPets: z.boolean().optional().default(false),
  petCount: z.number().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { listingId, startDate, endDate, totalPrice, hasPets, petCount } = postSchema.parse(body);

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.user?.id)
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
            // Pet-related fields
            hasPets: hasPets ?? false,
            petCount,
          },
        },
      },
    });

    return res.json(listingAndReservation, { status: 200 });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return res.json({ message: "Error Reservation!" }, { status: 500 });
  }
}
