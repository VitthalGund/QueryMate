
const FeaturesItem = () => {
    const features = [
        {
            title: "Natural Language Magic",
            description: "Understand Without Hassle, QueryMate speaks your language.No more decoding complex queries.Just ask naturally, and get clear and consistent responses every time.",
            points: [
                "Easy Communication: Talk to QueryMate like you would a friend.",
                "Contextual Genius: Understands the subtleties of your questions.",
                "Uniform Clarity: Always delivers clear and consistent answers.",
                "User-Friendly Wizardry: More than AI, it&apos;s language magic for your data."
            ],
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-stars-lg text-indigo-500" viewBox="0 0 16 16">
                <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
            </svg>
        },
        {
            title: "Data in Any Flavor",
            description: "Data Transformed, Your Way Whether it's text, audio, video, or images, QueryMate transforms raw data into meaningful insights. It's your versatile companion for extracting valuable information",
            points: [
                "Multiverse Processing: Handles diverse data formats with ease.",
                "Insight Alchemist: Turns raw data into actionable insights.",
                "Format Freedom: Data From images and videos, we've got your data covered.",
                "Versatile Insight: Extract valuable information across a spectrum of data types."],
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-files text-indigo-500" viewBox="0 0 16 16">
                <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
            </svg>
        },
        {
            title: "Analysis for Everyone",
            description: "Data Brilliance Unleashed, Democratize data analysis! QueryMate simplifies the process, making it accessible to everyone, regardless of industry or background.",
            points: [
                "Accessible Analytics: Democratizes the world of data analysis.",
                "Simplified Complexity: Breaks down intricate data analysis tasks.",
                "Industry Impact: Your go-to resource, no matter your field.",
                "Future-Ready Insights: Contribute to a data-driven world; the future is now."],
            svg: <svg
                className="w-7 h-7 text-deep-purple-accent-400 text-indigo-500"
                strokeLinecap="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path
                    d="M8.291,18.709,4.182,22.818c-.419.419-1.43.086-2.258-.742s-1.161-1.839-.742-2.258l4.11-4.11"
                    fill="none"
                    stroke="currentColor"
                />
                <ellipse
                    cx="19.078"
                    cy="4.922"
                    fill="none"
                    rx="2.5"
                    ry="4.95"
                    stroke="currentColor"
                    transform="translate(2.107 14.932) rotate(-45)"
                />
                <path
                    d="M9.185,9.815,5.3,13.7c-.7.7-.143,2.382,1.238,3.762S9.6,19.4,10.3,18.7l3.885-3.885"
                    fill="none"
                    stroke="currentColor"
                />
                <path
                    d="M15.578,1.422,9.422,7.578c-.976.976-.2,3.335,1.732,5.268s4.292,2.708,5.268,1.732l6.156-6.156"
                    fill="none"
                    stroke="currentColor"
                />
            </svg>
        },
        {
            title: "Your Data's Best Friend",
            description: "Custom Smartness, Tailored for You: QueryMate's brilliance is tailored to your data. Trained on custom datasets, it grasps context and delivers accurate responses that align with your unique needs.",
            points: [
                "Customized Brilliance: Trained on datasets tailored for your unique needs.",
                "Contextual Precision: Grasps the context, providing accurate responses.",
                "Precision Training: Models trained for accuracy and intelligence.",
                "Enhanced Understanding: Your data's best friend, always one step ahead."
            ],
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-database-check text-indigo-500" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514Z" />
                <path d="M12.096 6.223A4.92 4.92 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.493 4.493 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.525 4.525 0 0 1-.813-.927C8.5 14.992 8.252 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.552 4.552 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10c.262 0 .52-.008.774-.024a4.525 4.525 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777ZM3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4Z" />
            </svg>
        },
        {
            title: "Guided Information Journey",
            description: "Effortless Navigation in the Data Jungle, QueryMate is your guide, making the journey through information easy, exciting, and efficient.No more information overload; just clarity in every query.",
            points: [
                "Seamless Connections: Connects you seamlessly to the information you seek.",
                "Clear Contextual Answers: Responses that fit your context.",
                "Digital Pathfinder: Transforms the digital maze into a clear knowledge path.",
                "Effortless Retrieval: No more haystacks; just the needles you need."],
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-transparency text-indigo-500" viewBox="0 0 16 16">
                <path d="M0 6.5a6.5 6.5 0 0 1 12.346-2.846 6.5 6.5 0 1 1-8.691 8.691A6.5 6.5 0 0 1 0 6.5Zm5.144 6.358a5.5 5.5 0 1 0 7.714-7.714 6.5 6.5 0 0 1-7.714 7.714Zm-.733-1.269c.363.15.746.261 1.144.33l-1.474-1.474c.069.398.18.78.33 1.144Zm2.614.386a5.47 5.47 0 0 0 1.173-.242L4.374 7.91a5.958 5.958 0 0 0-.296 1.118l2.947 2.947Zm2.157-.672c.297-.166.577-.36.838-.576L5.418 6.126a6.016 6.016 0 0 0-.587.826l4.35 4.351Zm1.545-1.284c.216-.26.41-.54.576-.837L6.953 4.83a5.97 5.97 0 0 0-.827.587l4.6 4.602Zm1.006-1.822c.121-.374.204-.766.242-1.172L9.028 4.078c-.386.063-.76.163-1.118.296l3.823 3.824Zm.186-2.642a5.463 5.463 0 0 0-.33-1.144 5.46 5.46 0 0 0-1.144-.33l1.474 1.474Z" />
            </svg>
        },
        {
            title: "Real-Time Insights",
            description: "Stay Ahead with Instant Knowledge, QueryMate doesn't just answer; it anticipates your needs. Get real-time insights that keep you ahead of the game.",
            points: [
                "Instant Responses: No waiting; get answers in real-time.",
                "Predictive Brilliance: Anticipates your information needs.",
                "Stay Ahead: Stay on top with instant, proactive insights.",
                "Always Informed: Get the latest without the lag."],
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-kanban text-indigo-500" viewBox="0 0 16 16">
                <path d="M13.5 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h11zm-11-1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-11z" />
                <path d="M6.5 3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm-4 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm8 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3z" />
            </svg>
        },
    ]
    return (
        <>
            {/* rounded - xl py-8 px-7 shadow-md transition-all hover: shadow-lg sm: p-9 lg: px-6 xl: px-9 */}
            {/* rounded border border-b border-indigo-900 */}
            <div className="grid gap-10 row-gap-10 lg:grid-cols-2 sm:grid-cols-1">
                {
                    features.map((item, idx) => {
                        return <div className="border-3 w-auto flex flex-wrap flex-col rounded-xl py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9" key={idx}>
                            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
                                {item.svg}
                            </div>
                            <h6 className="mb-2 font-semibold leading-5">{item.title}</h6>
                            <p className="mb-3 text-sm text-gray-900">
                                {item.description}
                            </p>
                            <ul className="mb-4 -ml-1 space-y-2">
                                {item.points.map((item, idx) => {
                                    return (
                                        <li className="flex items-start" key={idx}>
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
                                        </li>

                                    )
                                })
                                }

                            </ul>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default FeaturesItem
