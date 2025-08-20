import wave from './assets/wave.svg';
import ill_image from './assets/Calendar image animation.json';
import {useEffect, useState} from 'react';
import {useRef} from 'react';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import Lottie from "lottie-react";

const Login = () => {
    const userName = useRef(null);
    const password = useRef(null);
    const nav = useNavigate();
    const api_key = 'https://api.quotable.io/random?tags=education|study|success';
    const quote = useRef(null);
    const quote_auth = useRef(null);
    const [quoateLoaded , setQuoteLoaded] = useState(false);

    const getQuote = async () => {
        fetch(api_key)
            .then(res => {
                if(res.status === 200  && res.ok === true){
                    return res;
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data !== null)
                    setQuoteLoaded(true);
                    quote.current.textContent = `“ ${data.content} ”`;
                    quote_auth.current.textContent = `- ${data.author} -`;

            });
    }

    useEffect(() => {
        if(Cookies.get('username') !== undefined){
            nav('/');
        }
        getQuote();

    },[])


    return (
        <>
            <div
                className='w-full h-dvh flex flex-row
                items-start justify-between overflow-hidden'>
                <div className='w-5/12 h-dvh bg-transparent
                    pl-16 pb-32
                    flex justify-center flex-col'>
                    <form>
                        <h1 className='text-7xl font-black mb-8'>
                            Sign In
                        </h1>
                        <div
                            className='login-input-container'
                        >
                            <h3
                                className='input-name'>
                                Username
                            </h3>
                            <input
                                type='text'
                                placeholder={'Enter Username ...'}
                                id={'username-input'}
                                key={'username-field'}
                                className='input-field'
                                ref={userName}
                            />
                        </div>
                        <div
                            className='login-input-container'
                        >
                            <h3
                                className='input-name'>
                                Password
                            </h3>
                            <input
                                type='password'
                                placeholder={'Enter Password ...'}
                                id={'password-input'}
                                key={'password-field'}
                                className='input-field'
                                ref={password}
                            />
                        </div>
                        <div
                            className='w-6/12 py-2 font-black text-white
                        text-xl flex items-center justify-center bg-black
                        rounded-md my-4 hover:bg-gray-700 transition ease-in-out duration-300
                        cursor-pointer select-none'
                            onClick={() => {
                                if(
                                    userName.current.value.trim().length > 0
                                    &&
                                    password.current.value.trim().length > 0
                                ) {
                                    Cookies.set('username',userName.current.value.trim(),{
                                        secure: true,
                                        sameSite: 'Strict'
                                    });
                                    Cookies.set('password',password.current.value.trim(),{
                                        secure: true,
                                        sameSite: 'Strict',
                                    });
                                    nav('/');
                                }
                            }}>
                            SIGN IN
                        </div>
                    </form>
                </div>
                <div className='w-7/12 h-dvh bg-primary-blue
                    relative flex items-center justify-center'>
                    <img
                        src={wave}
                        alt={'wave image'}
                        className='wave'
                        />
                    <span
                        className='flex flex-col gap-4 w-fit items-center'>
                        <div className='w-8/12 bg-white p-2 box-content
                        rounded-md'>
                            <Lottie animationData={ill_image}
                                    loop={false}
                            />
                        </div>

                        {
                            quoateLoaded ?
                            <div
                                className='flex flex-col gap-4 w-fit items-center'
                            >
                            <span
                                className={'edu-font text-white max-w-8/12 text-center text-xl mt-10'}>
                                <span className={'italic edu-font font-light'} ref={quote}></span>
                            </span>
                                <span
                                    className={' text-white w-fit text-sm'}
                                >
                                <span
                                    className={'italic'}
                                    ref={quote_auth}
                                ></span>
                            </span>
                            </div>
                                : <span
                                    className={'edu-font text-white max-w-8/12 text-center text-xl mt-10'}>
                                        Loading...
                                    </span>
                        }
                    </span>

                </div>
            </div>

        </>
    )
}

export default Login;