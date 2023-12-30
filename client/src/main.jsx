import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ChatIdContext from './context/Chat/ChatID.jsx'
import SetData from "./context/Auth/SetData.jsx"
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChatIdContext>
      <SetData>
        <GoogleOAuthProvider
          clientId={import.meta.env.ID}>
          <App />
        </GoogleOAuthProvider>
      </SetData>
    </ChatIdContext>
  </React.StrictMode>,
)
