import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // const res = await prisma.meta.create({
  //   data: {
  //     inward_number: 2339,
  //     ind_name: "charnav",
  //     dept_name: "cse",
  //     party_name: "finance",
  //     claimant_name: "kshitiz",
  //     amount: 69,
  //     status: "inward",
  //   },
  // });
  const res = await prisma.meta.findMany();
  console.log(res);
}

main()
  .catch((e) => {
    console.log("error", e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
