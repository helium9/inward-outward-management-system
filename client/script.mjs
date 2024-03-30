import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // const res = await prisma.meta.create({
  //   data: {
  //     inward_number:2469,
  //     ind_name:"chomu",
  //     dept_name:"cse",
  //     party_name:"finance",
  //     claimant_name:"Chomu",
  //     amount:3000,
  //     status:'new',
  //     alloted_to_id: '69bd5382-f951-40a8-9c19-4fc5835eb76e'
  //   },
  // });
  // const res = await prisma.history.create({
  //   data:{
  //     meta_id:'1e8806ba-24c8-443e-826b-367782d4117a',
  //     action: 'forward',
  //     remarks: 'Done nothing',
  //     employee_id: '69bd5382-f951-40a8-9c19-4fc5835eb76e'
  // }})
  const res = await prisma.meta.findMany();
  // const res = await prisma.meta.findMany({orderBy:{issue_date:'desc'}, select: {claimant_name:true, dept_name:true}});
  console.log(res);
}

main()
  .catch((e) => {
    console.log("error", e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
