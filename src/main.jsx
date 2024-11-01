import React from 'react'
import ReactDOM from 'react-dom/client'
import MainRouter from './MainRouter'
import './index.css'  // Esta línea es crucial

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>,
)