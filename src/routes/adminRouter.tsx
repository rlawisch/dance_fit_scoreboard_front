import { usePlayer } from "../providers/Players";
import { Navigate } from "react-router-dom";

interface IAdminRouter {
  children: JSX.Element;
}

const AdminRouter = ({ children }: IAdminRouter) => {
  const { decodedPlayerInfo } = usePlayer();

  if (decodedPlayerInfo.role === "admin" ) {
    return children;
  }
  return <Navigate to="/dashboard" />;
};

export default AdminRouter;