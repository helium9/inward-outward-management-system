// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../db/db";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  const { mode, name, email } = data;
  if (mode === "add") {
    const res = await prisma.employee.create({
      data: { name: name, email: email, isAdmin: false },
    });
    console.log(res);
  } else {
    const _count = await prisma.employee.count({ where: { email: email } });
    console.log(_count);
    if (_count != 0) {
    //   const rem = await prisma.employee.deleteMany({ where: { email: email } });
    //   console.log(rem);
    }
  }
  return NextResponse.json([], { status: 200 });
}
