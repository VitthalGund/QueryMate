import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
            auth?.username
                ? <Navigate to="/login" state={{ from: location }} replace />
                : <Navigate to="/loginwithgoogle" state={{ from: location }} replace />
    );
}

export default RequireAuth;