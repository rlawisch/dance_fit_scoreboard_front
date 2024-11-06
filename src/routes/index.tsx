import { Routes, Route } from "react-router-dom";
import RedirectIfLoggedIn from "./loggedInRouter";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import UniqueDashboard from "../pages/UDashboard";
import UDashboardHome from "../pages/UDashboard_Home";
import UDashboardEvent from "../pages/UDashboard_Events/UDashboard_Event";
import UDashboardCategory from "../pages/UDashboard_Events/UDashboard_Event/EventType_Championship/UDashboard_Category";
import UDashboardScores from "../pages/UDashboard_Scores";
import UDashboardProfile from "../pages/UDashboard_Profile";
import UDashboardPlayers from "../pages/UDashboard_Players";
import UDashboardMusics from "../pages/UDashboard_Musics";
import UDashboard_Enrollments from "../pages/UDashboard_Enrollments";
import UDashboardEvents from "../pages/UDashboard_Events";
import PrivateRouter from "./privateRouter";
import AdminRouter from "./adminRouter";

export default function Routing() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RedirectIfLoggedIn>
            <Home />
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
            <Signup />
          </RedirectIfLoggedIn>
        }
      />

      <Route path="/udashboard" element={<UniqueDashboard />}>
        {/* PUBLIC PAGES */}
        <Route path="/udashboard/home" element={<UDashboardHome />} />

        <Route path="/udashboard/events" element={<UDashboardEvents />} />

        <Route
          path="/udashboard/events/:event_id"
          element={<UDashboardEvent />}
        />

        <Route
          path="/udashboard/events/:event_id/categories/:category_id"
          element={<UDashboardCategory />}
        />

        <Route path="/udashboard/scores" element={<UDashboardScores />} />

        {/* LOGGED IN USER LOCKED */}

        <Route
          path="/udashboard/profile"
          element={
            <PrivateRouter>
              <UDashboardProfile />
            </PrivateRouter>
          }
        />

        {/* ADMIN ONLY */}

        <Route
          path="/udashboard/players"
          element={
            <AdminRouter>
              <UDashboardPlayers />
            </AdminRouter>
          }
        />

        <Route
          path="/udashboard/musics"
          element={
            <AdminRouter>
              <UDashboardMusics />
            </AdminRouter>
          }
        />

        <Route
          path="/udashboard/enrollments"
          element={
            <AdminRouter>
              <UDashboard_Enrollments />
            </AdminRouter>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
