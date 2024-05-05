// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../db/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  // console.log(searchParams);
  // console.log("hi");
  const meta_id = searchParams.get("meta_id");
  const activePage = searchParams.get("activePage");
  console.log("active :", activePage);
  if (meta_id !== null) {
    const histories = await prisma.history.findMany({
      skip: ((activePage as any) - 1) * 3,
      take: 3,
      select: {
        meta_id: true,
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
  // console.log(data);
  if (data !== null) {
    if (data.mode === "add") {
      console.log("data: ", data);
      let { meta_id, employee_id, remarks, action } = data;
      if (employee_id === "") {
        const id = await prisma.employee.findFirst({
          where: { isAdmin: true },
          select: { id: true },
        });
        employee_id = id?.id;
      }
      const upload = await prisma.history.create({
        data: {
          meta_id: meta_id,
          employee_id: employee_id,
          action: action,
          remarks: remarks,
        },
      });
      const update = await prisma.meta.update({
        where: { id: meta_id },
        data: { status: action, alloted_to_id: employee_id },
      });
    } else if (data.mode === "delete") {
      const { time_stamp, meta_id } = data;
      const res = await prisma.history.deleteMany({
        where: {
          time_stamp: { gte: new Date(time_stamp) },
          meta_id: meta_id,
        },
      });
      // await new Promise(r => setTimeout(r, 2000));
      // console.log("delete ;>{");

      //write code to update the meta data to latest history after deletion. (only status and alloted?)
      const latestHistory = await prisma.history.findFirst({
        where: {
          time_stamp: { lte: new Date(time_stamp) },
          meta_id: meta_id,
        },
        orderBy: {
          time_stamp: "desc",
        },
      });
      console.log(latestHistory);
      const update = await prisma.meta.update({
        where: { id: meta_id },
        data: {
          status: latestHistory?.action,
          alloted_to_id: latestHistory?.employee_id,
        },
      });
    }
    return NextResponse.json("success", { status: 200 });
  }
  return NextResponse.json("no data", { status: 400 });
}
