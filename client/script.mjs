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
  //     meta_id:'ed2dd0e8-c324-4f6a-baef-a826275dc8f6',
  //     action: 'forward',
  //     remarks: 'Done nothing123',
  //     employee_id: '69bd5382-f951-40a8-9c19-4fc5835eb76e'
  // }})
  // const res = await prisma.meta.findMany();
  // const res = await prisma.meta.findMany({orderBy:{issue_date:'desc'}, select: {claimant_name:true, dept_name:true}});
  // const res = await prisma.meta.update({
  //   where:{
  //     id:'5215ce5d-6f3c-4404-a4a9-189f8d25dfa9'
  //   },
  //   data:{
  //     status:'forward'
  //   }
  // });
  console.log(res);
}

main()
  .catch((e) => {
    console.log("error", e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
