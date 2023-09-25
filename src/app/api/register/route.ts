import { NextResponse as res } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/utils/connect";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return res.json(user, { status: 200 });
}
