import bcrypt from "bcrypt";
import { NextResponse as res } from "next/server";

import prisma from "@/utils/connect";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name, password } = body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return res.json(user, { status: 200 });
  } catch (error) {
    return res.error();
  }
}
