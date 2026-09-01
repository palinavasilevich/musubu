export const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  LIKES: "/likes",

  LOGIN: "/login",
  SIGNUP: "/signup",

  DASHBOARD: "/dashboard",
  CREATE: "/create",
  PROFILE: "/profile",

  PROJECT: (id: string) => `/projects/${id}`,
  EDIT_PROJECT: (id: string) => `/projects/${id}/edit`,
} as const;
