import { NextResponse as res } from "next/server";

import { getCurrentUser } from "@/utils/auth";
import prisma from "@/utils/connect";

export async function POST(req: Request) {
  const body = await req.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return res.error();

    Object.keys(body).forEach((value) => {
      if (!body[value]) res.error();
    });

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.user.id,
      },
    });

    return res.json(listing, { status: 200 });
  } catch (error) {
    return res.error();
  }
}
