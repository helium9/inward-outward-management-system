import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  // console.log(searchParams);
  const meta_id = searchParams.get("meta_id");
  if (meta_id !== null) {
    const histories = await prisma.history.findMany({
      select: {
        remarks: true,
        action: true,
        time_stamp: true,
        employee: { select: { name: true } },
      },
      where: { meta_id: meta_id as string },
    });
    // console.log(histories);
    return NextResponse.json(histories, { status: 200 });
  }
  return NextResponse.json([], { status: 200 });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  // console.log(data);
  if (data !== null) {
    const upload = await prisma.history.create({ data: data });
    const update = await prisma.meta.update({
      where: { id: data.meta_id },
      data: { status: data.action, alloted_to_id: data.employee_id },
    });
    return NextResponse.json("success", { status: 200 });
  }
  return NextResponse.json("no data", { status: 400 });
}
