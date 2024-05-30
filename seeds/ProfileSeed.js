import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Seed profiles
  await prisma.profile.createMany({
    data: [
      {
        id_utilisateur: 1,
        sexe: 'Male',
        pays: 'USA',
        ville: 'New York',
      },
      {
        id_utilisateur: 2,
        sexe: 'Female',
        pays: 'Canada',
        ville: 'Toronto',
      },
      {
        id_utilisateur: 3,
        sexe: 'Female',
        pays: 'UK',
        ville: 'London',
      },
    ],
  });

  console.log('Profile data has been added');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
