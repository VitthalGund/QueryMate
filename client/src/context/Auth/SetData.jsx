import { useState } from "react";
import UserContext from "./userContext";
const SetData =(props)=>{
    const [userData , setUserData]=useState({username:'',email:''});
    const [auth , setAuth]= useState("");
    const [rmail , setRmail]=useState();
    return(
        <UserContext.Provider value={{userData, setUserData, auth, setAuth, rmail, setRmail}}>
            {props.children}
        </UserContext.Provider>
    )
}
export default SetData;