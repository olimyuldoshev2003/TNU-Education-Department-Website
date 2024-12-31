import { lazy } from "react";

// Lazy load the components
export const Home = lazy(() => import("../pages/home/Home"));
export const Faculties = lazy(() => import("../pages/faculties/Faculties"));
export const Departments = lazy(() => import("../pages/departments/Departments"));
export const Teachers = lazy(() => import("../pages/teachers/Teachers"));
