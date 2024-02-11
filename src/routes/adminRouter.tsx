import { JwtPayload, jwtDecode } from "jwt-decode";
import { usePlayer } from "../providers/Players";
import { Navigate } from "react-router-dom";

interface IAdminRouter {
  children: JSX.Element;
}

const AdminRouter = ({ children }: IAdminRouter) => {
  const { accToken } = usePlayer();

  if (accToken) {

    const decoded: JwtPayload = jwtDecode(accToken);
    
    if (decoded.role === "admin") {
      return children;
    }
  
  } else {
    
    return <Navigate to="/dashboard/home" />;
  }

};

export default AdminRouter;
