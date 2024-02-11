import { Navigate } from "react-router-dom";
import { usePlayer } from "../providers/Players";

interface IRedirectProps {
  children: JSX.Element;
}

const RedirectIfLoggedIn = ({ children }: IRedirectProps) => {
  const { accToken } = usePlayer()

  if (accToken) {
    return <Navigate to="/dashboard/home" />;
  } else {
    return children;
  }
};

export default RedirectIfLoggedIn;
