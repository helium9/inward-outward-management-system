import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const res = await prisma.meta.findMany();
//   console.log(res);
  return NextResponse.json(res, { status: 200 });
}
