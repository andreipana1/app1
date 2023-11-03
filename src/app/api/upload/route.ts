import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse as res } from "next/server";
import * as z from "zod";

import { getCurrentUser } from "@/utils/auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const postSchema = z.object({
  path: z.string(),
});

export async function POST(req: NextRequest) {
  const currentUser = await getCurrentUser();
  const body = await req.json();
  const { path } = postSchema.parse(body);

  if (!currentUser)
    return res.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: [
        { width: 1000, crop: "scale", quality: 35, fetch_format: "auto" },
      ],
    };

    const result = await cloudinary.uploader.upload(path, options);
    return res.json(result, { status: 201 });
  } catch (error) {
    return res.error();
  }
}
