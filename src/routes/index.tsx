import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRouter";
import RedirectIfLoggedIn from "./loggedInRouter";
import NotFound from "../pages/NotFound";
import DashboardHome from "../pages/Dashboard_Home";
import DashboardEvents from "../pages/Dashboard_Events";
import DashboardScores from "../pages/Dashboard_Scores";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import AdminRouter from "./adminRouter";
import AdminDashboardHome from "../pages/AdminDashboard_Home";
import AdminDashScoreValidation from "../pages/AdminDashboard_ScoreValidation";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import DashboardEvent from "../pages/Dashboard_Event";
import AdminDashboardEvents from "../pages/AdminDashboard_Events";
import AdminDashboardEvent from "../pages/AdminDashboard_Event";
import DashboardProfile from "../pages/Dashboard_Profile";

export default function Routing() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RedirectIfLoggedIn>
            <Login />
          </RedirectIfLoggedIn>
        }
      />

      <Route
        path="/login"
        element={
          <RedirectIfLoggedIn>
            <Login />
          </RedirectIfLoggedIn>
        }
      />

      <Route
        path="/signup"
        element={
          <RedirectIfLoggedIn>
            <SignUp />
          </RedirectIfLoggedIn>
        }
      />

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
          path="/dashboard/events/:event_id"
          element={
            <PrivateRoute>
              <DashboardEvent />
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

        <Route
          path="/dashboard/profile"
          element={
            <PrivateRoute>
              <DashboardProfile />
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
        <Route
          path="/admin/home"
          element={
            <AdminRouter>
              <PrivateRoute>
                <AdminDashboardHome />
              </PrivateRoute>
            </AdminRouter>
          }
        />

        <Route
          path="/admin/events"
          element={
            <AdminRouter>
              <PrivateRoute>
                <AdminDashboardEvents />
              </PrivateRoute>
            </AdminRouter>
          }
        />

        <Route
          path="/admin/events/:event_id"
          element={
            <AdminRouter>
              <PrivateRoute>
                <AdminDashboardEvent />
              </PrivateRoute>
            </AdminRouter>
          }
        />

        <Route
          path="/admin/score_validation"
          element={
            <AdminRouter>
              <PrivateRoute>
                <AdminDashScoreValidation />
              </PrivateRoute>
            </AdminRouter>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
