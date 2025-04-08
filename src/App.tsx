import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import {
  Admin,
  Auth,
  Dashboard,
  Department,
  Departments,
  DepartmentsAdmin,
  Faculties,
  FacultiesAdmin,
  Faculty,
  Home,
  Layout,
  NotFound,
  Publication,
  Publications,
  PublicationsAdmin,
  Teacher,
  Teachers,
  TeachersAdmin,
} from "./routes/lazy";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div className="loader"></div>}>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "faculties",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <Faculties />
            </Suspense>
          ),
        },
        {
          path: "departments",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <Departments />
            </Suspense>
          ),
        },
        {
          path: "teachers",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <Teachers />
            </Suspense>
          ),
        },
        {
          path: "publications",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <Publications />
            </Suspense>
          ),
        },
        {
          path: "faculty/:id",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <Faculty />
            </Suspense>
          ),
        },
        {
          path: "teacher/:id",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <Teacher />
            </Suspense>
          ),
        },
        {
          path: "department/:id",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <Department />
            </Suspense>
          ),
        },
        {
          path: "publication/:id",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <Publication />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "auth",
      element: (
        <Suspense fallback={<div className="loader"></div>}>
          <Auth />
        </Suspense>
      ),
    },
    {
      path: "admin",
      element: (
        <Suspense fallback={<div className="loader"></div>}>
          <Dashboard />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <Admin />
            </Suspense>
          ),
        },
        {
          path: "faculties_admin",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <FacultiesAdmin />
            </Suspense>
          ),
        },
        {
          path: "departments_admin",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <DepartmentsAdmin />
            </Suspense>
          ),
        },
        {
          path: "teachers_admin",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <TeachersAdmin />,
            </Suspense>
          ),
        },
        {
          path: "publications_admin",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <PublicationsAdmin />,
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<div className="loader"></div>}>
          <NotFound />
        </Suspense>
      ),
    },
  ]);

  return (
    <Suspense fallback={<div className="loader"></div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
