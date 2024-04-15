// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../db/db";

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
    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Histories not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(data, { status: 200 });
  } else {
    const histories = await prisma.history.findMany({
      distinct: ["meta_id"],
      include: {
        meta_data: true,
        employee: true,
      },
      orderBy: {
        time_stamp: "desc",
      },
      // take: 1,
    });

    if (!histories || histories.length === 0) {
      return NextResponse.json(
        { error: "Histories not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(histories);
  }
  // return NextResponse.json([], { status: 200 });
}
