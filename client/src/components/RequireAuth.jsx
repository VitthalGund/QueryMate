import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/Auth/userContext';

const RequireAuth = ({ allowedRoles }) => {
    const { auth, userData } = useContext(UserContext);
    const location = useLocation();
    // console.log(auth?.roles == allowedRoles)
    return (
        <>
            {auth?.roles?.find(role => allowedRoles?.includes(role))
                ? <Outlet />
                : userData?.username
                    ? <Navigate to="/loginwithgoogle" state={{ from: location }} replace />
                    : <Navigate to="/login" state={{ from: location }} replace />
            }
        </>
    )
}

export default RequireAuth