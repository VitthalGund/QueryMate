import React, { Suspense } from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
const LogSign = React.lazy(() => import("./components/LoginwithGoogle"));
const SignEmail = React.lazy(() => import("./components/SignUp1"));
const SignupPassword = React.lazy(() => import("./components/SignUp2"));
const LogIn = React.lazy(() => import("./components/Login"));
const MailResetPassword = React.lazy(() => import("./components/ResetPassword1"));
const ResetPassword = React.lazy(() => import("./components/ResetPassword2"));
const CreateNewPassword = React.lazy(() => import("./components/NewPassword"));
const NewPasswordCreated = React.lazy(() => import("./components/NewPasswordCreated"));
const Verify = React.lazy(() => import("./components/Verify"));
const InputPage = React.lazy(() => import("./components/InputPage"));
const PrivacyPolicy = React.lazy(() => import("./components/PrivacyPolicy"));
const ChatPage = React.lazy(() => import("./components/ChatPage"));
const Email = React.lazy(() => import("./components/Email"));
const About = React.lazy(() => import("./components/About"));
const FAQ = React.lazy(() => import("./components/FAQ"));
const Page404 = React.lazy(() => import("./components/Page404"));

import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import PersistenLogin from "./components/PersistenLogin";
import { ToastContainer } from 'react-toastify';
import ReactLoading from "react-loading"
import 'react-toastify/dist/ReactToastify.css';

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
            <Route exact path="/loginwithgoogle" element={
              <Suspense fallback={<ReactLoading type="bars" color="text-indigo-500" />}>
                <LogSign title="QUERYMATE" />
              </Suspense>
            } />
            <Route exact path="/login" element={
              <Suspense fallback={<ReactLoading type="bars" color="text-indigo-500" />}>
                <LogIn />
              </Suspense>
            } />
            <Route exact path="/signupmail" element={
              <Suspense fallback={<ReactLoading type="bars" color="text-indigo-500" />}>
                <SignEmail />
              </Suspense>
            } />
            <Route exact path="/signuppassword" element={
              <Suspense fallback={<ReactLoading type="bars" color="text-indigo-500" />}>
                <SignupPassword />
              </Suspense>
            } />
            <Route exact path="/resetpassword" element={
              <Suspense fallback={<ReactLoading type="bars" color="text-indigo-500" />}>
                <Email />
              </Suspense>
            } />
            <Route exact path="/notify" element={
              <Suspense fallback={<ReactLoading type="bars" color="text-indigo-500" />}>
                <ResetPassword />
              </Suspense>
            } />
            <Route exact path="/resetpassword-mail" element={
              <Suspense fallback={<ReactLoading type="bars" color="text-indigo-500" />}>
                <MailResetPassword />
              </Suspense>
            } />
            <Route exact path="/check-inbox" element={
              <Suspense fallback={<ReactLoading type="bars" color="text-indigo-500" />}>
                <ResetPassword />
              </Suspense>
            } />
            <Route exact path="/verify">
              <Route exact path=":token=?" element={
                <Suspense fallback={<ReactLoading type="bars" color="text-indigo-500" />}>
                  <Verify />
                </Suspense>
              } />
            </Route>
            <Route exact path="/privacy" element={
              <Suspense fallback={<ReactLoading type="bars" color="text-indigo-500" />}>
                <PrivacyPolicy />
              </Suspense>
            } />
            <Route exact path="/about" element={
              <Suspense fallback={<ReactLoading type="bars" color="text-indigo-500" />}>
                <About />
              </Suspense>
            } />
            <Route exact path="/help" element={
              <Suspense fallback={<ReactLoading type="bars" color="text-indigo-500" />}>
                <FAQ />
              </Suspense>
            } />
            <Route exact path="*" element={
              <Suspense fallback={<ReactLoading type="bars" color="text-indigo-500" />}>
                <Page404 />
              </Suspense>
            } />
            <Route exact path="/password" element={
              <Suspense fallback={<ReactLoading type="bars" color="text-indigo-500" />}>
                <CreateNewPassword />
              </Suspense>
            } />
            <Route exact path="/new-password-created" element={
              <Suspense fallback={<ReactLoading type="bars" color="text-indigo-500" />}>
                <NewPasswordCreated />
              </Suspense>
            } />
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route exact path="/chat" element={
                <Suspense fallback={<ReactLoading type="bars" color="text-indigo-500" />}>
                  <ChatPage />
                </Suspense>
              }></Route>
              <Route exact path="/upload" element={
                <Suspense fallback={<ReactLoading type="bars" color="text-indigo-500" />}>
                  <InputPage />
                </Suspense>
              }></Route>
            </Route>
          </Route>
        </Routes>
      </Router>


    </>
  )
}