import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import { AppProvider } from './context/AppContext.jsx'
import {Toaster} from "sonner"
import { AuthProvider } from './context/AuthContext.jsx'
import { AppProvider } from './context/AppContext.jsx'




createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <AppProvider>

     <AuthProvider>
        <App />
        <Toaster/>
     </AuthProvider>
    </AppProvider>
    
    </BrowserRouter>
)
