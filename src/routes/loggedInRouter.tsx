import { Navigate } from "react-router-dom";

interface IRedirectProps {
  children: JSX.Element;
}

const RedirectIfLoggedIn = ({ children }: IRedirectProps) => {
  const player = localStorage.getItem("@DFS/PlayerToken") || "";

  if (player !== "") {
    return <Navigate to="/dashboard/home" />;
  } else {
    return children;
  }
};

export default RedirectIfLoggedIn;
