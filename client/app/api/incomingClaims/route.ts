// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../db/db";
import { getServerSession } from "next-auth"

interface Session {
    email: string;
    // Other session properties if any
  }

export async function GET(request:NextRequest){
    const session = await getServerSession() as Session;

    const users = await prisma.employee.count({
      where: {
        email: session.email
      }
    });
    if(users!==0)
        {

            const data = await prisma.meta.findMany({
                where : {alloted_to_id : null},
            });
            return NextResponse.json(data);
        }
    else
    {
        return NextResponse.json([]);
    }

}