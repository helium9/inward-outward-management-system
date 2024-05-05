// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../db/db";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  try {
    const { mode } = data;
    if (mode === "add") {
      const { name, email } = data;
      const _count = await prisma.employee.count({ where: { email: email } });
      if (_count > 0) {
        const res = await prisma.employee.updateMany({
          where: { email: email },
          data: { name: name, active: true },
        });
        console.log(res);
      } else {
        const res = await prisma.employee.create({
          data: { name: name, email: email, isAdmin: false, active: true },
        });
        console.log(res);
      }
    } else {
      const { emp_id } = data;
      const _count = await prisma.employee.count({ where: { id: emp_id } });
      console.log(_count);
      if (_count != 0) {
        const rem = await prisma.employee.update({
          where: { id: emp_id },
          data: { active: false },
        });
        console.log(rem);
      }
    }
    return NextResponse.json({ status: 200 });
  } catch {
    return NextResponse.json({ status: 400 });
  }
}
