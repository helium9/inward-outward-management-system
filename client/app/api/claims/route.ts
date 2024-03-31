import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  console.log(searchParams);
  if (searchParams.get("condensed") === "true") {
    if (searchParams.get("status") === "new") {
      const data = await prisma.meta.findMany({
        where: { status: "new" },
        orderBy: { issue_date: "desc" },
        select: { claimant_name: true, dept_name: true },
      });
      return NextResponse.json(data, { status: 200 });
    } else if (searchParams.get("status") === "current") {
      const data = await prisma.meta.findMany({
        where:{
          NOT:[
            {status:'new'},
            {status:'outward'}
          ]
        },
        select: {
          status:true,
          claimant_name: true,
          dept_name: true,
          history:{
            select:{
              employee:{
                select:{
                  name:true
                }
              },
              remarks:true,
              time_stamp:true
            },
            orderBy:{
              time_stamp: 'desc'
            },
            take:1
          }
        }
      });
      console.log(data);
      return NextResponse.json(data, { status: 200 });
    }
  }
  return NextResponse.json([], { status: 200 });
}
