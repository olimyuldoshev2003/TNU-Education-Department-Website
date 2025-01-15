import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import Layout from "./layout/Layout";
import { Departments, Faculties, Home, Teachers } from "./routes/lazy";
import NotFound from "./pages/notFound/NotFound";
import Teacher from "./pages/teacher/Teacher";
import Faculty from "./pages/faculty/Faculty";
import Department from "./pages/department/Department";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
          path: "teacher",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <Teacher />
            </Suspense>
          ),
        },
        {
          path: "faculty",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <Faculty />
            </Suspense>
          ),
        },
        {
          path: "department",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <Department />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <Suspense fallback={<div className="loader"></div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
