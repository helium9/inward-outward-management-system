import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
//   console.log(searchParams);
  if (searchParams.get("condensed") === "true") {
    const data = await prisma.history.findMany({
      select: {
        time_stamp: true,
        remarks: true,
        action: true,
        employee: { select: { name: true } },
        meta_data: { select: { dept_name: true, claimant_name: true } },
      },
    });
    return NextResponse.json(data, { status: 200 });
  }
  return NextResponse.json([], { status: 200 });
}
