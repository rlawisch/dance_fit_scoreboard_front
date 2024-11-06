import { Navigate } from "react-router-dom"
import { usePlayer } from "../providers/Players"

interface IPrivateRouterProps {
    children: JSX.Element;
}

const PrivateRouter = ({ children }: IPrivateRouterProps) => {
    const { isLoggedIn } = usePlayer()

    if (isLoggedIn()) {
        return children;  
    } else {
        return <Navigate to="/login"/>
    }
}

export default PrivateRouter;