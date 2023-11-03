import { NextRequest, NextResponse as res } from "next/server";
import * as z from "zod";

import { getCurrentUser } from "@/utils/auth";
import prisma from "@/utils/connect";

const postSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  category: z.string(),
  imageSrc: z.string(),
  roomCount: z.number(),
  bathroomCount: z.number(),
  guestCount: z.number(),
  price: z.string(),
  location: z.object({
    value: z.string(),
  }),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { location, price, ...rest } = postSchema.parse(body);

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      return res.json({ message: "Unauthorized" }, { status: 401 });

    const listing = await prisma.listing.create({
      data: {
        ...rest,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.user.id,
      },
    });

    return res.json(listing, { status: 200 });
  } catch (error) {
    return res.json({ message: "Error Creating new Rent!" }, { status: 500 });
  }
}
