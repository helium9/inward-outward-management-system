import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // const res = await prisma.meta.create({
  //   data: {
  //     inward_number:246934,
  //     ind_name:"123",
  //     dept_name:"cse",
  //     party_name:"finance",
  //     claimant_name:"xyz",
  //     amount:3000,
  //     status:'forward',
  //     alloted_to_id: '69bd5382-f951-40a8-9c19-4fc5835eb76e'
  //   },
  // });
  // const res = await prisma.history.create({
  //   data:{
  //     meta_id:'9ae9f64d-67f4-4e83-aae3-e45dc1a399ab',
  //     action: 'outward',
  //     remarks: 'done. verified.',
  //     employee_id: '69bd5382-f951-40a8-9c19-4fc5835eb76e'
  // }})
  //   const res = await prisma.employee.create({
  //   data:{

  //     name     : "Natural Star",
  //     email    : "admin@admin.com",
  //     isAdmin  : true
  // }})
  // const res = await prisma.history.findMany();
  // const res = await prisma.meta.findMany({orderBy:{issue_date:'desc'}, select: {claimant_name:true, dept_name:true}});
  // const res = await prisma.meta.update({
  //   where:{
  //     id:'9ae9f64d-67f4-4e83-aae3-e45dc1a399ab'
  //   },
  //   data:{
  //     alloted_to_id:'69bd5382-f951-40a8-9c19-4fc5835eb76e',
  //     subject:'paise dedde BKL.'
  //   }
  // });
  // const res = await prisma.history.update({where: {id:"6f0db27c-236d-4301-80a1-422906a0ea09"}, data:{remarks:"Regrettably, your reimbursement claim has been denied due to non-compliance with policy or insufficient documentation. Please review our guidelines for future submissions. For inquiries, contact us. Thank you."}});
  // const res = await prisma.history.deleteMany({
  //   where: {
  //     time_stamp: { gte: new Date("2024-04-11T22:14:28.824Z") },
  //     meta_id: "9ae9f64d-67f4-4e83-aae3-e45dc1a399ab",
  //   },
  // });
  // const res=await prisma.employee.findMany();
  // const res = await prisma.meta.findMany();
  console.log(res);
}

main()
  .catch((e) => {
    console.log("error", e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
