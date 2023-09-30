import { NextResponse as res } from "next/server";

import prisma from "@/utils/connect";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  params: {
    listingId?: string;
  };
}

export async function DELETE(req: Request, { params }: IParams) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return res.error();

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return res.json(listing, { status: 200 });
}
