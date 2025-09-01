import Cookies from 'js-cookie';
import Lottie from "lottie-react";
import loading from './assets/Loading Files.json';
import {useNavigate} from 'react-router-dom';
import todayImg from "./assets/june.png";
import weekImg from "./assets/date-svgrepo-com.svg";
const Loading = () => {
    const nav = useNavigate();

    const initTodayLS = () => {
        if(localStorage.getItem('daily-tasks') === null){
            const obj = {
                'projectTitle': 'Daily Tasks',
                'projectIcon': todayImg,
                'tasks': [],
            }
            localStorage.setItem('daily-tasks',JSON.stringify(obj));
        }
    }

    const initCustomLS = () => {
        if(localStorage.getItem('custom-tasks') === null){
            localStorage.setItem('custom-tasks',JSON.stringify([]));
        }
    }

    const initWeeklyLS = () => {
        if(localStorage.getItem('weekly-tasks') === null){
            const obj = {
                'projectTitle': 'Weekly Tasks',
                'projectIcon': weekImg,
                'tasks': [],
            }
            localStorage.setItem('weekly-tasks',JSON.stringify(obj));
        }
    }

    setTimeout(
        () => {
            if(Cookies.get('username') !== undefined) {
                initTodayLS();
                initWeeklyLS();
                initCustomLS();
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