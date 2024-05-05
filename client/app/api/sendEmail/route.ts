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
    pass:"bvogttalqbuyecfb",
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
  console.log(mailOptions);
  try{
    const info = await transporter.sendMail(mailOptions);
    // await new Promise(r => setTimeout(r, 2000)); //simulate wait times to check button getting disabled during send.
    console.log(info.response);
    return NextResponse.json(info.response, {status:200});
    // return NextResponse.json({headers:{date:"dummy"}, status:200});
  }
  catch(err){
    console.log(err);
    return NextResponse.json({error:err, status:400});
  } 
}
