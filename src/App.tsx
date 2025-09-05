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
import AuthCheck from "./routes/authCheck/AuthCheck";
import ProtectedRoute from "./routes/protectedRoute/ProtectedRoute";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div className="loader"></div>}>
          {/* <AuthCheck> */}
          <Layout />
          {/* </AuthCheck> */}
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              {/* <AuthCheck> */}
              <Home />
              {/* </AuthCheck> */}
            </Suspense>
          ),
        },
        {
          path: "faculties",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              {/* <AuthCheck> */}
              <Faculties />
              {/* </AuthCheck> */}
            </Suspense>
          ),
        },
        {
          path: "departments",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              {/* <AuthCheck> */}
              <Departments />
              {/* </AuthCheck> */}
            </Suspense>
          ),
        },
        {
          path: "teachers",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              {/* <AuthCheck> */}
              <Teachers />
              {/* </AuthCheck> */}
            </Suspense>
          ),
        },
        {
          path: "publications",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              {/* <AuthCheck> */}
              <Publications />
              {/* </AuthCheck> */}
            </Suspense>
          ),
        },
        {
          path: "faculty/:id",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              {/* <AuthCheck> */}
              <Faculty />
              {/* </AuthCheck> */}
            </Suspense>
          ),
        },
        {
          path: "teacher/:id",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              {/* <AuthCheck> */}
              <Teacher />
              {/* </AuthCheck> */}
            </Suspense>
          ),
        },
        {
          path: "department/:id",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              {/* <AuthCheck> */}
              <Department />
              {/* </AuthCheck> */}
            </Suspense>
          ),
        },
        {
          path: "publication/:id",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              {/* <AuthCheck> */}
              <Publication />
              {/* </AuthCheck> */}
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "auth",
      element: (
        <Suspense fallback={<div className="loader"></div>}>
          <AuthCheck>
            <Auth />
          </AuthCheck>
        </Suspense>
      ),
    },
    {
      path: "admin",
      element: (
        <Suspense fallback={<div className="loader"></div>}>
          {/* <ProtectedRoute> */}
          <Dashboard />
          {/* </ProtectedRoute> */}
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "faculties_admin",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <ProtectedRoute>
                <FacultiesAdmin />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "departments_admin",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <ProtectedRoute>
                <DepartmentsAdmin />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "teachers_admin",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <ProtectedRoute>
                <TeachersAdmin />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "publications_admin",
          element: (
            <Suspense fallback={<div className="loader"></div>}>
              <ProtectedRoute>
                <PublicationsAdmin />
              </ProtectedRoute>
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
