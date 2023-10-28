import { useEffect, useState, useContext } from 'react'
// import './style.css'
import Chat from './Chat';
import ChatContext from '../context/Chat/useContext';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

export function ChatPage() {
    const route = useNavigate();
    const [question, setQuestion] = useState("");
    // const query = useRef(null);
    const { chatId, multi } = useContext(ChatContext);
    const [info, setInfo] = useState([{
        mate: "QueryMate",
        text: "Hello! I am your QueryMate assistant.\n I am here to help you with any question you may have regarding the provided curpus",
        date: formatDate(new Date()),
        img: `https://api.multiavatar.com/QueryMate.png`,
        side: "start"
    }]);

    const path = `/model/${multi ? "qalong" : "qa"}`;

    function formatDate(date) {
        const h = "0" + date.getHours();
        const m = "0" + date.getMinutes();

        return `${h.slice(-2)}:${m.slice(-2)}`;
    }

    function addObjectToArrayIfNotExists(array, objectToAdd) {
        // Check if the object exists in the array
        const exists = array.some(item => item.text === objectToAdd.text);

        // If it doesn't exist, add it to the array
        if (!exists) {
            array.push(objectToAdd);
        }
        return array;
    }

    const scrollToBottom = () => {
        const chat = document.getElementById("chatList");
        chat.scrollTop = chat.scrollHeight;
    };

    const getConveration = async () => {
        const response = await axios.post("/messages", { chatId });
        console.log(response.data.messages)
        for (let index = 0; index < response.data.messages.length; index++) {
            const element = response.data.messages[index];
            addObjectToArrayIfNotExists(info, {
                mate: "Mate",
                img: `https://api.multiavatar.com/Mate.png`,
                text: element.question,
                date: element.Date,
                side: "end"
            });
            for (let index = 0; index < element.response.length; index++) {
                const ans = element.response[index];
                addObjectToArrayIfNotExists(info, {
                    mate: "QueryMate",
                    img: `https://api.multiavatar.com/QueryMate.png`,
                    text: ans,
                    date: ans,
                    side: "start"
                });
            }
        }
        // setInfo([...info, ...update])
        setInfo([...info])

    }

    const onSubmit = async () => {
        if (question !== "") {
            let id = toast.loading("Finding the Mate!")
            setInfo(addObjectToArrayIfNotExists(info, {
                mate: "Mate",
                text: question,
                date: formatDate(new Date()),
                img: `https://api.multiavatar.com/QueryMate.png`,
                side: "end"
            }));
            setQuestion("");
            const resp = await axios.post(path, { chatId, question });
            try {
                if (resp.data.success) {
                    toast.success("We found it😎!")
                    let update = {}
                    for (let index = 0; index < resp.data.answers.length; index++) {
                        const element = resp.data.answers[index];
                        update = addObjectToArrayIfNotExists(info, {
                            mate: "QueryMate",
                            img: `https://api.multiavatar.com/QueryMate.png`,
                            text: element.text,
                            date: resp.data.Date,
                            side: "start"
                        });
                    }
                    setInfo([...update]);
                    console.log(info)
                    scrollToBottom();
                } else {
                    toast.error(resp.data.message)
                }
            } catch (error) {
                toast.error(error.message);
                toast.dismiss(id);
            } finally {
                toast.dismiss(id);
            }
        }
    }
    useEffect(() => {
        console.log(chatId)
        if (chatId === "" || chatId === undefined) {
            route("/")
        }
        getConveration()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId])

    return (
        <>
            <div className="flex h-screen flex-col bg-gray-100">
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName=""
                    containerStyle={{}}
                />
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 pt-3 flex flex-wrap justify-center object-fill p-4">
                    <h1 className="text-center text-2xl font-bold text-white mx-10">🛡️QueryMate - Your Helping Hand😊</h1>
                </div>
                <div className="flex-grow overflow-y-auto">
                    <div className="flex flex-col space-y-2 p-4" id='chatList'>
                        {info.map((item, index) => {
                            return (<Chat key={index} mate={item.mate} text={item.text} side={item.side} img={item.img} />)
                        })}
                    </div>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    <div className="flex items-center p-4">
                        <input type="text" placeholder="Type your query..."
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            value={question ? question : ""}
                            onChange={(e) => setQuestion(e.target.value)}
                            // ref={query}
                            spellCheck={true}
                            tabIndex={2}
                        />
                        <button className="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white" type='submit' tabIndex={3}>Ask</button>
                    </div>
                </form>
            </div>
        </>
    )
}

