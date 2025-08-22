import Cookies from 'js-cookie';
import Lottie from "lottie-react";
import loading from './assets/Loading Files.json';
import {useNavigate} from 'react-router-dom';
const Loading = () => {
    const nav = useNavigate();

    setTimeout(
        () => {
            if(Cookies.get('username') !== undefined) {
                nav('/Home');
            }else{
                nav('/Login');
            }
            console.log(Cookies.get());
        },1000
    )

    return (
        <>
            <div
                className='w-full h-dvh bg-white
                    flex items-center justify-center'
            >
                <Lottie
                    animationData={loading}
                    loop={true}/>
            </div>
        </>
    )
}

export default Loading;