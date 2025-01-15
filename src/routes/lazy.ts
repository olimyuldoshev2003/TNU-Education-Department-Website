import { lazy } from "react";

// Lazy load the components
export const Layout = lazy(() => import("../layout/Layout"));
export const Home = lazy(() => import("../pages/home/Home"));
export const Faculties = lazy(() => import("../pages/faculties/Faculties"));
export const Faculty = lazy(() => import("../pages/faculty/Faculty"));
export const Departments = lazy(
  () => import("../pages/departments/Departments")
);
export const Department = lazy(() => import("../pages/department/Department"));
export const Teachers = lazy(() => import("../pages/teachers/Teachers"));
export const Teacher = lazy(() => import("../pages/teacher/Teacher"));
export const NotFound = lazy(() => import("../pages/notFound/NotFound"));
