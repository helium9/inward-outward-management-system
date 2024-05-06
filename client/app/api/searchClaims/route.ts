import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../db/db";

export async function GET(request: NextRequest){
  const searchTerm = request.nextUrl.searchParams.get("searchTerm");
  try {
    const filteredClaims = await prisma.meta.findMany({
      where: {
        OR: [
          { indName: { contains: searchTerm as string, mode: 'insensitive' } },
          { deptName: { contains: searchTerm as string, mode: 'insensitive' } },
          { partyName: { contains: searchTerm as string, mode: 'insensitive' } },
          { claimantName: { contains: searchTerm as string, mode: 'insensitive' } },
          { inwardNumber: { equals: parseInt(searchTerm as string) } },
          { inwardDate: { equals: new Date(searchTerm as string) } },
          { issueDate: { equals: new Date(searchTerm as string) } },
          { lastActionRemarks: { contains: searchTerm as string, mode: 'insensitive' } },
          { actionTakenBy: { contains: searchTerm as string, mode: 'insensitive' } },
        ],
      },
    });

    return NextResponse.json(filteredClaims, {status:200});
  } catch (error) {
    console.error('Error searching claims:', error);
    return NextResponse.json({ message: 'Error searching claims', status:500 });
  }
}