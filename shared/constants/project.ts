export const PROJECT_STATUSES = ["DRAFT", "PUBLISHED"] as const;

export const PROJECT_DIFFICULTIES = [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
export type ProjectDifficulty = (typeof PROJECT_DIFFICULTIES)[number];
