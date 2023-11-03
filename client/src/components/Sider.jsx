import { useRef, useState } from "react";

const Sider = () => {
    const sideBar = useRef();
    const subMenu = useRef();
    const arrow = useRef();
    const [drop, setDrop] = useState();
    const [open, setOpen] = useState(false); // Initialize with `false` here.

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

    return (
        <div className="bg-blue-600">
            <span
                className="absolute text-white text-4xl top-3 left-1 cursor-pointer"
                onClick={openSidebar} // Use the function reference here.
            >
                <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
            </span>

            <div
                className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 ${open ? "block" : "hidden" // Conditionally apply the 'block' or 'hidden' class.
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
                        <i className="bi bi-plus-circle mx-3"
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
                    className={`text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold ${drop ? "hidden" : ""}`}
                    id="submenu"
                >
                    <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                        Java Reference.pdf
                    </h1>
                    <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                        Chanakya: India&apos;s Machiavelli
                    </h1>
                    <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                        10th Science part 1.docs
                    </h1>
                </div>
                <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                >
                    <i className="bi bi-house-door-fill"></i>
                    <span className="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
                </div>
                <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                >
                    <i className="bi bi-bookmark-fill"></i>
                    <span className="text-[15px] ml-4 text-gray-200 font-bold">Bookmark</span>
                </div>
                <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                >
                    <i className="bi bi-box-arrow-in-right"></i>
                    <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
                </div>

            </div>
        </div>
    );
}

export default Sider;
