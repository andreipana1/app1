import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse as res } from "next/server";

import { getCurrentUser } from "@/utils/auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function POST(req: NextRequest) {
  const currentUser = await getCurrentUser();
  const { path } = await req.json();

  if (!currentUser)
    return res.json({ message: "Unauthorized" }, { status: 401 });

  if (!path) {
    return res.json({ message: "not found" }, { status: 404 });
  }

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
