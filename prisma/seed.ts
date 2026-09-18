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
    username: "pvslvch",
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
    expectedTime: 120,
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
  {
    id: "seed-bear",
    title: "Tiny Crochet Bear",
    description:
      "A sweet little amigurumi bear with a simple shape and minimal sewing. Perfect for a first crochet toy.",
    image: "/images/projects/crochet-bear.webp",
    difficulty: Difficulty.BEGINNER,
    status: ProjectStatus.PUBLISHED,
    views: 142,
    createdAt: new Date("2026-08-29"),
    expectedTime: 150,
    materials: [
      "Brown cotton yarn — 60 g",
      "3 mm crochet hook",
      "Safety eyes — 2 pcs",
      "Polyester stuffing",
      "Yarn needle",
    ],
    videoUrl: null,
    instructions: [
      {
        order: 1,
        title: "Make the head",
        content:
          "Begin with a magic ring and work single crochet stitches in continuous rounds. Increase gradually to create a rounded head.",
        image: null,
      },
      {
        order: 2,
        title: "Crochet the body",
        content:
          "Continue with the body using the same yarn. Keep the tension even to create a smooth amigurumi shape.",
        image: null,
      },
      {
        order: 3,
        title: "Add the details",
        content:
          "Attach the eyes and embroider a small nose. Sew the head to the body and secure all yarn ends.",
        image: null,
      },
    ],
  },
  {
    id: "seed-strawberry",
    title: "Crochet Strawberry",
    description:
      "A tiny crochet strawberry that works beautifully as a keychain, decoration or small handmade gift.",
    image: "/images/projects/crochet-strawberry.jpg",
    difficulty: Difficulty.BEGINNER,
    status: ProjectStatus.PUBLISHED,
    views: 216,
    createdAt: new Date("2026-08-27"),
    expectedTime: 60,
    materials: [
      "Red cotton yarn — 20 g",
      "Green cotton yarn — 10 g",
      "2.5 mm crochet hook",
      "Polyester stuffing",
      "Yarn needle",
    ],
    videoUrl: null,
    instructions: [
      {
        order: 1,
        title: "Crochet the strawberry",
        content:
          "Work the strawberry from the bottom upward, increasing and decreasing to create its characteristic shape.",
        image: null,
      },
      {
        order: 2,
        title: "Add the stuffing",
        content:
          "Add a small amount of stuffing before closing the strawberry completely.",
        image: null,
      },
      {
        order: 3,
        title: "Make the leaves",
        content:
          "Use green yarn to crochet the leafy top and sew it securely to the strawberry.",
        image: null,
      },
    ],
  },
  {
    id: "seed-whale",
    title: "Mini Crochet Whale",
    description:
      "A soft and simple whale amigurumi with a rounded body and tiny fins.",
    image: "/images/projects/crochet-whale.jpg",
    difficulty: Difficulty.INTERMEDIATE,
    status: ProjectStatus.PUBLISHED,
    views: 178,
    createdAt: new Date("2026-08-25"),
    expectedTime: 180,
    materials: [
      "Blue cotton yarn — 70 g",
      "White cotton yarn — 10 g",
      "3 mm crochet hook",
      "Safety eyes — 2 pcs",
      "Polyester stuffing",
    ],
    videoUrl: null,
    instructions: [
      {
        order: 1,
        title: "Crochet the body",
        content:
          "Start at the tail and work in continuous rounds, increasing to create the rounded whale body.",
        image: null,
      },
      {
        order: 2,
        title: "Make the fins",
        content:
          "Crochet two small fins and attach them symmetrically to both sides of the body.",
        image: null,
      },
      {
        order: 3,
        title: "Finish the whale",
        content:
          "Add the eyes, stuff the body firmly and close the opening with a yarn needle.",
        image: null,
      },
    ],
  },
  {
    id: "seed-cat",
    title: "Sleepy Crochet Cat",
    description:
      "A cozy little cat amigurumi with sleepy eyes and a simple sitting shape.",
    image: "/images/projects/crochet-cat.jpg",
    difficulty: Difficulty.INTERMEDIATE,
    status: ProjectStatus.PUBLISHED,
    views: 324,
    createdAt: new Date("2026-08-22"),
    expectedTime: 240,
    materials: [
      "Soft acrylic yarn — 80 g",
      "3.5 mm crochet hook",
      "Embroidery thread",
      "Polyester stuffing",
      "Yarn needle",
    ],
    videoUrl: null,
    instructions: [
      {
        order: 1,
        title: "Crochet the head",
        content:
          "Work the head in continuous rounds and shape the ears by adjusting the stitch increases.",
        image: null,
      },
      {
        order: 2,
        title: "Crochet the body",
        content:
          "Create the body from the bottom upward and add stuffing gradually as you work.",
        image: null,
      },
      {
        order: 3,
        title: "Embroider the face",
        content:
          "Use embroidery thread to create sleepy eyes, a nose and small whiskers.",
        image: null,
      },
      {
        order: 4,
        title: "Assemble the cat",
        content:
          "Attach the head, tail and any remaining details. Hide all yarn ends securely.",
        image: null,
      },
    ],
  },
  {
    id: "seed-bee",
    title: "Little Crochet Bee",
    description:
      "A cheerful striped bee that is quick to make and perfect as a small handmade decoration.",
    image: "/images/projects/crochet-bee.webp",
    difficulty: Difficulty.BEGINNER,
    status: ProjectStatus.PUBLISHED,
    views: 267,
    createdAt: new Date("2026-08-20"),
    expectedTime: 90,
    materials: [
      "Yellow cotton yarn — 30 g",
      "Black cotton yarn — 20 g",
      "White yarn — 10 g",
      "3 mm crochet hook",
      "Safety eyes — 2 pcs",
      "Polyester stuffing",
    ],
    videoUrl: null,
    instructions: [
      {
        order: 1,
        title: "Crochet the body",
        content:
          "Alternate yellow and black yarn while working the body in continuous rounds.",
        image: null,
      },
      {
        order: 2,
        title: "Make the wings",
        content:
          "Crochet two small white wings and leave a long tail for sewing.",
        image: null,
      },
      {
        order: 3,
        title: "Assemble the bee",
        content:
          "Attach the wings and eyes, then embroider a small smile before securing the yarn ends.",
        image: null,
      },
    ],
  },
  {
    id: "seed-turtle",
    title: "Pocket Crochet Turtle",
    description:
      "A small turtle amigurumi with a textured shell and cute little legs.",
    image: "/images/projects/crochet-turtle.webp",
    difficulty: Difficulty.INTERMEDIATE,
    status: ProjectStatus.PUBLISHED,
    views: 198,
    createdAt: new Date("2026-08-17"),
    expectedTime: 210,
    materials: [
      "Green cotton yarn — 60 g",
      "Brown cotton yarn — 30 g",
      "3 mm crochet hook",
      "Safety eyes — 2 pcs",
      "Polyester stuffing",
    ],
    videoUrl: null,
    instructions: [
      {
        order: 1,
        title: "Make the shell",
        content:
          "Crochet the shell in rounds and use increases to create a gently domed shape.",
        image: null,
      },
      {
        order: 2,
        title: "Crochet the body",
        content:
          "Work the head, legs and underside of the turtle separately before joining the pieces.",
        image: null,
      },
      {
        order: 3,
        title: "Join the pieces",
        content:
          "Sew the body to the shell and make sure all four legs are positioned evenly.",
        image: null,
      },
    ],
  },
  {
    id: "seed-mushroom",
    title: "Forest Mushroom",
    description:
      "A whimsical crochet mushroom inspired by a tiny forest cottage garden.",
    image: "/images/projects/crochet-mushroom.jpg",
    difficulty: Difficulty.ADVANCED,
    status: ProjectStatus.DRAFT,
    views: 34,
    createdAt: new Date("2026-09-02"),
    expectedTime: 300,
    materials: [
      "Red cotton yarn — 50 g",
      "Cream cotton yarn — 40 g",
      "2.5 mm crochet hook",
      "Polyester stuffing",
      "Yarn needle",
    ],
    videoUrl: null,
    instructions: [
      {
        order: 1,
        title: "Crochet the cap",
        content:
          "Work the mushroom cap in rounds, increasing evenly to create a wide rounded shape.",
        image: null,
      },
      {
        order: 2,
        title: "Crochet the stem",
        content:
          "Create the stem separately and stuff it lightly before closing the bottom.",
        image: null,
      },
      {
        order: 3,
        title: "Add the spots",
        content:
          "Embroider or crochet small cream spots and attach them evenly across the cap.",
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
