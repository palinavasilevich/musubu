export const PROJECT_STATUSES = ["DRAFT", "PUBLISHED"] as const;

export const PROJECT_DIFFICULTIES = [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
] as const;

export const PROJECT_DIFFICULTY_LABELS: Record<
  ProjectDifficulty,
  string
> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
export type ProjectDifficulty = (typeof PROJECT_DIFFICULTIES)[number];
