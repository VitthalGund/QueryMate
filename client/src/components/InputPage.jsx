import { useEffect, useRef, useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import ChatContext from '../context/Chat/useContext';
import axios from '../api/axios';
import { Toaster, toast } from 'react-hot-toast';
import UserContext from '../context/Auth/userContext';

function InputPage() {
    const { setChatId, setMulti } = useContext(ChatContext);
    const { auth } = useContext(UserContext);

    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState();
    const textAreaRef = useRef(null);
    const [value, setValue] = useState("");
    const [textInputDisable, setTextInputDisable] = useState(false);
    const [fileInputDisable, setFileInputDisable] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const handleFile = () => {
        const file = fileInputRef.current?.files[0]
        setFileName(file.name);
        setTextInputDisable(true)
        setFileInputDisable(false)
        console.log(file.name);
        setSelectedFile(file)
    }

    const handleText = (e) => {
        setValue(e.target.value)
        if (e.target.value === "") {
            setTextInputDisable(false)
            setFileInputDisable(false)
        } else {
            setTextInputDisable(false)
            setFileInputDisable(true)
        }
    }
    const handleOnclick = async () => {
        let id = toast.loading("Uploading the file");
        try {
            let uploadRoute = '/upload/';
            let requestData = null
            // setLoading(true);
            let response;
            if (textInputDisable) {
                requestData = new FormData();
                uploadRoute += 'file';
                requestData.append('file', fileInputRef.current?.files[0], fileName);
            } else {
                uploadRoute += 'text';
            }
            console.log(requestData ? { file: requestData.get("file") } : { passage: textAreaRef.current.value, email: auth.email })
            response = await axios.post(`${uploadRoute}`,
                requestData ? requestData : { passage: textAreaRef.current.value, email: auth.email },
                {
                    headers: {
                        authorization: auth.accessToken,
                        'Content-Type': textInputDisable ? 'multipart/form-data' : "application/json",
                    },
                }
            );
            console.log(uploadRoute)

            if (response.data.success) {
                console.log(response)
                setChatId(response.data.chatId);
                setMulti(response.data.multi);
                toast.success("File uploaded Successfully!")
                navigate('/chat');
            }
            console.log(response);
        } catch (error) {
            console.log("Error: ", error);
            toast.error(error.message);
        } finally {
            toast.dismiss(id);
        }
    };

    const handleDelete = () => {
        setSelectedFile(null);
        setTextInputDisable(false);
        setFileInputDisable(false);
        fileInputRef.current.value = '';
        setFileName("")
    };

    useEffect(() => {
        textAreaRef.current.style.height = "auto"
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }, [value])
    // https://tailwindcomponents.com/component/tailwind-css-file-upload
    return (
        <>
            <div className="font-serif bg-slate-50">
                <Link to="/" className="ml-4 text-3xl">←</Link>
            </div>
            <div className="h-screen w-[80%]flex flex-col justify-center items-center bg-slate-50">
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName=""
                    containerStyle={{}}
                />
                <div className="py-4 ">
                    <p className="font-bold text-2xl pt-10 text-center">QUERYMATE</p>
                </div>
                <div className="py-4">
                    <p className="font-semibold text-xl text-center">Add your text corpus OR Upload your document.</p>
                </div>
                <div className="py-4 w-[90%] px-2 m-auto">
                    <p className="font-medium text-lg text-center py-7">You&apos;ll be able to start an interaction based on the text/document uploaded.</p>
                    <div className="border-2 border-solid border-black py-1 px-1 rounded-sm">
                        <textarea className="resize-none border-2 border-dashed border-black py-1 px-1 w-full rounded-sm max-h-72" rows="5" onChange={handleText} ref={textAreaRef}
                            placeholder='Enter Your Text...' disabled={textInputDisable} />
                        <div className="text-xs text-center font-semibold flex justify-between sm:flex-row flex-col">
                            <input type="file" accept=".pdf, .docs, .txt, .img, .jpg, .jpeg, .mp3, .mp4" ref={fileInputRef} name='file'
                                onChange={e => handleFile(e.target.files[0])} className='hidden' disabled={fileInputDisable} />
                            <button onClick={() => fileInputRef.current.click()} className="text-blue-500" disabled={fileInputDisable} >CLICK TO UPLOAD A FILE!(.pdf, .docs, .txt etc.)</button><span className='text-blue-500'>    {(selectedFile && fileName) ? fileName : " "} </span>
                            <button className={`${(selectedFile) ? 'text-red-600' : 'text-gray-300'}`} onClick={handleDelete} disabled={!selectedFile}>REMOVE FILE</button>
                        </div>
                    </div>
                    <div className="text-center py-5">
                        <p className="text-xs text-gray-500 ">By starting interaction, you agree with our data privacy policy and terms.</p>
                        <button className="py-2 w-2/4 sm:w-1/4 mt-3 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={(e) => { handleOnclick(e) }}>START INTERACTION</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InputPage;
