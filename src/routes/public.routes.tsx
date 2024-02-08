import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

export const public_routes = [
    {
        path: "/",
        element: <Login /> 
    },
    {
        path: "/login",
        element: <Login /> 
    },
    {
        path: "/signup",
        element: <SignUp /> 
    },
]