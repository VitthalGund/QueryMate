import { useContext, useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/Auth/userContext";
import ChatContext from "../context/Chat/useContext";
import { toast } from 'react-toastify';

const Sider = () => {
    const { userData, auth, setAuth, setUserData, setPersist } = useContext(UserContext);
    const { setChatId, info, setChatTitle } = useContext(ChatContext);
    const navigate = useNavigate();
    const sideBar = useRef();
    const subMenu = useRef();
    const arrow = useRef();
    const [drop, setDrop] = useState();
    const [open, setOpen] = useState(false); // Initialize with `false` here.
    const [chats, setChats] = useState([]);
    const [q, setQ] = useState("");

    const data = Object.values(chats);

    function dropdown() {
        setDrop(pre => !pre);
        if (subMenu.current !== undefined) {
            subMenu.current.classList.toggle("hidden");
        }
        if (arrow.current !== undefined) {
            arrow.current.classList.toggle("rotate-0");
        }
    }

    function openSidebar() {
        setOpen(pre => !pre);
    }
    const toUpload = () => {
        navigate("/upload");
        toast.info("navigating to upload page...")
    }

    const handleSwitch = (chatId) => {
        info.length = 1;
        setChatId(chatId);
        if (editingChatId === chatId) {
            return
        }
        openSidebar();
    }
    const logout = async () => {
        const resp = await toast.promise(axios.get("/logout", {
            headers: {
                authorization: auth.accessToken
            }
        }), {
            pending: "requesting to logout...",
            success: "Logout Successfully",
            error: "Something went wrong!"
        });
        if (resp.status.toString() === "204") {
            setAuth(undefined);
            setUserData(undefined);
            setPersist(false);
            setChatId(null);
        }
    }

    const toHome = () => navigate("/");
    useEffect(() => {
        const fetchChat = async () => {
            const resp = await axios.post("/messages/chats", { email: userData.email }, {
                headers: {
                    authorization: auth.accessToken
                }
            });
            if (resp.data.chats.length < 0) {
                toUpload();
                return;
            }
            setChats(resp.data.chats)
            if (!localStorage.getItem("chatId")) {
                localStorage.setItem("chatId", chats[0].chatId)
            }
        }
        fetchChat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.accessToken, userData.email])

    const [editingChatId, setEditingChatId] = useState(null);
    const [editedChatTitle, setEditedChatTitle] = useState("");

    // Function to enter "edit mode" for a chat item
    const startEditing = (chatId, chatTitle) => {
        setEditingChatId(chatId);
        setEditedChatTitle(chatTitle);
    };

    // Function to save changes for a chat title
    const saveChanges = async (editedChatTitle, editingChatId) => {
        // Implement your logic to save changes here, e.g., update the chat title in your state or storage.
        // Then, exit "edit mode" for the chat item.
        // console.log({ editedChatTitle, editingChatId })
        setEditedChatTitle(editedChatTitle);
        let data = chats;
        const resp = await toast.promise(axios.post("messages/edit", { newTitle: editedChatTitle, chatId: editingChatId }, {
            headers: {
                authorization: auth.accessToken
            }
        }), {
            promise: "reflecting your changes...",
            success: "changes saved!",
            error: "unable to save changes."
        });
        if (!resp.data.success) {
            return
        }
        data.map((item) => {
            if (item.chatId === editingChatId) {
                item.title = editedChatTitle;
            }
            return item;
        })
        setEditingChatId(null);

    };

    // Function to cancel changes for a chat title
    const cancelChanges = () => {
        // Simply exit "edit mode" without saving changes.
        setEditingChatId(null);
    };


    function search(items) {
        const filteredItems = items.filter((item) => {
            return item.title.toLowerCase().includes(q.toLowerCase());
        });
        return filteredItems;

    }

    return (
        <div className="bg-blue-600">
            <span
                className="absolute text-white top-3 left-1 cursor-pointer text-2xl lg:text-4xl"
                onClick={openSidebar} // Use the function reference here.
            >
                <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
            </span>

            <div
                className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-fit overflow-y-auto text-center bg-gray-900 text-xl lg:text-2xl sider ${open ? "block" : "hidden" // Conditionally apply the 'block' or 'hidden' class.
                    }`}
                ref={sideBar}
            >
                <div className="text-gray-100 text-xl">
                    <div className="p-2.5 mt-1 flex items-center">
                        <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
                        <h1 className="font-bold text-gray-200 text-[15px] ml-3">Chats</h1>
                        <i
                            className="bi bi-x cursor-pointer ml-28"
                            onClick={() => openSidebar()}
                        ></i>
                        <i className="bi bi-plus-circle mx-3 cursor-pointer"
                            onClick={() => toUpload()}
                        ></i>
                    </div>
                    <div className="my-2 bg-gray-600 h-[1px]"></div>
                </div>
                <div
                    className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white"
                >
                    <i className="bi bi-search text-sm"></i>
                    <input
                        type="text"
                        placeholder="Search"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
                    />
                </div>

                <div className="my-4 bg-gray-600 h-[1px]"></div>
                <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                    onClick={() => dropdown()}
                >
                    <i className="bi bi-chat-left-text-fill"></i>
                    <div className="flex justify-between w-full items-center">
                        <span className="text-[15px] ml-4 text-gray-200 font-bold">Chatbox</span>
                        <span className={`text-sm ${drop ? "rotate-0" : "rotate-180"}`} id="arrow">
                            <i className="bi bi-chevron-down"></i>
                        </span>
                    </div>
                </div>
                <div
                    className={`text-left text-sm mt-2 w-[93%] flex flex-col flex-wrap mx-auto text-gray-200 font-bold ${drop ? "hidden" : ""}`}
                    id="submenu"
                >

                    {search(data).map((item) => {
                        return (
                            <h1
                                key={item.chatId}
                                onClick={() => {
                                    handleSwitch(item.chatId);
                                    setChatTitle(item.title)
                                }}
                                style={{ width: "265px" }}
                                className={`cursor-pointer w-full max-w-prose bg-slate-800 my-3 p-2 ${editingChatId === item.chatId ? "" : "hover:bg-blue-600"} rounded-md mt-1${item.chatId === localStorage.getItem("chatId") ? " bg-blue-500" : ""
                                    }`}
                            >
                                {editingChatId === item.chatId ? (
                                    // Display the input field when in "edit mode"
                                    <div className="flex flex-row justify-between items-center">
                                        <input
                                            type="text"
                                            value={editedChatTitle}
                                            onChange={(e) => setEditedChatTitle(e.target.value)}
                                            className="text-black rounded-lg p-2"
                                        />
                                        <i onClick={() => saveChanges(editedChatTitle, editingChatId)} className="bi bi-check-lg mr-2 ml-[0.33rem] cursor-pointer"></i>
                                        <i onClick={cancelChanges} className="bi bi-x-lg mr-[0.4rem] ml-1 cursor-pointer"></i>
                                    </div>
                                ) : (
                                    // Display the chat title when not in "edit mode"
                                    <>
                                        <div className="flex space-x-44 flex-row justify-between" >
                                            {item.title}
                                            <button onClick={() => startEditing(item.chatId, item.title)}><i className="bi bi-pencil-square items-start"></i></button>
                                        </div>
                                    </>
                                )}
                            </h1>
                        )
                    })}

                </div>
                <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                    onClick={toHome}
                >
                    <i className="bi bi-house-door-fill"></i>
                    <Link to="/home" className="text-[15px] ml-4 text-gray-200 font-bold">Home</Link>
                </div>
                <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                    onClick={toHome}
                >
                    <i className="bi bi-bookmark-fill"></i>
                    <Link to="/help" className="text-[15px] ml-4 text-gray-200 font-bold">FAQ</Link>
                </div>
                <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                    onClick={() => logout()}
                >
                    <i className="bi bi-box-arrow-in-right"></i>
                    <span
                        className="text-[15px] ml-4 text-gray-200 font-bold"
                        onClick={() => {
                            logout();
                        }}
                    >Logout</span>
                </div>

            </div>
        </div >
    );
}

export default Sider;
