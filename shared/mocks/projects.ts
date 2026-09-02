import { ProjectCardProps } from "@/components/projects/project-card";

export const trendingProjects: ProjectCardProps[] = [
  {
    id: "1",
    title: "Cozy Autumn Sweater",
    image: "/images/projects/autumn-sweater.webp",
    author: {
      username: "anna_knits",
      avatar: null,
    },
    likes: 124,
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
  },
];

export const latestProjects: ProjectCardProps[] = [
  {
    id: "4",
    title: "Soft Lilac Scarf",
    image: "/images/projects/lilac-scarf.jpg",
    author: {
      username: "lena_makes",
      avatar: null,
    },
    likes: 32,
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
  },
];
