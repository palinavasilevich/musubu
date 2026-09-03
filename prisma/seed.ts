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

const projects = [
  {
    id: "seed-bunny",
    title: "Little Crochet Bunny",
    description:
      "A cute little crochet bunny that makes a lovely handmade gift. A simple amigurumi project for beginners.",
    image: "/images/projects/crochet-bunny.webp",
    difficulty: Difficulty.BEGINNER,
    views: 81,
    createdAt: new Date("2026-08-31"),

    materials: [
      {
        name: "Cotton yarn",
        description: "Soft cotton yarn suitable for amigurumi.",
        quantity: 50,
        unit: "g",
      },
      {
        name: "Crochet hook",
        description: "A 3 mm crochet hook.",
        quantity: 1,
        unit: "pcs",
      },
      {
        name: "Safety eyes",
        description: "Small black safety eyes for the bunny.",
        quantity: 2,
        unit: "pcs",
      },
      {
        name: "Polyester stuffing",
        description: "Soft filling for amigurumi toys.",
        quantity: 30,
        unit: "g",
      },
    ],

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
    id: "seed-sweater",
    title: "Cozy Autumn Sweater",
    description:
      "A warm and cozy sweater for chilly autumn days. A simple and comfortable knitting project.",
    image: "/images/projects/autumn-sweater.webp",
    difficulty: Difficulty.BEGINNER,
    views: 342,
    createdAt: new Date("2026-08-28"),

    materials: [
      {
        name: "Wool yarn",
        description: "Warm medium-weight wool yarn.",
        quantity: 500,
        unit: "g",
      },
      {
        name: "Knitting needles",
        description: "Straight or circular knitting needles.",
        quantity: 1,
        unit: "set",
      },
    ],

    instructions: [
      {
        order: 1,
        title: "Knit the front",
        content:
          "Cast on the required number of stitches and knit the front panel according to the desired measurements.",
        image: null,
      },
      {
        order: 2,
        title: "Knit the back",
        content: "Repeat the same process for the back panel.",
        image: null,
      },
      {
        order: 3,
        title: "Make the sleeves",
        content: "Knit two sleeves and shape them gradually toward the cuffs.",
        image: null,
      },
      {
        order: 4,
        title: "Assemble the sweater",
        content:
          "Sew the shoulders and sides together, then attach the sleeves.",
        image: null,
      },
    ],
  },
];

async function main() {
  console.log("🌱 Starting seed...");

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "asc",
    },
    take: 3,
  });

  if (users.length === 0) {
    throw new Error(
      "No users found. Create at least one user before running the seed.",
    );
  }

  console.log(`Found ${users.length} existing user(s).`);

  // Remove previously seeded projects.
  await prisma.project.deleteMany({
    where: {
      id: {
        in: projects.map((project) => project.id),
      },
    },
  });

  for (let index = 0; index < projects.length; index++) {
    const projectData = projects[index];
    const user = users[index % users.length];

    const project = await prisma.project.create({
      data: {
        id: projectData.id,
        title: projectData.title,
        description: projectData.description,
        image: projectData.image,
        difficulty: projectData.difficulty,
        status: ProjectStatus.PUBLISHED,
        isPublic: true,
        views: projectData.views,
        authorId: user.id,
        createdAt: projectData.createdAt,

        projectMaterials: {
          create: projectData.materials.map((material) => ({
            quantity: material.quantity,
            unit: material.unit,

            material: {
              create: {
                name: material.name,
                description: material.description,
              },
            },
          })),
        },

        instructions: {
          create: projectData.instructions,
        },
      },

      include: {
        projectMaterials: {
          include: {
            material: true,
          },
        },
        instructions: true,
      },
    });

    console.log(`✓ ${project.title} → ${user.name ?? user.email}`);

    console.log(`  Materials: ${project.projectMaterials.length}`);

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
