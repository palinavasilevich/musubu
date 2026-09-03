export const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  LIKES: "/likes",

  LOGIN: "/login",
  SIGNUP: "/signup",

  DASHBOARD: "/dashboard",
  CREATE: "/create",
  PROFILE: "/profile",

  PROJECTS: "/projects",
  PROJECT: (id: string) => `/projects/${id}`,
  NEW_PROJECT: "/projects/new",
  EDIT_PROJECT: (id: string) => `/projects/${id}/edit`,
} as const;
