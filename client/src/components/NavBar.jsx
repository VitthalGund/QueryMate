import { Link } from 'react-router-dom';

const NavBar = () => {
  // const [nav, setNav] = useState(false);

  // const handleNav = () => {
  //   setNav(!nav);
  // };

  return (
    <div className='flex justify-between items-center h-24 w-full mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-[black]'>QueryMate</h1>
      <ul className='hidden md:flex text-black'>
        <li><Link to='/' className='p-4'>Home</Link></li>
        <li><Link to='/about' className='p-4'>About</Link></li>
        <li><Link to='/loginwithgoogle' className='p-4'>Login</Link></li>
        <li><Link to='/signupmail' className='p-4'>Signup</Link></li>
      </ul>

    </div>
  );
};

export default NavBar;