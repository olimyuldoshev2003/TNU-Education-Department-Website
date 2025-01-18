import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import {
  Department,
  Departments,
  Faculties,
  Faculty,
  Home,
  NotFound,
  Teacher,
  Teachers,
} from "./routes/lazy";
import Layout from "./layout/Layout";
import Auth from "./pages/auth/Auth";
import Dashboard from "./dashboard/Dashboard";
import Admin from "./pages/admin/Admin";

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
      path: "auth",
      element: (
        <Suspense fallback={<div className="loader"></div>}>
          <Auth />,
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
          element: <Admin />,
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
