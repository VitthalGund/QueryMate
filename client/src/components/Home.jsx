import { Typewriter, Cursor } from 'react-simple-typewriter';
import { useNavigate } from "react-router-dom";
import UserContext from '../context/Auth/userContext';
import { useContext } from 'react';
// import useAuth from '../hooks/useAuth';
const Home = () => {
  const navigate = useNavigate();
  const { auth } = useContext(UserContext);
  const handleOnclick = () => {
    if (auth.accessToken) {
      console.log(auth.accessToken)
      navigate("/chat")
    } else {
      navigate('/loginwithgoogle');
    }
  }
  return (
    <>
      <div className="flex justify-around items-center flex-wrap">

        {/* Left */}
        <section className="flex justify-center align-top ml-8 flex-col">
          <p className="font-bold text-4xl py-2">WELCOME TO <span className="text-purple-700 ">QUERYMATE</span></p>
          <p className="font-semibold text-4xl py-2">Querymate Processes on <span className='font-semibold text-2xl py-2 text-purple-700'>
            <Typewriter
              words={['Textual Data', 'Any File', "PDF's", "DOC's", "Image's", "PPT's", "Audio's", "Video's"]}
              loop={Infinity}
              // cursor
              // cursorStyle='_'
              typeSpeed={50}
              deleteSpeed={10}
              delaySpeed={1000}
            />
          </span>
            <span className="text-purple-700"><Cursor /></span>
          </p>
          <p className="font-medium text-2xl py-2">Your helping hand to instantly answer Questions with AI</p>
          <button className="sm:w-64 w-56 px-2 py-2 mt-2 font-medium text-xl bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={handleOnclick}>LET&apos;s GET STARTED</button>
        </section>
        {/* Right */}
        <section className="">
          <img
            src="./public/Webimg.png"
            alt="Workplace"
            className="h-80"
          />
        </section>
      </div>
      <div className="px-9">
        <p className="text-3xl font-bold">Features of QUERYMATE: </p>
        <ul className="px-1 py-4 text-xl font-medium">
          <li className="py-2">Find the answer from lengthy paragraphs.</li>
          <li className="py-2">Students can use it to find answers from their reference books.</li>
          <li className="py-2">General users can save time by just doing a simple copy-paste and getting their query resolved.</li>
          <li className="py-2">We can create an interface where users can add data sources from PDFs, Blog Articles, and Audio Files, etc. And then ask users to type their queries or ask questions. </li>
        </ul>

      </div>
    </>
  )
}
export default Home;