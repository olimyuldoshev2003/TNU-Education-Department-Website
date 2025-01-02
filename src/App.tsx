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
            <Suspense fallback={<div>Loading Home...</div>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "faculties",
          element: (
            <Suspense fallback={<div>Loading Faculties...</div>}>
              <Faculties />
            </Suspense>
          ),
        },
        {
          path: "departments",
          element: (
            <Suspense fallback={<div>Loading Departments...</div>}>
              <Departments />
            </Suspense>
          ),
        },
        {
          path: "teachers",
          element: (
            <Suspense fallback={<div>Loading Teachers...</div>}>
              <Teachers />
            </Suspense>
          ),
        },
        {
          path: "teacher",
          element: (
            <Suspense fallback={<div>Loading Teacher...</div>}>
              <Teacher />
            </Suspense>
          ),
        },
        {
          path: "faculty",
          element: (
            <Suspense fallback={<div>Loading Faculty...</div>}>
              <Faculty />
            </Suspense>
          ),
        },
        {
          path: "department",
          element: (
            <Suspense fallback={<div>Loading Department...</div>}>
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
    <Suspense fallback={<div>Loading Application...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
