import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  // console.log(request.nextUrl);
  // console.log(searchParams.get("email"));
  const data = await prisma.employee.findFirst({
    where: {
      email: searchParams.get("email") as string,
    },
  });
  if (data !== null) {
    const { name, email } = data;
    const res = { type: "F/A Employee", name, email };
    return NextResponse.json(res, { status: 200 });
  } else return NextResponse.json({ type: "Claimant" }, { status: 200 });
}
