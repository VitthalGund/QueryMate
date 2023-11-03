import { useState } from 'react'

export default function TermsConditions() {
    const [hide, setHide] = useState(false);
    const handleOnClick = () => {
        setHide(true)
    }
    return (
        <>
            {!hide && (
                <div className="px-11 mx-2 my-4 bg-slate-100 border-2 border-solid border-slate-300 h-full grid justify-items-center">
                    <p className="sm:text-3xl font-bold text-center text-lg">Terms & Conditions</p>

                    <ol className="list-decimal ">
                        <li className="py-4">The dataset is given by user, so if anything is wrong in the dataset then the answer given by the applicant will also wrong. So it is not the responsibility of application.</li>
                        <li className="py-4">Efforts have been made to provide accurate answers, answer may not always be correct. Users should independantly independently verify the information.</li>
                        <li className="py-4">While you plan to reduce ambiguity through techniques like
                            chunking and spelling correction, some questions or passages may remain inherently
                            ambiguous, leading to potentially incorrect answers.</li>
                        <li className="py-4">The system&apos;s accuracy may vary for languages with fewer
                            available training data or less well-established models.</li>
                    </ol>
                    <button className="bg-green-400 w-24 mb-4 h-auto border-2 border-solid border-green-500 hover:bg-green-500" onClick={handleOnClick}>Agree</button>
                </div>
            )
            }
        </>
    )
}