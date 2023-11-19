
import { StudentInfo } from './StudentInfo'

export default function About() {
    return (
        <>
            <div className="font-sans">
                <div className="px-8 py-5">
                    <div className="px-4 py-3 bg-slate-100 border-2 border-solid border-slate-300 rounded-lg">
                        QUERYMATE is a tool that centers on developing an intelligent Question and Answering (QA) System that draws strength from a custom dataset, revolutionizing the way users access and comprehend information. The primary objective of this project is to build an AI-powered model capable of understanding questions posed in natural language and extracting uniform answers from a given text corpus. The motivation behind QUERYMATE stems from the ever-growing challenge of efficiently navigating to find information quickly in the huge amount of data. Nowadays, it&apos;s getting harder to find what we are looking for in all the information available.QUERYMATE is like the friend who explains the complicated parts in a way that suddenly makes everything clear. It&apos;s like having a personal tutor who knows exactly what you need.n, QUERYMATE&apos;s unique specialization in accurate information retrieval from text not only distinguishes it from more versatile models like ChatGPT but also highlights its critical role in education, research, and professional domains. Its ability to provide structured and dependable answers to specific queries positions QueryMate as an essential tool in a datadriven world, where precision and efficiency are paramount. Its potential to revolutionize how we access, utilize, and manage information underscores the significance of QueryMate in the evolving landscape of AI-driven solutions.We are a group of students from Computer Engineering Department of Government Polytechnic Mumbai, Maharashtra, India. As our educational institutions are not capable to teach their students well. In such a situation, students have to study on their own and the problem with that is that students have to read the entire reference book to find the answer to any specific question. We have experienced that to find the short answers from reference book is very critical thing & very time consuming. In such a situation, the QueryMate will give the exact answer from that reference book.And QueryMate will generate answers not only from reference book but also from audio & video files.
                    </div>
                </div>
                <div className="">
                    <div className="md:flex md:justify-evenly md:items-center block ">
                        <StudentInfo
                            imgLink="https://avatars.githubusercontent.com/u/97181033?v=4"
                            name='Vitthal Gund'
                            github='https://github.com/VitthalGund'
                            linkedin='https://in.linkedin.com/in/vitthal-gund'
                            roles='Full Stack Developer'
                        />
                        <StudentInfo
                            imgLink="https://avatars.githubusercontent.com/u/127607339?v=4"
                            name='Sarvesh Yadav'
                            roles='UI/UX Designer and Content Writer'
                            github='https://github.com/sarveshpyadav'
                            linkedin='https://in.linkedin.com/in/sarveshpyadav'
                        />
                    </div>
                    <div className="md:flex md:justify-evenly md:items-center block">
                        <StudentInfo imgLink="https://avatars.githubusercontent.com/u/142326621?v=4" name='Justin Fernandes' role='FH21CO001' github='https://github.com/FernandesJustin' linkedin='https://in.linkedin.com/in/justin-fernandes-848459247' />
                        <StudentInfo imgLink="https://avatars.githubusercontent.com/u/146202519?v=4" name='Ramkrushna Sahu' enrollmentNo='FS21CO036' github='https://github.com/Ramkrushna-Sahu' linkedin='https://www.linkedin.com/in/ramkrushna-sahu' />
                    </div>
                </div>
            </div>
        </>
    )
}