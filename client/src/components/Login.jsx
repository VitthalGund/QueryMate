import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/Auth/userContext';
import axios from '../api/axios';
import { toast } from 'react-toastify';


const LOG_IN_URL = "/auth";
export default function LogIn() {
    const { auth, setAuth, persist, setPersist, setUserData } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked] = useState(true);
    const [localperist, setLocalPersist] = useState(persist == "true" ? true : false);
    const [success, setSuccess] = useState();
    const navigate = useNavigate();

    const togglePersist = () => {
        setLocalPersist((prev) => !prev);
    };


    useEffect(() => {
        setPersist(JSON.stringify(localperist))
    }, [localperist, setPersist]);

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        // console.log({
        //     email, password
        // })
        try {
            const response = await toast.promise(axios.post(LOG_IN_URL,
                { email, password },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            ), {
                pending: 'validating your credentials',
                success: 'Login Successfully👌',
            });
            // console.log(response?.data)
            const accessToken = response?.data?.authToken;
            const roles = response?.data?.roles;
            setAuth({ email, roles, accessToken });
            setEmail("");
            setUserData({ email, username: response.data.username })
            setPassword("");
            setSuccess(true);
            setPersist(JSON.stringify(isChecked));
            navigate("/")
        } catch (error) {
            if (!error?.response) {
                toast.error("No Server Response")
            } else if (error.response?.status === 400) {
                toast.error('Invalid Email id or Password');
            } else if (error.response?.status === 401) {
                toast.error('Unauthorize');
            } else {
                toast.error('Login Failed');
            }
        }
    }

    useEffect(() => {
        if (auth) {
            console.log("object")
            navigate("/");
        }
    }, [auth, navigate])
    return (
        <>{
            success ?
                <div></div> :
                <>
                    <div className="font-serif  bg-slate-50">
                        <Link to="/loginwithgoogle" className="ml-4 text-3xl">←</Link>
                    </div>
                    <div className="flex justify-center items-center flex-col h-[90vh] bg-slate-50">
                        <div className="ml-0 mr-0 ">
                            <p className="text-2xl font-bold mb-3">LOG IN</p>
                        </div>
                        <form onSubmit={handleOnSubmit}
                            className="flex flex-col justify-center items-center font-serif bg-slate-50 p-4 rounded-lg">
                            <div className="relative bg-inherit mt-3 mb-5">
                                <input type="email"
                                    id="email" name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder='Email'
                                    className="peer bg-transparent h-10 w-72 rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                                />
                                <label htmlFor="email"
                                    className="absolute cursor-text left-0 -top-3 text-lg text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                                >Email</label>
                            </div>
                            <div className="relative bg-inherit mt-3 mb-5">
                                <input type="password" id="password" name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="password"
                                    required
                                    autoComplete='current-password'
                                    minLength={2}
                                    className="peer bg-transparent h-10 w-72 rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                                />
                                <label htmlFor="password"
                                    className="absolute cursor-text left-0 -top-3 text-lg text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                                >Password</label>
                            </div>
                            <label htmlFor="showPassword" className="mb-4">
                                <input
                                    type="checkbox"
                                    id="persist"
                                    name="persist"
                                    checked={localperist}
                                    onChange={() => togglePersist()}
                                    className='mr-1'
                                /> Remember Me</label>
                            <Link to="/resetpassword" className="text-sm font-bold text-blue-600 hover:text-blue-700 pb-2">RESET PASSWORD</Link>
                            <div>
                                <button className="sm:w-64 w-56 pl-7 pr-7 pt-2 pb-2  font-medium text-xl bg-blue-600 text-white rounded-md hover:bg-blue-700">Log in</button>
                            </div>
                        </form>

                    </div>
                </>
        }
        </>
    )
}
