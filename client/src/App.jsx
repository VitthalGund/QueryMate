import ChatPage from "./components/ChatPage";
import InputPage from "./components/InputPage";

/*
import './App.css'
import Home from "./components/Home";
import LogSign from "./components/LoginwithGoogle"
import SignEmail from "./components/Page 3"
import SignupPassword from "./components/Page 4"
import LogIn from "./components/Page 5"
// import ResetPassword from "./components/Page 6"
*/
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<InputPage />} />
          <Route exact path="/Qna" element={<ChatPage />} />
          {/* <Route exact path="/" element={<Home/>}/> */}
          {/* <Route exact path="/loginwithgoogle" element={<LogSign title="QUERYMATE"/>}/> */}
          {/* <Route exact path="/login" element={<LogIn />} /> */}
          {/* <Route exact path="/signupmail" element={<SignEmail />} /> */}
        </Routes>
      </Router>
    </>
  )
}

