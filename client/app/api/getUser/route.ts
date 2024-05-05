// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../db/db";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession();
  const present = await prisma.employee.count({
    where: { email: session.user.email, active: true },
  });

  if (present != 0) {
    const { isAdmin } = await prisma.employee.findFirst({
      select: { isAdmin: true },
      where: { email: session.user.email, active: true },
    });
    const searchParams = request.nextUrl.searchParams;
    // console.log("user", searchParams);
    const mode = searchParams.get("mode");
    // console.log(request.nextUrl);
    // console.log(searchParams.get("email"));
    if (mode !== "all") {
      const data = await prisma.employee.findFirst({
        where: {
          email: searchParams.get("email") as string,
          active: true,
        },
      });
      // console.log("emp", data);
      if (data !== null) {
        const { name, email, isAdmin } = data;
        const res = { type: isAdmin ? "Admin" : "F/A Employee", name, email };
        return NextResponse.json(res, { status: 200 });
      } else return NextResponse.json({ type: "Claimant" }, { status: 200 });
    } else if (isAdmin === true) {
      const email = searchParams.get("email");
      const data = await prisma.employee.findMany({
        where: { email: { not: email as string }, active: true },
      });
      // console.log(data);
      return NextResponse.json(data, { status: 200 });
    }
  }
  return NextResponse.json([]);
}
