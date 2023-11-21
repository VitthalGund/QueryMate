import { useState } from 'react';

function FAQ() {
    const [faqStates, setFaqStates] = useState({
        1: false,
        2: false,
    });

    const faqs = [
        {
            id: 1,
            question: 'What is QueryMate?',
            answer: 'QueryMate is a virtual assistant that can answer your questions instantly.',
        },
        {
            id: 2,
            question: 'How does it work?',
            answer: 'QueryMate uses advanced AI to understand and respond to your queries.',
        },
        {
            id: 3,
            question: 'Why was QueryMate developed?',
            answer: 'QueryMate was developed in response to the challenge of efficiently navigating and finding information in a vast amount of data. Traditional keyword-based searches often fall short in understanding complex queries and providing relevant answers.',
        },
        {
            id: 4,
            question: 'What makes QueryMate different from traditional search engines?',
            answer: 'QueryMate is different from traditional search engines because it aims to understand natural language queries and provide concise, relevant answers. It leverages the latest advancements in AI and NLP to bridge the gap between user questions and the information available in the text corpus.',
        },
        {
            id: 5,
            question: 'Can QueryMate handle complex or delicate queries?',
            answer: 'Yes, QueryMate is designed to handle complex and delicate queries. Its AI-based model is capable of understanding the nuances in natural language and providing relevant responses.',
        },
        {
            id: 6,
            question: 'What are the potential applications of QueryMate?',
            answer: 'QueryMate can be applied in various fields, including customer support, information retrieval, content recommendation, and more, wherever there is a need for intelligent question-answering systems.',
        },
        {
            id: 7,
            question: 'Is QueryMate available for public use, and how can I access it?',
            answer: 'The availability of QueryMate may vary, and you may need to check with the developers or the organization behind it to see if it is publicly accessible. Access and usage details may be provided on their official website or through their official channels.',
        },
        {
            id: 8,
            question: 'How accurate is QueryMate in providing answers to user queries?',
            answer: "QueryMate's accuracy in providing answers depends on the quality of the dataset it's trained on and the sophistication of its underlying AI model. Performance metrics may be available from the developers.",
        },
        {
            id: 9,
            question: 'What kind of data can QueryMate work with?',
            answer: "QueryMate can typically work with a wide range of text data, including articles, documents, web pages, and more. It's designed to extract information and provide answers from textual content.",
        },
        {
            id: 10,
            question: 'Can QueryMate be used for academic or research purposes?',
            answer: "QueryMate can often be used for academic or research purposes, but it's important to respect any licensing and usage terms set by the developers.",
        },
    ];

    const toggleFaq = (faqId) => {
        setFaqStates((prevFaqStates) => ({
            ...prevFaqStates,
            [faqId]: !prevFaqStates[faqId],
        }));
    };

    return (
        <div className="min-h-screen py-8 bg-slate-100">
            <div className="container mx-auto p-4 faq-container">
                <h1 className="text-2xl font-semibold mb-8 text-center font-staatliches">QueryMate</h1>
                {faqs.map((faq) => (
                    <div key={faq.id} className="bg-white p-2 rounded shadow-md mb-4">
                        <h2
                            onClick={() => toggleFaq(faq.id)}
                            className="cursor-pointer text-xl font-semibold mb-2"
                        >
                            {faq.question}
                        </h2>
                        {faqStates[faq.id] && <p className="text-gray-600">{faq.answer}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}


export default FAQ;