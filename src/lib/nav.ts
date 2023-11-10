export interface Route {
  path: string;
  name: string;
}

export const routes: Route[] = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/students/new",
    name: "Add New Students",
  },
  {
    path: "/students",
    name: "Students List",
  },
  {
    path: "/courses/new",
    name: "Add New Courses",
  },
  {
    path: "/courses",
    name: "Courses List",
  },
  {
    path: "/results/new",
    name: "Add New Results",
  },
  {
    path: "/results",
    name: "Results List",
  },
];
