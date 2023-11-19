import { Link } from "react-router-dom"

const FeaturesItem = ({ title, description, points, svg }) => {
    return (
        <>
            <div className="border-3 w-auto flex flex-wrap flex-col">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
                    {svg}
                </div>
                <h6 className="mb-2 font-semibold leading-5">{title}</h6>
                <p className="mb-3 text-sm text-gray-900">
                    {description}
                </p>
                <ul className="mb-4 -ml-1 space-y-2">
                    {points.map((item) => {
                        return (
                            <li className="flex items-start" key={title}>
                                <span className="mr-1">
                                    <svg
                                        className="w-5 h-5 mt-px text-deep-purple-accent-400 text-indigo-500"
                                        stroke="currentColor"
                                        viewBox="0 0 52 52"
                                    >
                                        <polygon
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            fill="none"
                                            points="29 13 14 29 25 29 23 39 38 23 27 23"
                                        />
                                    </svg>
                                </span>
                                {item}
                            </li>)
                    })
                    }

                </ul>
                <Link
                    to="/about"
                    className="flex items-start font-semibold transition-colors duration-200 p-3  text-indigo-400 hover:text-indigo-800"
                >
                    Learn more
                </Link>
            </div>
        </>
    )
}

export default FeaturesItem
