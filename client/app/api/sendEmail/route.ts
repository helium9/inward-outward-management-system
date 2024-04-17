// import { PrismaClient } from "@prisma/client";
// import { error } from "console";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "adityakshitiz4@gmail.com",
    pass:process.env.EMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  const emailDetails = await request.json();
  const mailOptions = {
    from: "adityakshitiz4@gmail.com",
    to: emailDetails.sending_mail,
    subject: emailDetails.subject,
    text: emailDetails.body,
  };
  // console.log(emailDetails);
  // return NextResponse.json({status:200});
  try{
    const info = await transporter.sendMail(mailOptions);
    // throw error;
    // console.log(info);
    return NextResponse.json(info.response);
  }
  catch(err){
    return NextResponse.json({error:err});
  } 
}
