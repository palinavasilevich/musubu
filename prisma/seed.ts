import { hash } from "bcryptjs";
import { PrismaClient, Difficulty, ProjectStatus } from "./generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in .env");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

const projects = [
  {
    id: "1",
    title: "Cozy Autumn Sweater",
    image: "/images/projects/autumn-sweater.webp",
    authorEmail: "user1@example.com",
    views: 342,
    difficulty: Difficulty.BEGINNER,
    description:
      "A warm and cozy sweater for chilly autumn days. A simple and comfortable project for anyone who enjoys knitting.",
    createdAt: new Date("2026-08-28"),
  },
  {
    id: "2",
    title: "Floral Crochet Bag",
    image: "/images/projects/crochet-bag.jpg",
    authorEmail: "user2@example.com",
    views: 276,
    difficulty: Difficulty.BEGINNER,
    description:
      "A colorful crochet bag with a beautiful floral pattern. A fun project for a relaxing weekend.",
    createdAt: new Date("2026-08-30"),
  },
  {
    id: "3",
    title: "Handmade Embroidery",
    image: "/images/projects/embroidery.webp",
    authorEmail: "user3@example.com",
    views: 198,
    difficulty: Difficulty.INTERMEDIATE,
    description:
      "A delicate embroidery project inspired by nature and handmade illustrations.",
    createdAt: new Date("2026-08-27"),
  },
  {
    id: "4",
    title: "Soft Lilac Scarf",
    image: "/images/projects/lilac-scarf.jpg",
    authorEmail: "user1@example.com",
    views: 94,
    difficulty: Difficulty.BEGINNER,
    description:
      "A soft and simple lilac scarf that is perfect for cool spring days.",
    createdAt: new Date("2026-09-01"),
  },
  {
    id: "5",
    title: "Little Crochet Bunny",
    image: "/images/projects/crochet-bunny.webp",
    authorEmail: "user2@example.com",
    views: 81,
    difficulty: Difficulty.BEGINNER,
    description:
      "A cute little crochet bunny that makes a lovely handmade gift.",
    createdAt: new Date("2026-08-31"),
  },
  {
    id: "6",
    title: "Weekend Knitting Project",
    image: "/images/projects/knitting-project.webp",
    authorEmail: "user3@example.com",
    views: 63,
    difficulty: Difficulty.INTERMEDIATE,
    description:
      "A simple weekend knitting project for makers who want to create something cozy.",
    createdAt: new Date("2026-08-29"),
  },
];

async function main() {
  console.log("🌱 Starting seed...");

  await prisma.project.deleteMany({
    where: {
      id: {
        in: projects.map((project) => project.id),
      },
    },
  });

  for (const project of projects) {
    const user = await prisma.user.findUnique({
      where: {
        email: project.authorEmail,
      },
    });

    if (!user) {
      console.warn(
        `⚠️ User ${project.authorEmail} not found. Skipping "${project.title}".`,
      );
      continue;
    }

    await prisma.project.create({
      data: {
        id: project.id,
        title: project.title,
        description: project.description,
        image: project.image,
        views: project.views,
        difficulty: project.difficulty,
        status: ProjectStatus.PUBLISHED,
        isPublic: true,
        authorId: user.id,
        createdAt: project.createdAt,
      },
    });

    console.log(`✓ ${project.title} → ${user.name ?? user.email}`);
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
