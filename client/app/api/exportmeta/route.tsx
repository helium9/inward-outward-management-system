// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../db/db";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  const data = await prisma.meta.findMany({select:{
    employee:{
        select:{name:true}
    }
  }});
  console.log(data);
  return NextResponse.json(data);
}
