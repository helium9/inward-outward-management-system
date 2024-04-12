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
        meta_id:true,
        remarks: true,
        action: true,
        time_stamp: true,
        employee: { select: { name: true } },
      },
      where: { meta_id: meta_id as string },
      orderBy: { time_stamp: "desc" },
    });
    // console.log(histories);
    return NextResponse.json(histories, { status: 200 });
  }
  return NextResponse.json([], { status: 200 });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  if (data !== null) {
    if (data.mode === "add") {
      const upload = await prisma.history.create({ data: data });
      const update = await prisma.meta.update({
        where: { id: data.meta_id },
        data: { status: data.action, alloted_to_id: data.employee_id },
      });
    } else if (data.mode === "delete") {
      const { time_stamp, meta_id } = data;
      const res = await prisma.history.deleteMany({
        where: {
          time_stamp: { gte: new Date(time_stamp) },
          meta_id: meta_id,
        },
      });
      //write code to update the meta data to latest history after deletion.
    }
    return NextResponse.json("success", { status: 200 });
  }
  return NextResponse.json("no data", { status: 400 });
}
