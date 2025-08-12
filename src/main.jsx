import { createRoot } from 'react-dom/client'
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import './index.css'
import Login from './Login.jsx'
import {StrictMode} from "react";
import ProtectedRoute from './ProtectedRoute.jsx';
import Home from './Home.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/Home' element={
                    <ProtectedRoute>
                        <Home/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
