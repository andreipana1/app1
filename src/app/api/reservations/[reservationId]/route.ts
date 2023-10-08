import { NextResponse as res } from "next/dist/server/web/spec-extension/response";

import { getCurrentUser } from "@/utils/auth";
import prisma from "@/utils/connect";

interface IParams {
  params: {
    reservationId?: string;
  };
}

export async function DELETE(req: Request, { params }: IParams) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return res.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.user.id },
        { listing: { userId: currentUser.user.id } },
      ],
    },
  });

  return res.json(reservation, { status: 200 });
}
