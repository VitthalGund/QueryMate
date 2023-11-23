import React, { useEffect, useState, useContext } from 'react'
import '../index.css'
const Chat = React.lazy(() => import('./Chat'));
import ChatContext from '../context/Chat/useContext';
import axios from '../api/axios';
// import { useNavigate } from 'react-router-dom';
// import { Toaster, toast } from 'react-hot-toast';
import { toast } from 'react-toastify';
import UserContext from '../context/Auth/userContext';
import Sider from './Sider';
import ReactLoading from "react-loading"

function ChatPage() {
    // const route = useNavigate();
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);

    const { auth, userData } = useContext(UserContext);
    const { chatId, multi, chatTitle, info, setInfo, formatDate } = useContext(ChatContext);
    const path = `/model/${multi ? "qalong" : "qa"}`;

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
        setLoading(true);
        const response = await axios.post("/messages", { chatId }, {
            headers: {
                authorization: auth.accessToken
            }
        });
        // console.log(response.data.messages)
        for (let index = 0; index < response.data.messages.length; index++) {
            const element = response.data.messages[index];
            addObjectToArrayIfNotExists(info, {
                mate: userData.username,
                img: `https://api.multiavatar.com/${userData.username.toUpperCase()}.png`,
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
        setLoading(false);

    }

    const onSubmit = async () => {
        if (question !== "") {
            let id = toast.loading("Finding the Mate!")
            setInfo(addObjectToArrayIfNotExists(info, {
                mate: userData.username,
                text: question,
                date: formatDate(new Date()),
                img: `https://api.multiavatar.com/${userData.username.toUpperCase()}.png`,
                side: "end"
            }));
            setQuestion("");
            const resp = await axios.post(path, { chatId, question }, {
                headers: {
                    authorization: auth.accessToken
                }
            });
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
        if (chatId === "" || chatId === undefined || chatId === null) {
            toast.info("No chats founds!")
        }
        setInfo(null);
        getConveration();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId])

    return (
        <>
            <div className="flex h-screen flex-col bg-gray-100">
                {/* <Toaster
                    position="top-center"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName=""
                    containerStyle={{}}
                /> */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 pt-3 flex flex-wrap justify-center object-fill p-4">
                    <h1 className="text-center font-bold text-white mx-10 text-sm md:text-lg lg:text-2xl">🛡️QueryMate - {chatTitle ? chatTitle : "Your Helping Hand😊"}</h1>
                </div>
                <Sider />
                <div className="flex-grow overflow-y-auto chats">
                    <div key={info} className="flex flex-col space-y-2 p-4" id='chatList'>
                        {chatId ? !loading ? info?.map((item, ind) => {
                            return (
                                <Chat key={ind} mate={item.mate} text={item.text} side={item.side} img={item.img} />
                            )
                        }) : <ReactLoading type="bars" color="#4338ca" className="flex justify-center items-center align-middle m-auto" /> :
                            <h1 className="text-center text-2xl font-bold text-violet-500 mx-10 flex justify-center items-center">No Chats found</h1>
                        }

                    </div>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    <div className="flex items-center p-4">
                        <input type="text" placeholder="Type your query..."
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm lg:text-1xl"
                            value={question ? question : ""}
                            onChange={(e) => setQuestion(e.target.value)}
                            // ref={query}
                            spellCheck={true}
                            tabIndex={2}
                        />
                        <button className="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white text-sm md:text-lg lg:text-1xl" type='submit' tabIndex={3}>Ask</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChatPage;