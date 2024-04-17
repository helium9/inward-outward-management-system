// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../db/db";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const activePage = searchParams.get("activePage");
  const session = await getServerSession();
  const _count = await prisma.employee.count({
    where: { email: session?.user.email },
  });
  //   console.log(searchParams);
  if (searchParams.get("condensed") === "true") {
    const data = await prisma.history.findMany({
      select: {
        meta_id:true,
        time_stamp: true,
        remarks: true,
        action: true,
        employee: { select: { name: true } },
        meta_data: { select: { dept_name: true, claimant_name: true } },
      },
      orderBy: { time_stamp: 'desc' },
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
      skip : ((activePage as any) -1)*3,
      take : 3,
      include: {
        meta_data: true,
        employee: true,
      },
      orderBy: { time_stamp: 'desc' },
      where:{meta_data: _count === 0 ? { origin: session?.user.email } : {}}
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
