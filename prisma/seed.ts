import { PrismaClient, Difficulty, ProjectStatus } from "./generated/client";

import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in .env");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Users
  const palina = await prisma.user.create({
    data: {
      email: "palina@example.com",
      password: "password123",
      username: "palina",
      avatar: null,
    },
  });

  const anna = await prisma.user.create({
    data: {
      email: "anna@example.com",
      password: "password123",
      username: "anna",
      avatar: null,
    },
  });

  // Materials
  const cottonYarn = await prisma.material.create({
    data: {
      name: "Cotton Yarn",
      description: "Soft cotton yarn suitable for crochet projects.",
    },
  });

  const crochetHook = await prisma.material.create({
    data: {
      name: "Crochet Hook 4 mm",
      description: "4 mm crochet hook for medium-weight yarn.",
    },
  });

  const woodenButtons = await prisma.material.create({
    data: {
      name: "Wooden Buttons",
      description: "Natural wooden buttons for handmade projects.",
    },
  });

  // Project
  const summerBag = await prisma.project.create({
    data: {
      title: "Crochet Summer Bag",
      description:
        "A simple and lightweight crochet bag, perfect for summer days.",
      difficulty: Difficulty.BEGINNER,
      status: ProjectStatus.PUBLISHED,
      isPublic: true,
      image: null,
      authorId: palina.id,

      projectMaterials: {
        create: [
          {
            materialId: cottonYarn.id,
            quantity: 300,
            unit: "g",
          },
          {
            materialId: crochetHook.id,
            quantity: 1,
            unit: "piece",
          },
          {
            materialId: woodenButtons.id,
            quantity: 2,
            unit: "pieces",
          },
        ],
      },

      instructions: {
        create: [
          {
            title: "Create the foundation chain",
            content: "Make a foundation chain of 40 stitches.",
            order: 1,
          },
          {
            title: "Crochet the body",
            content:
              "Work single crochet stitches across the foundation chain.",
            order: 2,
          },
          {
            title: "Add the handles",
            content: "Create two handles and attach them securely to the bag.",
            order: 3,
          },
          {
            title: "Finish the bag",
            content: "Weave in the loose ends and attach the wooden buttons.",
            order: 4,
          },
        ],
      },
    },
  });

  // Second project
  const crochetFlower = await prisma.project.create({
    data: {
      title: "Simple Crochet Flower",
      description:
        "A small crochet flower that can be used as an accessory or decoration.",
      difficulty: Difficulty.BEGINNER,
      status: ProjectStatus.PUBLISHED,
      isPublic: true,
      image: null,
      authorId: anna.id,

      projectMaterials: {
        create: [
          {
            materialId: cottonYarn.id,
            quantity: 20,
            unit: "g",
          },
          {
            materialId: crochetHook.id,
            quantity: 1,
            unit: "piece",
          },
        ],
      },

      instructions: {
        create: [
          {
            title: "Make a magic ring",
            content:
              "Create a magic ring and work six single crochet stitches into it.",
            order: 1,
          },
          {
            title: "Create the petals",
            content: "Work five petals around the center of the flower.",
            order: 2,
          },
          {
            title: "Finish",
            content: "Fasten off and weave in the ends.",
            order: 3,
          },
        ],
      },
    },
  });

  // Likes
  await prisma.like.createMany({
    data: [
      {
        userId: anna.id,
        projectId: summerBag.id,
      },
      {
        userId: palina.id,
        projectId: crochetFlower.id,
      },
    ],
  });

  // Comments
  await prisma.comment.create({
    data: {
      text: "I love this project! The design is so cute.",
      userId: anna.id,
      projectId: summerBag.id,
    },
  });

  await prisma.comment.create({
    data: {
      text: "This looks perfect for a beginner.",
      userId: palina.id,
      projectId: crochetFlower.id,
    },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
