import { NextResponse as res } from "next/dist/server/web/spec-extension/response";
import * as z from "zod";

import { getCurrentUser } from "@/utils/auth";
import prisma from "@/utils/connect";

interface IParams {
  params: Promise<{
    reservationId: string;
  }>;
}

const deleteSchema = z.object({
  reservationId: z.string().min(1),
});

export async function DELETE(req: Request, { params }: IParams) {
  const resolvedParams = await params;
  const { reservationId } = deleteSchema.parse(resolvedParams);

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      return res.json({ message: "Unauthorized" }, { status: 401 });

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
  } catch (error) {
    return res.error();
  }
}
