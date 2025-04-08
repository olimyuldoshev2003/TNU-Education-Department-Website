import { lazy } from "react";

export const Admin = lazy(() => import("../pages/admin/Admin"));
export const Auth = lazy(() => import("../pages/auth/Auth"));
export const Dashboard = lazy(() => import("../dashboard/Dashboard"));
export const Department = lazy(() => import("../pages/department/Department"));
export const Departments = lazy(
  () => import("../pages/departments/Departments")
);
export const DepartmentsAdmin = lazy(
  () => import("../pages/departmentsAdmin/DepartmentsAdmin")
);
export const Faculties = lazy(() => import("../pages/faculties/Faculties"));
export const FacultiesAdmin = lazy(
  () => import("../pages/facultiesAdmin/FacultiesAdmin")
);
export const Faculty = lazy(() => import("../pages/faculty/Faculty"));
export const Home = lazy(() => import("../pages/home/Home"));
export const Layout = lazy(() => import("../layout/Layout"));
export const NotFound = lazy(() => import("../pages/notFound/NotFound"));
export const Publication = lazy(
  () => import("../pages/publication/Publication")
);
export const Publications = lazy(
  () => import("../pages/publications/Publications")
);
export const PublicationsAdmin = lazy(
  () => import("../pages/publicationsAdmin/PublicationsAdmin")
);
export const Teacher = lazy(() => import("../pages/teacher/Teacher"));
export const Teachers = lazy(() => import("../pages/teachers/Teachers"));
export const TeachersAdmin = lazy(
  () => import("../pages/teachersAdmin/TeachersAdmin")
);
