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
      // console.log(auth.accessToken)
      navigate("/chat")
    } else {
      console.log("object")
      navigate('/loginwithgoogle');
    }
  }
  return (
    <>
      <section className="bg-gray-50 home">
        <div
          className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center"
        >
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-2xl font-extrabold sm:text-5xl">
              For Quick, Easy, Rapid and Precise Response,
              use <strong className="font-extrabold text-indigo-700 sm:block">
                QueryMate
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              QueryMate is an AI-powered application capable of understanding questions posed in natural language and extracting precise answers from a given <span className='font-semi sm:text-sm md:text-lg lg:text-1xl py-2 text-indigo-600 font-bold'>
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