import { createRoot } from 'react-dom/client'
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import './index.css'
import Login from './Login.jsx'
import {StrictMode} from "react";
import ProtectedRoute from './ProtectedRoute.jsx';
import Home from './Home.jsx';
import Loading from './Loading.jsx';
import NotFound from './NotFound.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/Login' element={<Login />} />
                <Route path='/Home' element={
                    <ProtectedRoute>
                        <Home/>
                    </ProtectedRoute>
                }/>
                <Route path='/*' element={<NotFound/>} />
                <Route path='/' element={<Loading/>} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
