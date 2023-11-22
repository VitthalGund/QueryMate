import { useState } from "react";
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
function Chat({ mate, text, side, img }) {
    const [message] = useState({
        mate,
        text,
        date: formatDate(new Date()),
        side,
        img
    });

    function formatDate(date) {
        const h = "0" + date.getHours();
        const m = "0" + date.getMinutes();

        return `${h.slice(-2)}:${m.slice(-2)}`;
    }

    return (
        <>
            <div className={`msg flex items-start mb-10 ${side === "end" ? "justify-end" : ""}`}>
                {side !== "end" ? <div className={`msg-img w-10 h-10 mr-2 bg-gray-300 rounded-full ${side === "end" ? "justify-end" : ""}`}
                ><img className="w-fit" src={message.img} alt="icons" /></div> : ""}
                <div className="msg-bubble max-w-72 p-1 rounded-lg bg-left-msg-bg flex-wrap">
                    <div className={`msg-info flex ${side === "start" ? "justify-between" : "justify-end"} items-center mb-2`}>
                        <div className="msg-info-name font-bold">{message.mate}</div>
                        <div className={`msg-info-time text-sm ${side === "end" ? "ml-4" : ""}`}>{message.date}</div>
                    </div>
                    <div className={`msg-text self-end ${side === "end" ? "bg-green-500" : "bg-blue-500"} text-white rounded-lg p-2 flex items-center text-sm md:text-lg lg:text-xl`}>
                        {text}
                    </div>
                </div>
                {side === "end" ? <div className={`msg-img w-10 h-10 mr-2 bg-gray-300 rounded-full ${side === "end" ? "justify-end" : ""}`}
                ><img src={message.img} alt="icons" /></div> : ""}
            </div>


        </>
    )
}

Chat.prototype = {
    name: PropTypes.string,
    text: PropTypes.string,
    img: PropTypes.string,
    side: PropTypes.string,
    children: PropTypes.string
}

export default Chat;
