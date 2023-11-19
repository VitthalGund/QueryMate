import { Typewriter } from 'react-simple-typewriter';
import { Link, useNavigate } from "react-router-dom";
import UserContext from '../context/Auth/userContext';
import { useContext } from 'react';
import "../assets/background.css"
import { Feature } from './Features';
import OurTeam from './OurTeam';
// import useAuth from '../hooks/useAuth';
const Home = () => {
  const navigate = useNavigate();
  const { auth } = useContext(UserContext);
  const handleOnclick = () => {
    if (auth.accessToken) {
      console.log(auth.accessToken)
      navigate("/chat")
    } else {
      console.log("object")
      navigate('/loginwithgoogle');
    }
  }
  return (
    <>
      {/* <div className="flex justify-around items-center flex-wrap">
        <div className="min-h-screen flex justify-center items-center">
          <section className="flex justify-center ml-8 flex-col text-center">
            <p className="font-bold text-4xl py-2">WELCOME TO <span className="text-indigo-600 ">QUERYMATE</span></p>
            <p className="font-semibold text-4xl py-2">Querymate Processes on <span className='font-semibold text-2xl py-2 text-indigo-600'>
              <Typewriter
                words={['Text', 'File like', "PDF's", "DOC's", "Image's", "PPT's", "Audio's", "Video's"]}
                loop={Infinity}
                // cursor
                // cursorStyle='_'
                typeSpeed={50}
                deleteSpeed={10}
                delaySpeed={1000}
              />
            </span>
              <span className="text-indigo-600"><Cursor /></span>
            </p>
            <p className="font-medium text-lg text-center py-2">Your helping hand to instantly answer Questions with AI</p>
            <button className="sm:w-64 justify-center w-56 px-2 py-2 mt-2 font-medium text-xl bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={handleOnclick}>LET&apos;s GET STARTED</button>
          </section>

          <section className="">
            <img
              src="./public/Webimg.png"
              alt="Workplace"
              className="h-80"
            />
          </section>
        </div>
      </div> */}
      <section className="bg-gray-50 home">
        <div
          className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center"
        >
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-2xl font-extrabold sm:text-5xl">
              For Quick, Easy, Rapid and Precise Response,
              <strong className="font-extrabold text-blue-700 sm:block">
                Use QueryMate
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              QueryMate is an AI-powered application capable of understanding questions posed in natural language and extracting precise answers from a given <span className='font-semibold text-xl py-2 text-indigo-600'>
                <Typewriter
                  words={['Text', 'Files', "PDFs", "DOCS", "Images", "PPTs", "Audio", "Video", "Online articles, ", "blogs"]}
                  loop={Infinity}
                  cursorStyle='_'
                  typeSpeed={50}
                  deleteSpeed={10}
                  delaySpeed={1000}
                />
              </span>
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                className="block w-full rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring active:bg-indigo-500 sm:w-auto"
                onClick={handleOnclick}
              >
                Get Started
              </button>

              <Link
                className="block w-full rounded px-12 py-3 text-sm font-medium text-indigo-600 shadow hover:text-indigo-700 focus:outline-none focus:ring active:text-indigo-500 sm:w-auto bg-white"
                to="/about"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="text-gray-700 body-font border-t border-gray-200 container px-5 py-10 mx-auto">
        {/* <div className="flex flex-col text-center w-full">
          <h1 className="sm:text-3xl text-4xl title-font mb-4 text-indigo-600 font-bold">Features</h1>
        </div> */}
        <Feature />
      </section>
      <OurTeam />
    </>
  )
}
export default Home;