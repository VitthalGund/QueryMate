import { useEffect, useState } from "react";
import UserContext from "./userContext";
const SetData = (props) => {
    const [userData, setUserData] = useState({ username: null, email: null });
    const [auth, setAuth] = useState("");
    const [rmail, setRmail] = useState();
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || "false");
    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist));
    }, [persist])
    return (
        <UserContext.Provider value={{ userData, setUserData, auth, setAuth, rmail, setRmail, setPersist, persist }}>
            {props.children}
        </UserContext.Provider>
    )
}
export default SetData;