import bcryptjs from "bcryptjs";
import { NextResponse as res } from "next/server";
import * as z from "zod";

import prisma from "@/utils/connect";

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(4).max(12),
  password: z.string().min(4).max(12),
});

export async function POST(req: Request) {
  const body = await req.json();
  const response = userSchema.safeParse(body);

  if (!response.success) {
    const { errors } = response.error;
    return res.json({ message: "Invalid request", errors }, { status: 400 });
  }

  try {
    const { email, name, password } = response.data;
    const hashedPassword = await bcryptjs.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return res.json(user, { status: 200 });
  } catch (error) {
    return res.json({ message: "Server Error!", error }, { status: 500 });
  }
}
