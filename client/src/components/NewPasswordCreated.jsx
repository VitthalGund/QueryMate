import { AiFillLock } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
function NewPasswordCreated() {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate('/login');
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <AiFillLock size={200} />
        <p className="font-extrabold text-3xl py-3">NEW PASSWORD CREATED</p>
        <p className="font-semibold text-2xl py-3">You may now login with your new password.</p>
        <button className="sm:w-64 w-56 px-1 mt-2 font-medium text-xl bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={handleOnClick}>LOG IN</button>
      </div>

    </>
  )
}

export default NewPasswordCreated;
