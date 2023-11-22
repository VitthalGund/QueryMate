import FeaturesItem from "./FeaturesItem"

const OfferSection = () => {
    return (
        <>
            <section className="flex items-center justify-center bg-gray-100lg:h-screen">
                <div className="px-4 py-20 mx-auto max-w-7xl">
                    <div className="max-w-xl mx-auto">
                        <div className="text-center ">
                            <div className="relative flex flex-col items-center">
                                <div
                                    className="absolute hidden md:block -top-14 left-0 text-[120px] text-gray-400 font-bold opacity-10">
                                    FEATURES
                                </div>
                                <h1 className="text-5xl font-bold text-black">What <span className="text-blue-300">we</span><span className="text-blue-500"> Offer
                                </span> </h1>
                                <div className="flex w-24 mt-1 mb-10 overflow-hidden rounded">
                                    <div className="flex-1 h-2 bg-blue-200">
                                    </div>
                                    <div className="flex-1 h-2 bg-blue-400">
                                    </div>
                                    <div className="flex-1 h-2 bg-blue-600">
                                    </div>
                                </div>
                            </div>
                            <p className="mb-16 text-base text-center text-gray-500">
                                Unlock the Power of Your Data with QueryMate - Your Gateway to Effortless Data Mastery

                            </p>
                        </div>
                    </div>
                    <FeaturesItem />
                </div>
            </section>
        </>
    )
}

export default OfferSection
