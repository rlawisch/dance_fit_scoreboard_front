import { Navigate } from "react-router-dom"
import { usePlayer } from "../providers/Players"

interface IAdminRouterProps {
    children: JSX.Element;
}

const AdminRouter = ({ children }: IAdminRouterProps) => {
    const { isAdmin } = usePlayer()

    if (isAdmin()) {
        return children;  
    } else {
        return <Navigate to="/udashboard/home"/>
    }
}

export default AdminRouter;