import { Link } from 'react-router-dom';
import UserContext from '../context/Auth/userContext';
import { useContext } from 'react';
import axios from '../api/axios';

const NavBar = () => {
  // const [nav, setNav] = useState(false);
  const { auth, setAuth, setUserData } = useContext(UserContext);
  // const handleNav = () => {
  //   setNav(!nav);
  // };

  return (
    <div className='flex justify-between items-center h-24 w-full mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-[black]'>QueryMate</h1>
      <ul className='hidden md:flex text-black'>
        <li><Link to='/' className='p-4 '>Home</Link></li>
        <li><Link to='/about' className='p-4'>About</Link></li>
        {!auth ? <>
          <li><Link to='/loginwithgoogle' className='p-4'>Login</Link></li>
          <li><Link to='/signupmail' className='p-4'>Signup</Link></li>
        </> :
          <li><Link onClick={async () => {
            if ((await axios.get("/logout", {
              headers: {
                Authorization: auth.accessToken
              }
            })).status === 204) {
              alert("Logout SuccessFully")
              setAuth("");
              setUserData("")
            }
          }} className='p-4'>Logout</Link></li>
        }
      </ul>

    </div>
  );
};

export default NavBar;