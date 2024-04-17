// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../db/db";
import { getServerSession } from "next-auth";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const session = await getServerSession();
  // console.log(session?.user?.email);
  //   console.log(searchParams);
  const activePage = searchParams.get("activePage");
  // if (searchParams.get("condensed") === "true") {
  //   const data = await prisma.history.findMany({
  //     select: {
  //       time_stamp: true,
  //       remarks: true,
  //       action: true,
  //       employee: { select: { name: true } },
  //       meta_data: { select: { dept_name: true, claimant_name: true } },
  //     },
  //   });
  //   if (!data || data.length === 0) {
  //     return NextResponse.json(
  //       { error: "Histories not found" },
  //       { status: 404 }
  //     );
  //   }
  //   return NextResponse.json(data, { status: 200 });
  // } else {
  const _count = await prisma.employee.count({ where: {email:session?.user.email} });
  // console.log(_count);
  const histories = await prisma.history.findMany({
    skip: ((activePage as any) - 1) * 3,
    take: 3,
    distinct: ["meta_id"],
    include: {
      meta_data: true,
      employee: true,
    },
    orderBy: {
      time_stamp: "desc",
    },
    where: _count === 0 ? { meta_data: { origin: session?.user.email } } : {},
    // take: 1,
  });

  if (!histories || histories.length === 0) {
    return NextResponse.json({ error: "Histories not found" }, { status: 404 });
  }

  return NextResponse.json(histories, { status: 200 });
  // }
  // return NextResponse.json([], { status: 200 });
}
