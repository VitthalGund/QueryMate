import FeaturesItem from "./FeaturesItem";

export const Feature = () => {

    return (
        <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col mb-6 lg:flex-row md:mb-10">
                <div className="lg:w-1/2">
                    <h2 className="max-w-md mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none xl:max-w-lg">
                        To redefine the way people interact with data
                    </h2>
                </div>
                <div className="lg:w-1/2">
                    <p className="text-base text-gray-700 md:text-lg">
                        In the realm where data whispers, QueryMate stands tall,
                        A gateway to mastery, hear its wise call.
                        Speak to it gently, in language so clear,
                        See insights bloom, dispelling all fear.

                        Collaborate seamlessly, as teams unite,
                        Redefined interaction, a data journey so bright.
                        To redefine data&apos;s dance, it takes but a query,
                        QueryMate, your guide to a realm so visionary.
                    </p>
                </div>
            </div>
            <section className="flex items-center justify-center bg-gray-100lg:h-screen">
                <div className="px-4 py-14 mx-auto max-w-7xl">
                    <div className="max-w-xl mx-auto">
                        <div className="text-center ">
                            <div className="relative flex flex-col items-center">
                                <div
                                    className="absolute hidden md:block -top-14 left-0 text-[120px] text-gray-700 font-bold opacity-10">
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
                            <p className="mb-10 text-base text-center text-gray-500">
                                Unlock the Power of Your Data with QueryMate - Your Gateway to Effortless Data Mastery

                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesItem />
        </div >
    );
};