import { useContext } from 'react'
import { HiOutlineMailOpen } from 'react-icons/hi';
import UserContext from '../context/Auth/userContext';
import { useNavigate } from 'react-router-dom';
export default function ResetPassword() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/create-new-password');
  }
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <HiOutlineMailOpen size={200} />
        <p className="font-medium text-3xl text-center">Check Your Inbox</p>
        <p className="font-normal text-lg text-center">We&apos;ll send You a link to{" "}
          <span className='text-blue-700 hover:underline cursor-pointer'>{userData.email}</span>
          {" "}to reset your password & create new one.</p>
        <button className="sm:w-64 w-56 pl-[2px] pr-[2px] mt-2 font-medium text-xl bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={handleOnClick}>GOT IT</button>
      </div>
    </>
  )
}
