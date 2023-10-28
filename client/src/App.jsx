import Home from "./components/Home";
import NavBar from "./components/NavBar";
import LogSign from "./components/LoginwithGoogle"
import SignEmail from "./components/SignUp1"
import SignupPassword from "./components/SignUp2"
import LogIn from "./components/Login"
import MailResetPassword from "./components/ResetPassword1";
import ResetPassword from "./components/ResetPassword2";
import CreateNewPassword from "./components/NewPassword";
import NewPasswordCreated from "./components/NewPasswordCreated";
import RequireAuth from "./components/RequireAuth";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { ChatPage } from "./components/ChatPage";
export default function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/loginwithgoogle" element={<LogSign title="QUERYMATE" />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/signupmail" element={<SignEmail />} />
          <Route exact path="/signuppassword" element={<SignupPassword />} />
          <Route exact path="/resetpassword" element={<ResetPassword />} />
          <Route element={<RequireAuth />}>
            {/* <Route exact path="/chat-page" element={<ChatPage/>}/> */}
            <Route exact path="/resetpassword-mail" element={<MailResetPassword />} />
            <Route exact path="/check-inbox" element={<ResetPassword />} />
            <Route exact path="/create-new-password" element={<CreateNewPassword />} />
            <Route exact path="/new-password-created" element={<NewPasswordCreated />} />
            <Route exact path="/chat" element={<ChatPage />}></Route>
          </Route>
        </Routes>
      </Router>


    </>
  )
}