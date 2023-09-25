import { NextResponse as res } from "next/server";

import prisma from "@/utils/connect";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  params: {
    listingId?: string;
  };
}
