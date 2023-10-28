import { useContext, useDebugValue } from "react";
import UserContext from "../context/Auth/userContext";

const useAuth = () => {
    const { auth } = useContext(UserContext);
    useDebugValue(auth, auth => auth?.username ? "Logged In" : "Logged Out")
    return useContext(UserContext);
}

export default useAuth;