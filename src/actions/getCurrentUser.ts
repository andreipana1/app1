import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

import prisma from "@/utils/connect";
import { SessionInterface } from "@/types";

export async function getSession() {
  return (await getServerSession(authOptions)) as SessionInterface;
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session.user.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) return null;

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    return null;
  }
}
