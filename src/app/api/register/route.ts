import bcrypt from "bcrypt";
import { NextResponse as res } from "next/server";
import * as z from "zod";

import prisma from "@/utils/connect";

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(4),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name, password } = userSchema.parse(body);

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
