import { NextResponse as res } from "next/server";
import * as z from "zod";

import { getCurrentUser } from "@/utils/auth";
import prisma from "@/utils/connect";

interface IParams {
  params: Promise<{
    listingId: string;
  }>;
}

const deleteSchema = z.object({
  listingId: z.string().min(1),
});

export async function DELETE(req: Request, { params }: IParams) {
  const resolvedParams = await params;
  const { listingId } = deleteSchema.parse(resolvedParams);

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      return res.json({ message: "Unauthorized" }, { status: 401 });

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
