import { useEffect, useState, useContext } from 'react'
// import './style.css'
import Chat from './Chat';
import ChatContext from '../context/useContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

function ChatPage() {
    const route = useNavigate();
    const [question, setQuestion] = useState("");
    // const query = useRef(null);
    let { chatId, multi } = useContext(ChatContext);
    chatId = "65277207f56c4305f288e967"
    const [info, setInfo] = useState([{
        mate: "QueryMate",
        text: "Hello! I am your QueryMate assistant. I am here to help you with any question you may have regarding the provided curpus",
        date: formatDate(new Date()),
        img: `https://api.multiavatar.com/QueryMate.png`,
        side: "start"
    }]);

    const path = `http://localhost:2000/model/${multi ? "qnalong" : "qa"}`;

    function formatDate(date) {
        const h = "0" + date.getHours();
        const m = "0" + date.getMinutes();

        return `${h.slice(-2)}:${m.slice(-2)}`;
    }

    // function getLocalStorageItem(key) {
    //     const item = localStorage.getItem(key);
    //     if (item === null) {
    //         return undefined;
    //     }

    //     try {
    //         return JSON.parse(item);
    //     } catch (e) {
    //         return undefined;
    //     }
    // }

    // let [storage, setStorage] = useState(getLocalStorageItem("message"));

    // if (!storage) {
    //     setStorage([{
    //         mate: "🛡️QueryMate",
    //         text: "Hey, Welcome to QueryMate",
    //         date: formatDate(new Date()),
    //         img: "https://api.multiavatar.com/QueryMate.png",
    //         side: "start"
    //     }])
    //     localStorage.setItem("message", storage);
    // }
    function isEqual(obj1, obj2) {
        // Compare objects based on their "id" property
        return obj1.text === obj2.text;
    }

    function addObjectToArrayIfNotExists(array, objectToAdd) {
        // Check if the object exists in the array
        const exists = array.some(item => isEqual(item, objectToAdd));

        // If it doesn't exist, add it to the array
        if (!exists) {
            array.push(objectToAdd);
        }
        return array;
    }


    const onSubmit = async () => {
        if (question !== "") {
            toast.loading("Finding the Mate!")
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
                console.log(resp)
                if (resp.data.success) {
                    toast.success("We found it😎!")
                    resp.data.answers.map((item) => {
                        setInfo(addObjectToArrayIfNotExists(info, {
                            mate: "Mate",
                            img: `https://api.multiavatar.com/Mate.png`,
                            text: item.answer,
                            date: formatDate(new Date),
                            side: "start"
                        }))
                    })
                } else {
                    toast.success(resp.data.message)
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    }
    useEffect(() => {
        console.log(chatId)
        if (chatId === "" || chatId === undefined) {
            route("/")
        }
    }, [chatId, route])

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
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 pt-3 flex flex-wrap justify-center h-14">
                    <h1 className="text-center text-2xl font-bold text-white mx-10">🛡️QueryMate(Lite) - Your Helping Hand😊</h1>
                </div>
                <div className="flex-grow overflow-y-auto">
                    <div className="flex flex-col space-y-2 p-4">

                        {info ? info.map(item => {
                            return <Chat key={item.date} mate={item.mate} text={item.text} side={item.side} img={item.img} />
                        }) : ""
                        }
                    </div>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    <div className="flex items-center p-4">
                        <input type="text" placeholder="Type your message..."
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

export default ChatPage;
