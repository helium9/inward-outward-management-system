import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request:NextRequest){
    const data = await prisma.meta.findMany({
        where : {alloted_to_id : null},
    });

    return NextResponse.json(data);
}