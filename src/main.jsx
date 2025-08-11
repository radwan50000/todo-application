import { createRoot } from 'react-dom/client'
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import './index.css'
import Login from './Login.jsx'
import {StrictMode} from "react";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
