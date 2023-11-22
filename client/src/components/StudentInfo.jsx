import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { Link } from 'react-router-dom'
export function StudentInfo(props) {
    return (
        <>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center justify-center border-gray-200 border p-4 rounded-xl py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9 flex-col lg:flex-row">
                    <img alt="team" className="w-24 h-24 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={props.imgLink} />
                    <div className="items-center flex-grow sm:flex sm:flex-col flex-row p-5 sm:text-2xl text-2xl">
                        <h2 className="text-gray-900 title-font font-medium text-1xl">{props.name}</h2>
                        <p className="text-gray-500">{props.role}</p>
                        <span className="flex py-2 justify-start"><Link to={props.github} className='mr-2'><AiFillGithub size={30} /></Link><Link to={props.linkedin} className='mr-2'><AiFillLinkedin size={30} /></Link></span>
                    </div>
                </div>
            </div>
        </>
    )
}