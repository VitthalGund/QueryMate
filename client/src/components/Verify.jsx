import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export const Verify = () => {

    const [token, setToken] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken ?? "");
        console.log(urlToken)
    }, [])
    const handleVerify = async () => {
        try {
            const res = await toast.promise(axios.post("/register/verify", { token }), {
                success: "Account verification process completed!",
                pending: "validating token!"
            });
            if (res.data.success) {
                navigate("/");
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    return (
        <div className="flex item-center justify-center ">
            <button
                onClick={handleVerify}
                className="w-max h-14 pl-10 pr-10 pt-2 pb-2 font-medium text-xl bg-blue-600 text-white rounded-md hover:bg-blue-800 mt-5"
            >Verify Account!</button>
        </div>
    )
}

export default Verify
