import { usePlayer } from "../providers/Players";
import { Navigate } from "react-router-dom";

interface IPrivateRoute {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: IPrivateRoute) => {
  const { accToken } = usePlayer();

  if (!!accToken) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
