// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../db/db";
import { getServerSession } from "next-auth";

export async function GET(request:NextRequest){
    const session = await getServerSession();
    const _count = await prisma.employee.count({where:{email:session?.user.email}});
    const searchParams = request.nextUrl.searchParams;
    const activePage = searchParams.get("activePage");
    const data = await prisma.meta.findMany({
        skip : ((activePage as any) -1)*3,
        take : 3,
        where : _count!==0?{status : 'new'}:{status : 'new', origin:session?.user.email},
    });
    return NextResponse.json(data);
}