import { NextResponse as res } from "next/server";

import { getCurrentUser } from "@/utils/auth";
import prisma from "@/utils/connect";

interface IParams {
  params: {
    listingId?: string;
  };
}

export async function POST(req: Request, { params }: IParams) {
  const { listingId } = params;

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return res.error();

    if (!listingId) {
      return res.json({ message: "Not found" }, { status: 404 });
    }

    let favoriteIds = [...(currentUser.user.favoriteIds || [])];

    favoriteIds.push(listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.user.id,
      },
      data: {
        favoriteIds,
      },
    });

    return res.json(user, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.error();
  }
}

export async function DELETE(req: Request, { params }: IParams) {
  const { listingId } = params;

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return res.error();

    if (!listingId) {
      return res.json({ message: "Not found" }, { status: 404 });
    }

    let favoriteIds = [...(currentUser.user.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.user.id,
      },
      data: {
        favoriteIds,
      },
    });

    return res.json(user, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.error();
  }
}
