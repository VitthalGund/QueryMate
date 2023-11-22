import { useEffect, useState } from "react";
import ChatContext from "./useContext";

const ChatID = (props) => {
    const [chatId, setChatId] = useState(localStorage.getItem("chatId"));
    // const [chatId, setChatId] = useState("653b9d1c69a3c827df961a0e");
    const [multi, setMulti] = useState();
    const [chatTitle, setChatTitle] = useState();

    function formatDate(date) {
        const h = "0" + date.getHours();
        const m = "0" + date.getMinutes();

        return `${h.slice(-2)}:${m.slice(-2)}`;
    }
    const [info, setInfo] = useState([{
        mate: "QueryMate",
        text: "Hello! I am your QueryMate assistant.\n I am here to help you with any question you may have regarding the provided curpus",
        date: formatDate(new Date()),
        img: `https://api.multiavatar.com/QueryMate.png`,
        side: "start"
    }]);

    useEffect(() => {
        localStorage.setItem("chatId", chatId)
    }, [chatId])
    return (
        <ChatContext.Provider value={{ chatId, setChatId, multi, setMulti, info, setInfo, formatDate, chatTitle, setChatTitle }}>
            {props.children}
        </ChatContext.Provider>
    );
}


export default ChatID;