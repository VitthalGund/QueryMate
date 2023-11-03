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
import PersistenLogin from "./components/PersistenLogin";
import { ToastContainer } from 'react-toastify';
import { InputPage } from "./components/InputPage";
import 'react-toastify/dist/ReactToastify.css';
import { Email } from "./components/Email"
import Verify from "./components/Verify";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import About from "./components/About";
import { FAQ } from "./components/FAQ";
const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}
export default function App() {
  return (
    <>
      <Router>
        <NavBar />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Routes>
          <Route element={<PersistenLogin />}>
            <Route exact path="/" element={
              <>
                <Home />
              </>
            } />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/loginwithgoogle" element={<LogSign title="QUERYMATE" />} />
            <Route exact path="/login" element={<LogIn />} />
            <Route exact path="/signupmail" element={<SignEmail />} />
            <Route exact path="/signuppassword" element={<SignupPassword />} />
            <Route exact path="/resetpassword" element={<Email />} />
            <Route exact path="/notify" element={<ResetPassword />} />
            <Route exact path="/resetpassword-mail" element={<MailResetPassword />} />
            <Route exact path="/check-inbox" element={<ResetPassword />} />
            <Route exact path="/verify:token" element={<Verify />} />
            <Route exact path="/privacy" element={<PrivacyPolicy />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/help" element={<FAQ />} />
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              {/* <Route exact path="/chat-page" element={<ChatPage/>}/> */}
              <Route exact path="/create-new-password" element={<CreateNewPassword />} />
              <Route exact path="/new-password-created" element={<NewPasswordCreated />} />
              <Route exact path="/chat" element={<ChatPage />}></Route>
              <Route exact path="/upload" element={<InputPage />}></Route>
            </Route>
          </Route>
        </Routes>
      </Router>


    </>
  )
}