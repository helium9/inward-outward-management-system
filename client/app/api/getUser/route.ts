// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../db/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get("mode");
  // console.log(request.nextUrl);
  // console.log(searchParams.get("email"));
  if(mode!=="all"){  
    const data = await prisma.employee.findFirst({
      where: {
        email: searchParams.get("email") as string,
      },
    });
    if (data !== null) {
      const { name, email, isAdmin } = data;
      const res = { type: (isAdmin)?"Admin":"F/A Employee", name, email };
      return NextResponse.json(res, { status: 200 });
    } else return NextResponse.json({ type: "Claimant" }, { status: 200 });
  }
  else{
    const email = searchParams.get("email");
    const data = await prisma.employee.findMany({where: {email:{not:email as string}}});
    // console.log(data);
    return NextResponse.json(data, { status: 200 });
  }
}
