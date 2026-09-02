import { Difficulty } from "@/prisma/generated/client";

import type { Project, ProjectCardProps } from "@/shared/types/project";

export const projects: Project[] = [
  {
    id: "1",
    title: "Cozy Autumn Sweater",
    image: "/images/projects/autumn-sweater.webp",
    author: {
      username: "anna_knits",
      avatar: null,
    },
    likes: 124,
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
    author: {
      username: "mila_crafts",
      avatar: null,
    },
    likes: 98,
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
    author: {
      username: "crafty_sophie",
      avatar: null,
    },
    likes: 87,
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
    author: {
      username: "lena_makes",
      avatar: null,
    },
    likes: 32,
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
    author: {
      username: "yuki_crafts",
      avatar: null,
    },
    likes: 27,
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
    author: {
      username: "emma_knits",
      avatar: null,
    },
    likes: 19,
    views: 63,
    difficulty: Difficulty.INTERMEDIATE,
    description:
      "A simple weekend knitting project for makers who want to create something cozy.",
    createdAt: new Date("2026-08-29"),
  },
];
export const trendingProjects: ProjectCardProps[] = [...projects]
  .sort((a, b) => b.likes - a.likes)
  .slice(0, 3);

export const latestProjects: ProjectCardProps[] = [...projects]
  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  .slice(0, 3);
