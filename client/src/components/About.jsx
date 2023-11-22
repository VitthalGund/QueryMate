import OfferSection from "./OfferSection";
import OurTeam from "./OurTeam";
import aboutImg from "../../public/QueryMate_logo.png"

export default function About() {
    return (
        <>
            <div className="flex items-center bg-gray-100 sm:flex-row">
                <div className="sm:w-1/2 p-10 flex justify-center items-center">
                    <div className="image object-center text-center">
                        <img src={aboutImg} className="w-52" />
                    </div>
                </div>
                <div className="sm:w-1/2 p-5">
                    <div className="text">
                        <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">About us</span>
                        <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">About <span className="text-indigo-600">QueryMate</span>
                        </h2>
                        <p className="text-gray-700">
                            Welcome to QueryMate, where innovation meets the data-driven future. We&apos;re not just a platform; we&apos;re a catalyst for change in how we interact with and extract value from the vast sea of data in our digital world.

                        </p>
                    </div>
                </div>
            </div>
            <div className="flex  flex-row-reverse items-center bg-white">
                <div className="sm:w-1/2 p-5">
                    <div className="image object-center text-center">
                        <img src={aboutImg} />
                    </div>
                </div>
                <div className="sm:w-1/2 p-16">
                    <div className="text">
                        <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">About us</span>
                        <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">About <span className="text-indigo-600">QueryMate</span>
                        </h2>
                        <p className="text-gray-700">
                            Welcome to QueryMate, where innovation meets the data-driven future. We&apos;re not just a platform; we&apos;re a catalyst for change in how we interact with and extract value from the vast sea of data in our digital world.

                        </p>
                    </div>
                </div>
            </div>

            <OfferSection />
            <OurTeam />

        </>
    )
}