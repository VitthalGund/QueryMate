import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { Link } from 'react-router-dom'
export function StudentInfo(props) {
    return (
        <>
            <div className="border-2 border-solid border-slate-300 rounded-xl w-[314px] max-w-full h-44 text-center bg-slate-100 hover:bg-slate-300 flex flex-col justify-center items-center m-auto px-8 my-3">
                <p className="text-2xl font-bold py-2">{props.name}</p>
                <p className="text-xl font-semibold">{props.enrollmentNo}</p>
                <span className="flex py-2 px-10"><Link to={props.gitacc}><AiFillGithub size={30} /></Link><Link to={props.linkacc}><AiFillLinkedin size={30} /></Link></span>
            </div>
        </>
    )
}