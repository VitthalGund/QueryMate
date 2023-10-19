import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ChatIdContext from './context/ChatID.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChatIdContext>
      <App />
    </ChatIdContext>
  </React.StrictMode>,
)
