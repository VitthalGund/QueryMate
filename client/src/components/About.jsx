import OfferSection from "./OfferSection";
import OurTeam from "./OurTeam";
import aboutImg from "../../public/aboutPageFront.jpeg"
import mission from "../../public/mission.jpeg"
import vision from "../../public/vision.jpeg"
import motivation from "../../public/motivation.jpg"
import Journey from "../../public/Journey.jpeg"
import Goal from "../../public/Goal.jpeg"

export default function About() {
    return (
        <>
            <section className="flex items-center py-10 bg-stone-100 xl:h-screen font-poppins">
                <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
                    <div className="flex flex-wrap ">
                        <div className="w-full px-9 mb-10 lg:w-1/2 lg:mb-0">
                            <div className="relative">
                                <img src={aboutImg} alt=""
                                    className="relative z-30 object-cover w-full h-96 lg:rounded-tr-[80px] lg:rounded-bl-[80px] rounded mr-16" />
                                <div
                                    className="absolute z-10 hidden w-full h-full bg-blue-400 rounded-bl-[80px] rounded -bottom-6 right-6 lg:block">
                                </div>
                                <div
                                    className="absolute z-40 text-blue-400 transform -translate-y-1/2 cursor-pointer top-1/2 left-[46%] hover:text-blue-500">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        className="w-14 h-14 bi bi-play-circle-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z">
                                        </path>
                                    </svg> */}
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
                            <div className="relative">
                                <h1
                                    className="absolute -top-20   left-0 text-[20px] lg:text-[100px] text-gray-900 font-bold opacity-10 md:block hidden">
                                    About Us
                                </h1>
                                <h1 className="pl-2 text-3xl font-bold border-l-8 border-blue-400 md:text-5xl ">
                                    Welcome to QueryMate
                                </h1>
                            </div>
                            <p className="mt-6 mb-10 text-base leading-7 text-gray-800 m-8">
                                Welcome to QueryMate, where innovation meets the data-driven future. We&apos;re not just a platform; we&apos;re a catalyst for change in how we interact with and extract value from the vast sea of data in our digital world.
                                QUERYMATE, an innovative Question and Answering (QA) System, transforms data access and comprehension.
                                Powered by AI and a custom dataset, our mission is to simplify information retrieval in the face of data abundance.
                                Acting as a friendly guide, QUERYMATE explains complex concepts effortlessly, making it a valuable companion for learners.
                                Its unique focus on precise information retrieval positions it as a key tool in education, research, and professional domains.
                                {/* Developed by students from the Computer Engineering Department of Government Polytechnic Mumbai, QUERYMATE addresses the
                                challenges of self-study by providing exact answers from diverse sources, including reference books, audio, and video files.
                                Join us on a journey to redefine data interaction with QueryMate, your gateway to effortless information mastery. */}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="flex flex-col items-center justify-center bg-white md:flex-row-reverse">
                <div className="sm:w-1/2 md:w-1/1 p-16 flex flex-col justify-between items-center">
                    {/* <div className="image object-left"> */}
                    <img
                        className="w-96 rounded-3xl justify-self-center"
                        src={motivation}
                    />
                    {/* </div> */}
                </div>
                <div className="sm:w-1/2 p-20">
                    <div className="text">
                        <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">Driven by a Shared Vision</span>
                        <h2 className="my-4 font-bold text-3xl sm:text-4xl ">The Motivation Behind <span className="text-indigo-600">QueryMate</span>
                        </h2>
                        <p className="text-gray-700">
                            In a world saturated with information, finding clear answers can be overwhelming.
                            QueryMate emerges from the shared frustration of navigating this data deluge, offering a revolutionary solution.
                            It is our fervent response, fueled by a passion to simplify information retrieval.
                            Our motivation is rooted in ensuring users effortlessly access precise insights, transforming the way we engage with and extract knowledge from the vast digital landscape.
                            Join us on this transformative journey with QueryMate – your ally in conquering the data-driven world.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center bg-white md:flex-row">
                <div className="sm:w-1/2 md:w-1/1 p-16 flex flex-col justify-between items-center">
                    {/* <div className="image object-left"> */}
                    <img
                        className="w-80 rounded-3xl justify-self-center"
                        src={vision}
                    />
                    {/* </div> */}
                </div>
                <div className="sm:w-1/2 p-20">
                    <div className="text">
                        <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">Envisioning a Future of Seamless Data Mastery</span>
                        <h2 className="my-4 font-bold text-3xl sm:text-4xl ">Our Vision at <span className="text-indigo-600">QueryMate</span>
                        </h2>
                        <p className="text-gray-700">
                            QueryMate envisions a future where individuals and businesses can effortlessly derive valuable insights from any type of data,
                            regardless of its format. The platform aspires to be a leading force in democratizing data analysis,
                            providing users with the tools they need to harness the power of their information. The overarching vision is to contribute to
                            a data-driven world where informed decision-making becomes the norm, driving innovation and positive change.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-white md:flex-row-reverse">
                <div className="sm:w-1/2 md:w-1/1 p-16 flex flex-col justify-between items-center">
                    {/* <div className="image object-left"> */}
                    <img
                        className="w-80 rounded-3xl justify-self-center"
                        src={mission}
                    />
                    {/* </div> */}
                </div>
                <div className="sm:w-1/2 p-20">
                    <div className="text">
                        <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">Empowering the Future</span>
                        <h2 className="my-4 font-bold text-3xl sm:text-4xl ">Our Mission at <span className="text-indigo-600">QueryMate</span>
                        </h2>
                        <p className="text-gray-700">
                            The mission of QueryMate is to empower individuals and businesses by unlocking the true potential of their data.
                            In the digital age, where data is abundant and diverse, QueryMate aims to simplify the complex process of data analysis,
                            making it accessible and efficient. The goal is to contribute to a future where extracting meaningful insights from any type of data becomes effortless.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-white md:flex-row">
                <div className="sm:w-1/2 md:w-1/1 p-16 flex flex-col justify-between items-center">
                    {/* <div className="image object-left"> */}
                    <img
                        className="w-80 rounded-3xl justify-self-center"
                        src={Journey}
                    />
                    {/* </div> */}
                </div>
                <div className="sm:w-1/2 p-20">
                    <div className="text">
                        <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">Embark on </span>
                        <h2 className="my-4 font-bold text-3xl sm:text-4xl ">Our Journey at <span className="text-indigo-600">QueryMate</span>
                        </h2>
                        <p className="text-gray-700">
                            Experience the evolution of data interaction as we take you on a transformative journey with QueryMate.
                            From the frustration of information overload to the passion for simplifying retrieval,
                            our story is one of innovation and determination. Join us as we redefine how you interact with data,
                            offering a revolutionary solution crafted by QueryMate.
                            Our journey is fueled by a shared vision to make information accessible and precise,
                            revolutionizing your digital experience. With QueryMate, it&apos;s more than a platform; it&apos;s your gateway to effortless data mastery.
                            Come, be a part of our inspiring journey and reimagine the possibilities with QueryMate.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-white md:flex-row-reverse">
                <div className="sm:w-1/2 md:w-1/1 p-16 flex flex-col justify-between items-center">
                    {/* <div className="image object-left"> */}
                    <img
                        className="w-80 rounded-3xl justify-self-center"
                        src={Goal}
                    />
                    {/* </div> */}
                </div>
                <div className="sm:w-1/2 p-20">
                    <div className="text">
                        <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">Embarking on Achievements</span>
                        <h2 className="my-4 font-bold text-3xl sm:text-4xl ">Our Goals with <span className="text-indigo-600">QueryMate</span>
                        </h2>
                        <p className="text-gray-700">
                            Our goals with QueryMate are not just milestones; they&apos;re transformative ambitions that shape the future of data interaction.
                            As we embark on this ambitious journey, we aim to revolutionize information retrieval, simplify complex data analysis,
                            and democratize access to insights. Fueled by the passion to redefine how users engage with data,
                            our goals reflect a commitment to making knowledge accessible, precise, and effortless.
                            Join us on this expedition as we pursue milestones that transcend boundaries,
                            setting QueryMate apart as your key to conquering the data-driven world. With every achievement,
                            we strive to make your digital experience with QueryMate unparalleled and extraordinary.
                            Welcome to a future where goals become realities with QueryMate by your side.
                        </p>
                    </div>
                </div>
            </div>
            <OfferSection />
            <OurTeam />

        </>
    )
}