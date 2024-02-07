import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./private.route";
import DashboardHome from "../pages/Dashboard_Home";
import DashboardEvents from "../pages/Dashboard_Events";
import DashboardScores from "../pages/Dashboard_Scores";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard">
        <Route
          index={true}
          element={<PrivateRoute component={DashboardHome} />}
        ></Route>
        <Route
          path="events"
          element={<PrivateRoute component={DashboardEvents} />}
        ></Route>
        <Route
          path="scores"
          element={<PrivateRoute component={DashboardScores} />}
        ></Route>
      </Route>
    </Routes>
  );
}
