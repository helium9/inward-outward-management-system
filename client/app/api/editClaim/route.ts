import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../db/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
//   console.log("searchParams: ", searchParams);
  const completeCalimInfo = await prisma.meta.findUnique({
    where: {
      id: searchParams.get("id"),
    },
    include: {
      history: true,
    },
  });

//   console.log("Complete Claim INfo: ", completeCalimInfo);

  return NextResponse.json(completeCalimInfo);
}

export async function PUT(request: NextRequest) {
  const requestData = await request.json();

//   console.log("search: ", requestData);

  try {
    const {
      inward_number,
      ind_name,
      dept_name,
      party_name,
      claimant_name,
      subject,
      amount,
      advanced_req,
    } = requestData;

    const updatedClaimData = await prisma.meta.update({
      where: { id: requestData.id as string },
      data: {
        inward_number,
        ind_name,
        dept_name,
        party_name,
        claimant_name,
        subject,
        amount,
        advanced_req,
      },
    });

    return NextResponse.json(updatedClaimData, { status: 200 });
  } catch (error) {
    console.error("Error updating claim:", error);
    return NextResponse.json(
      { error: "Failed to update claim data" },
      { status: 500 }
    );
  }
}
