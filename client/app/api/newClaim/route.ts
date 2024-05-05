import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../db/db";

export async function POST(req: NextRequest) {
  try {
    const {
      origin,
      inward_number,
      issue_date,
      ind_name,
      dept_name,
      party_name,
      claimant_name,
      subject,
      amount,
      advanced_req,
      //  status,
    } = await req.json();

    const newRecord = await prisma.meta.create({
      data: {
        origin,
        inward_number,
        issue_date: new Date(issue_date),
        ind_name,
        dept_name,
        party_name,
        claimant_name,
        subject,
        amount,
        advanced_req,
        status: "new",
      },
    });
    // console.log(newRecord);
    // await new Promise(r => setTimeout(r, 2000));
    return NextResponse.json({
      message: "Data stored successfully",
      status:200,
    });
  } catch (error) {
    console.error("Error storing data:", error);
    return NextResponse.json({ error: "Error storing data" }, { status: 500 });
  }
}

