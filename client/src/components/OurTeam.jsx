import { StudentInfo } from './StudentInfo';
const OurTeam = () => {
    return (
        <>
            <section className="text-gray-700 body-font border-t border-gray-200 bg-white">
                <div className="container px-5 py-20 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h2 className="text-4xl xl:text-5xl capitalize text-center text-indigo-900 font-bold">our team</h2>
                        <hr className="mx-auto w-12 h-1 outline-0 border-0 bg-indigo-300 block mt-4 mb-6" />
                        <p className="text-center text-xl text-gray-800">Our team consists only of the best talents</p>
                    </div>
                    <div className="flex flex-wrap -m-2 items-center justify-center">
                        <StudentInfo imgLink="https://avatars.githubusercontent.com/u/97181033?v=4" name='Vitthal Gund' role='Full Stack Developer' github='https://github.com/VitthalGund' linkedin='https://in.linkedin.com/in/vitthal-gund' />
                        <StudentInfo
                            imgLink="https://avatars.githubusercontent.com/u/127607339?v=4"
                            name='Sarvesh Yadav'
                            role='UI/UX Designer'
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

export default OurTeam
