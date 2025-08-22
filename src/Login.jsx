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
    const [quoteData, setQuoteData] = useState(null);
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
                    setQuoteData(data);
            });
    }

    useEffect(() => {
        if(Cookies.get('username') !== undefined){
            nav('/');
        }else{
            !quoateLoaded ? getQuote():null;
        }
        if(quoateLoaded){
            quote.current.textContent = `“ ${quoteData.content} ”`;
            quote_auth.current.textContent = `- ${quoteData.author} -`;
        }

    },[quoateLoaded]);


    return (
        <>
            <div
                className='w-full h-dvh flex lg:flex-row
                items-start justify-between overflow-hidden relative max-sm:flex-col sm:flex-col'>
                <div className=' h-dvh bg-transparent
                    flex justify-center flex-col
                    lg:w-5/12 lg:pl-16 lg:pb-32
                    max-sm:w-12/12 sm:w-12/12 max-sm:px-4 sm:px-4
                    max-sm:py-8 sm:py-8
                    max-sm:justify-start sm:justify-start
                    '>
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
                            className='signIn-button'
                            onClick={() => {
                                if(
                                    userName.current.value.trim().length > 0
                                    &&
                                    password.current.value.trim().length > 0
                                ) {
                                    Cookies.set('username',userName.current.value.trim(),{
                                        secure: true,
                                        sameSite: 'Strict',
                                        expires: 36500,
                                    });
                                    Cookies.set('password',password.current.value.trim(),{
                                        secure: true,
                                        sameSite: 'Strict',
                                        expires: 36500,
                                    });
                                    nav('/');
                                }
                            }}>
                            SIGN IN
                        </div>
                    </form>
                </div>
                <div className='h-dvh bg-primary-blue
                       flex items-center justify-center
                       lg:w-7/12
                       max-sm:w-full sm:w-full
                        '>
                    <img
                        src={wave}
                        alt={'wave image'}
                        className='wave'
                        />
                    <span
                        className='flex flex-col gap-4 w-fit items-center'>
                        <div className='w-8/12 bg-white p-2 box-content
                         max-sm:hidden sm:hidden lg:flex
                        rounded-md'>
                            <Lottie animationData={ill_image}
                                    loop={true}
                            />
                        </div>

                        {
                            quoateLoaded ?
                            <div
                                className='flex flex-col gap-4 w-fit items-center'
                            >
                            <span
                                className='edu-font text-white max-w-8/12 text-center
                                    lg:text-xl lg:mt-10
                                    max-sm:text-sm sm:text-sm max-sm:mt-2 sm:mt-2
                                '>
                                <span className='italic edu-font font-light' ref={quote}></span>
                            </span>
                                <span
                                    className=' text-white w-fit
                                        lg:text-sm
                                        max-sm:text-[0.7rem] sm:text-[0.7rem]
                                        '
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