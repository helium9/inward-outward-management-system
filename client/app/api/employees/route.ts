import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  // console.log(searchParams);
  const employees = await prisma.employee.findMany({
    select: {
      name: true,
      id: true,
    },
  });
  // console.log(histories);
  return NextResponse.json(employees, { status: 200 });
}
