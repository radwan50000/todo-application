import Lottie from "lottie-react";
import _404 from './assets/Error 404.json';
import {useNavigate} from 'react-router-dom';

const NotFound = () => {
    const nav = useNavigate();

    return (
        <>
            <div
                className='w-full h-dvh bg-gray-bg-dark flex items-center justify-center
                    flex-col gap-8'>
                <div
                    className='bg-white
                    xl:p-16 xl:w-4/12 xl:rounded-full
                    max-sm:rounded-xl sm:rounded-xl
                    max-sm:w-8/12 sm:w-8/12
                    max-sm:p-4 sm:p-4
                    '
                    >
                    <Lottie animationData={_404}
                            loop={true}
                        />
                </div>
                <div
                    className='border-2 border-gray-300 rounded-md px-4 py-2
                        text-gray-300 text-2xl select-none cursor-pointer font-bold
                        transition duration-250 ease-in-out
                        hover:bg-gray-300 hover:text-gray-bg-dark'
                        onClick={() => {
                            nav('/');
                        }}
                    >
                    Home Page
                </div>
            </div>
        </>
    )
}

export default NotFound;