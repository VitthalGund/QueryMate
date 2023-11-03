import { useEffect, useState } from "react";
import UserContext from "./userContext";
const SetData = (props) => {
    const [userData, setUserData] = useState({ username: '', email: '' });
    const [auth, setAuth] = useState("");
    const [rmail, setRmail] = useState();
    const [persist, setPersist] = useState(localStorage.getItem("persist"));
    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])
    return (
        <UserContext.Provider value={{ userData, setUserData, auth, setAuth, rmail, setRmail, setPersist, persist }}>
            {props.children}
        </UserContext.Provider>
    )
}
export default SetData;