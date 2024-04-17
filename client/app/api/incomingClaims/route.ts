// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../db/db";
import { getServerSession } from "next-auth";

export async function GET(request:NextRequest){
    const session = await getServerSession();
    const user = await prisma.employee.count({where:{email:session?.user.email}});
    if(user!=0){
        const searchParams = request.nextUrl.searchParams;
        const activePage = searchParams.get("activePage");
        const data = await prisma.meta.findMany({
            skip : ((activePage as any) -1)*3,
            take : 3,
            where : {alloted_to_id : null},
        });
        return NextResponse.json(data);
    }
    return NextResponse.json([]);
}