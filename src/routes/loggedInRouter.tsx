import { Navigate } from "react-router-dom";

interface IRedirectProps {
  children: JSX.Element;
}

const RedirectIfLoggedIn = ({ children }: IRedirectProps) => {
  const player = localStorage.getItem("@DFS/Player") || "";

  if (player !== "") {
    return <Navigate to="/dashboard/home" />;
  } else {
    return children;
  }
};

export default RedirectIfLoggedIn;
