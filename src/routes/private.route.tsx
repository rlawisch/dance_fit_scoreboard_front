import { FC } from "react";
import { usePlayer } from "../providers/Players";
import { Navigate } from "react-router-dom";

interface IPrivateRoute {
  component: React.FC;
}

const PrivateRoute: FC<IPrivateRoute> = ({ component: Component }) => {
  const { accToken } = usePlayer();

  if (!!accToken) {
    return <Component />;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
