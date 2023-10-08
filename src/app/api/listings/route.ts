import { NextResponse as res } from "next/server";

import { getCurrentUser } from "@/utils/auth";
import prisma from "@/utils/connect";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  const body = await req.json();

  if (!currentUser) return res.error();

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
}
