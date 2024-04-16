// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../db/db";
import { getServerSession } from "next-auth"
import { Employee } from ".prisma/client";


interface Session {
  email: string;
  // Other session properties if any
}



export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const session = await getServerSession() as Session;
  console.log(session);

  const users = await prisma.employee.count({
    where: {
      email: session.email
    }
  });

  if (users!==0)
    {

      if (searchParams.get("condensed") === "true") {
        const data = await prisma.history.findMany({
          select: {
            meta_id:true,
            time_stamp: true,
            remarks: true,
            action: true,
            employee: { select: { name: true } },
            meta_data: { select: { dept_name: true, claimant_name: true } },
          },
          orderBy: { time_stamp: 'desc' },
        });
        if (!data || data.length === 0) {
          return NextResponse.json(
            { error: "Histories not found" },
            { status: 404 }
          );
        }
        return NextResponse.json(data, { status: 200 });
      } else {
        const histories = await prisma.history.findMany({
          include: {
            meta_data: true,
            employee: true,
          },
          orderBy: { time_stamp: 'desc' },
        });
    
        if (!histories || histories.length === 0) {
          return NextResponse.json(
            { error: "Histories not found" },
            { status: 404 }
          );
        }
    
        return NextResponse.json(histories);
      }
    }
    else
    {
      if (searchParams.get("condensed") === "true") {
      const data = prisma.meta.findMany({
        where:{
          origin:session.email
        },
        select:{
          history:{
            select:{
              meta_id:true,
            time_stamp: true,
            remarks: true,
            action: true,
            employee: { select: { name: true } },
            meta_data: { select: { dept_name: true, claimant_name: true } },
            },
            orderBy: { time_stamp: 'desc' },
          }
        }
      })
      if (!data || data.length === 0) {
        return NextResponse.json(
          { error: "Histories not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(data, { status: 200 });
    }
    else {
      const histories = prisma.meta.findMany({
        where:{
          origin:session.email
        },
        select:{
          history:{
            include: {
              meta_data: true,
              employee: true,
            },
            orderBy: { time_stamp: 'desc' },
          }
        }
      })  
      if (!histories || histories.length === 0) {
        return NextResponse.json(
          { error: "Histories not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(histories);
    }
    

    }

  // return NextResponse.json([], { status: 200 });
}
