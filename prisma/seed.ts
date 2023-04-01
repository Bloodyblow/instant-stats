import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    categories: {
      create: [
        {
          name: "Work",
          icon: "work",
          units: "hours",
        },
      ],
    },
  },
];

async function main() {
  // const users = await prisma.user.findMany()
  // console.log(users)

  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export default prisma;
