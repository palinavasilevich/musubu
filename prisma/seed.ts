import bcrypt from "bcryptjs";

import { PrismaClient, Difficulty, ProjectStatus } from "./generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in .env");
}

const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

const prisma = new PrismaClient({ adapter });

const users = [
  {
    id: "seed-user-1",
    email: "palina@example.com",
    password: "password123",
    username: "palina",
    avatar: null,
  },
  {
    id: "seed-user-2",
    email: "anna@example.com",
    password: "password123",
    username: "anna",
    avatar: null,
  },
  {
    id: "seed-user-3",
    email: "kate@example.com",
    password: "password123",
    username: "kate",
    avatar: null,
  },
];

const projects = [
  {
    id: "seed-bunny",
    title: "Little Crochet Bunny",
    description:
      "A cute little crochet bunny that makes a lovely handmade gift. A simple amigurumi project for beginners.",
    image: "/images/projects/crochet-bunny.webp",
    difficulty: Difficulty.BEGINNER,
    status: ProjectStatus.PUBLISHED,
    views: 81,
    createdAt: new Date("2026-08-31"),
    materials: [
      "Cotton yarn — 50 g",
      "3 mm crochet hook",
      "Safety eyes — 2 pcs",
      "Polyester stuffing — 30 g",
    ],
    videoUrl: null,
    instructions: [
      {
        order: 1,
        title: "Crochet the head",
        content:
          "Start with a magic ring and crochet 6 single crochets. Continue working in rounds, increasing evenly until the head reaches the desired size.",
        image: null,
      },
      {
        order: 2,
        title: "Add the eyes",
        content:
          "Place the safety eyes between the stitches before completely closing the head. Make sure they are positioned symmetrically.",
        image: null,
      },
      {
        order: 3,
        title: "Stuff the head",
        content:
          "Gradually add polyester stuffing while closing the head. Keep the stuffing firm but make sure the shape remains smooth.",
        image: null,
      },
      {
        order: 4,
        title: "Crochet the body",
        content:
          "Crochet the body in continuous rounds. Increase at the beginning and then continue without increases until the desired length is reached.",
        image: null,
      },
      {
        order: 5,
        title: "Make the ears",
        content:
          "Crochet two small ears using the same yarn. Fold them slightly and sew them securely to the top of the head.",
        image: null,
      },
      {
        order: 6,
        title: "Assemble the bunny",
        content:
          "Sew the head, ears and body together. Hide all yarn ends inside the project and make sure all parts are securely attached.",
        image: null,
      },
    ],
  },
];

async function main() {
  console.log("🌱 Starting seed...");

  const hashedUsers = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    })),
  );

  for (const user of hashedUsers) {
    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {
        username: user.username,
        avatar: user.avatar,
      },
      create: user,
    });
  }

  console.log(`✓ Created/updated ${hashedUsers.length} user(s)`);

  const seededUsers = await prisma.user.findMany({
    where: {
      email: {
        in: users.map((user) => user.email),
      },
    },
  });

  await prisma.project.deleteMany({
    where: {
      id: {
        in: projects.map((project) => project.id),
      },
    },
  });

  for (let index = 0; index < projects.length; index++) {
    const projectData = projects[index];
    const user = seededUsers[index % seededUsers.length];

    const project = await prisma.project.create({
      data: {
        id: projectData.id,
        title: projectData.title,
        description: projectData.description,
        image: projectData.image,
        difficulty: projectData.difficulty,
        status: projectData.status,
        views: projectData.views,
        authorId: user.id,
        createdAt: projectData.createdAt,
        materials: projectData.materials,
        videoUrl: projectData.videoUrl,
        instructions: {
          create: projectData.instructions,
        },
      },
      include: {
        instructions: true,
      },
    });

    console.log(`✓ ${project.title} → ${user.username ?? user.email}`);
    console.log(`  Materials: ${projectData.materials.length}`);
    console.log(`  Instructions: ${project.instructions.length}`);
  }

  console.log("🌱 Seed completed!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
