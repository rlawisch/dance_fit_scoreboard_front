import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRouter";
import RedirectIfLoggedIn from "./loggedInRouter";
import { public_routes } from "./public.routes";
import NotFound from "../pages/NotFound";
import DashboardHome from "../pages/Dashboard_Home";
import DashboardEvents from "../pages/Dashboard_Events";
import DashboardScores from "../pages/Dashboard_Scores";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import AdminRouter from "./adminRouter";

export default function Routing() {
  const unprotectedRoutes = [...public_routes];

  return (
    <Routes>
      {unprotectedRoutes.map((r) => {
        return (
          <Route
            key={r.path}
            path={r.path}
            element={<RedirectIfLoggedIn>{r.element}</RedirectIfLoggedIn>}
          />
        );
      })}

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route
          path="/dashboard/home"
          element={
            <PrivateRoute>
              <DashboardHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/events"
          element={
            <PrivateRoute>
              <DashboardEvents />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/scores"
          element={
            <PrivateRoute>
              <DashboardScores />
            </PrivateRoute>
          }
        />
      </Route>

      <Route
        path="/admin"
        element={
          <AdminRouter>
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          </AdminRouter>
        }
      >
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
