export const PROJECT_STATUSES = ["DRAFT", "PUBLISHED"] as const;

export const PROJECT_DIFFICULTIES = [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
] as const;

export const PROJECT_DIFFICULTY_LABELS: Record<ProjectDifficulty, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

export const PROJECT_DIFFICULTY_CLASSES: Record<ProjectDifficulty, string> = {
  BEGINNER:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  INTERMEDIATE:
    "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  ADVANCED: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
};

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
export type ProjectDifficulty = (typeof PROJECT_DIFFICULTIES)[number];
