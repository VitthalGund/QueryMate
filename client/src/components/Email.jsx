import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/Auth/userContext';

function Email() {
    const { userData, setUserData } = useContext(UserContext);
    const [email, setEmail] = useState(userData.email);

    const navigate = useNavigate();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setUserData({ ...userData, email });
        navigate('/notify');
    }
    return (
        <>
            <header className="text-lg pl-2 font-medium z-10 text-blue-700 hover:text-blue-900 font-serif">
                <div className="font-serif mt-3 z-20">
                    <Link to="/loginwithgoogle" className="ml-4 z-20 text-3xl">←</Link>
                </div>
            </header>
            <form onSubmit={handleOnSubmit}
                className="flex flex-col justify-center items-center font-serif bg-white p-4 rounded-lg">
                <div className="mt-10 mb-5 pl-0 pr-0 pt-2 pb-2">
                    <p className="text-3xl font-semibold">Hello, User!</p>
                </div>
                <div className="grid self-center mb-2">
                    <p className="text-xl text-start">Hey tell Me Your?</p>
                </div>

                <div className="relative bg-inherit">
                    <input type="email" id="username" name="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='Email'
                        className="peer bg-transparent h-10 w-72 rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                    />
                    <label htmlFor="username"
                        className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                    >Email</label>
                </div>
                <button
                    className="w-max h-14 pl-10 pr-10 pt-2 pb-2 font-medium text-xl bg-blue-600 text-white rounded-md hover:bg-blue-800 mt-5"
                >CONTINUE</button>
            </form>
        </>
    )
}

export default Email;