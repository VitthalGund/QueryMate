import { Typewriter } from 'react-simple-typewriter';
import { Link, useNavigate } from "react-router-dom";
import UserContext from '../context/Auth/userContext';
import { useContext } from 'react';
import { StudentInfo } from './StudentInfo';
import { Feature } from './Features';
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
      <section className="bg-gray-50">
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

            <p className="mt-4 sm:text-xl/relaxed ">
              QueryMate is an AI-powered application capable of understanding questions posed in natural language and extracting precise answers from a given <span className='font-semibold text-xl py-2 text-indigo-600'>
                <Typewriter
                  words={['Text', 'Files', "PDF's", "DOC's", "Image's", "PPT's", "Audio's", "Video's", "online articles", "blogs"]}
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
                className="block w-full rounded px-12 py-3 text-sm font-medium text-indigo-600 shadow hover:text-indigo-700 focus:outline-none focus:ring active:text-indigo-500 sm:w-auto"
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
      <section className="text-gray-700 body-font border-t border-gray-200 bg-gray-50">
        <div className="container px-5 py-20 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-indigo-600">Our Team</h1>
            {/* <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven&apos;t heard of them.</p> */}
          </div>
          <div className="flex flex-wrap -m-2 items-center justify-center">
            <StudentInfo imgLink="https://avatars.githubusercontent.com/u/97181033?v=4" name='Vitthal Gund' role='Full Stack Developer' github='https://github.com/VitthalGund' linkedin='https://in.linkedin.com/in/vitthal-gund' />
            <StudentInfo
              imgLink="https://avatars.githubusercontent.com/u/127607339?v=4"
              name='Sarvesh Yadav'
              role='UI/UX Designer and Content Writer'
              github='https://github.com/sarveshpyadav'
              linkedin='https://in.linkedin.com/in/sarveshpyadav'
            />
            <StudentInfo
              imgLink="https://avatars.githubusercontent.com/u/142326621?v=4"
              name='Justin Fernandes'
              role='Frontend Developer'
              github='https://github.com/sarveshpyadav'
              linkedin='https://in.linkedin.com/in/sarveshpyadav'
            />
            <StudentInfo
              imgLink="https://avatars.githubusercontent.com/u/146202519?v=4"
              name='Ramkrushna Sahu'
              role='...'
              github='https://github.com/sarveshpyadav'
              linkedin='https://in.linkedin.com/in/sarveshpyadav'
            />
          </div>
        </div>
      </section>
    </>
  )
}
export default Home;