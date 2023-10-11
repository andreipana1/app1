import { NextResponse as res } from "next/server";

import { getCurrentUser } from "@/utils/auth";
import prisma from "@/utils/connect";

interface IParams {
  params: {
    listingId?: string;
  };
}

export async function DELETE(req: Request, { params }: IParams) {
  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return res.error();

    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.user.id,
      },
    });

    return res.json(listing, { status: 200 });
  } catch (error) {
    return res.json({ message: error }, { status: 500 });
  }
}
