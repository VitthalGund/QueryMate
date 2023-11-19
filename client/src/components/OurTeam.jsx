import { StudentInfo } from './StudentInfo';
const OurTeam = () => {
    return (
        <>
            <section className="text-gray-700 body-font border-t border-gray-200 bg-gray-50">
                <div className="container px-5 py-20 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-indigo-600">Our Team</h1>
                        {/* <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven&apos;t heard of them.</p> */}
                    </div>
                    <div className="flex flex-wrap -m-2 items-center justify-center">
                        <StudentInfo imgLink="https://avatars.githubusercontent.com/u/97181033?v=4" name='Vitthal Gund' role='Full Stack Developer' github='https://github.com/VitthalGund' linkedin='https://in.linkedin.com/in/vitthal-gund' />
                        <StudentInfo
                            imgLink="https://avatars.githubusercontent.com/u/127607339?v=4"
                            name='Sarvesh Yadav'
                            role='UI/UX Designer and Content Writer'
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
