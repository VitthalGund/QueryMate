import { useState } from "react";
import ChatContext from "./useContext";

const ChatID = (props) => {
    const [chatId, setChatId] = useState();
    const [multi, setMulti] = useState();

    return (
        <ChatContext.Provider value={{ chatId, setChatId, multi, setMulti }}>
            {props.children}
        </ChatContext.Provider>
    );
}


export default ChatID;