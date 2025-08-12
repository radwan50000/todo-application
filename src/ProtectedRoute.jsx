import Cookies from 'js-cookie';
import {useEffect , useState} from 'react';
import {useNavigate} from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const [goHome , setGoHome] = useState(false);
    const nav = useNavigate();


    useEffect(() => {
        if(Cookies.get('username') !== undefined){
            setGoHome(true);
            console.log(Cookies.get('test'));
        }else{
            setGoHome(false);
            nav('/');
        }
    },[])




    return (
        <>
            {
                goHome ? children :null
            }

        </>
    )
}


export default ProtectedRoute;