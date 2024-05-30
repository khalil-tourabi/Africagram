import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


async function main() {
  // Seed users
  await prisma.utilisateur.createMany({
    data: [
      {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        isAdmin: false,
      },
      {
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'jane.smith@example.com',
        password: 'password123',
        isAdmin: false,
      },
      {
        firstname: 'Alice',
        lastname: 'Johnson',
        email: 'alice.johnson@example.com',
        password: 'password123',
        isAdmin: true,
      },
    ],
  });

  // Seed posts
  await prisma.post.createMany({
    data: [
      {
        utilisateur_id: 1, // Assuming user IDs start at 1
        caption: 'First post!',
        photo: 'photo1.jpg',
      },
      {
        utilisateur_id: 2,
        caption: 'Hello World',
        photo: 'photo2.jpg',
      },
      {
        utilisateur_id: 3,
        caption: 'Another day in paradise',
        photo: 'photo3.jpg',
      },
    ],
  });

  // Seed comments
  await prisma.commentaire.createMany({
    data: [
      {
        utilisateur_id: 2,
        post_id: 1,
        message: 'Great post, John!',
      },
      {
        utilisateur_id: 1,
        post_id: 2,
        message: 'Nice to see you here, Jane!',
      },
      {
        utilisateur_id: 3,
        post_id: 1,
        message: 'Welcome, John!',
      },
    ],
  });

  // Seed likes (aimes)
  await prisma.aime.createMany({
    data: [
      {
        utilisateur_id: 1,
        post_id: 2,
        aimer: true,
      },
      {
        utilisateur_id: 2,
        post_id: 3,
        aimer: true,
      },
      {
        utilisateur_id: 3,
        post_id: 1,
        aimer: true,
      },
    ],
  });

  console.log('Seed data has been added');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });