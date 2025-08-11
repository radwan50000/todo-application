import { createRoot } from 'react-dom/client'
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import './index.css'
import Login from './Login.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />} />
        </Routes>
    </BrowserRouter>
)
