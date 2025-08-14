import wave from './assets/wave.svg';
import ill_image from './assets/image-1.png';
import pen_img1 from './assets/pen1.svg';
import pen_img2 from './assets/anim-img1.webp';
import {gsap} from 'gsap';
import {useEffect} from 'react';
import {useGSAP} from '@gsap/react';
import {useRef} from 'react';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const userName = useRef(null);
    const password = useRef(null);
    const pen_1 = useRef(null);
    const pen_2 = useRef(null);
    const nav = useNavigate();
    const api_key = 'https://api.quotable.io/random?tags=education|study|success';
    const quote = useRef(null);
    const quote_auth = useRef(null);

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
                quote.current.innerHTML = data.content;
                quote_auth.current.innerHTML = data.author;
            });
    }

    useEffect(() => {
        if(Cookies.get('username') !== undefined){
            nav('/Home');
        }
        getQuote();

    },[]);

    useGSAP(() => {
        const t1 = gsap.timeline();
        t1.fromTo(
            pen_1.current,
            {
                rotate: -30,
                y: 0,
            },
            {
                rotate: 10,
                y: 40,
                repeat: -1,
                yoyo: true,
                duration: 3,
                ease: 'power4.inOut',
            }
        )
    },[])


    return (
        <>
            <div
                className='w-full h-dvh flex flex-row
                items-start justify-between overflow-hidden'>
                <div className='w-5/12 h-dvh bg-transparent
                    pl-16 pb-32
                    flex justify-center flex-col'>
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
                                Cookies.set('username',userName.current.value.trim());
                                Cookies.set('password',password.current.value.trim());
                                nav('/Home');
                            }
                        }}>
                        SIGN IN
                    </div>
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
                        <img
                            src={ill_image}
                            alt={'working people image'}
                            className='w-5/12 bg-white p-16 box-content
                        rounded-full'
                        />
                        <span
                            className={'edu-font text-white max-w-8/12 text-center text-xl mt-10'}>
                            “ <span
                                className={'italic edu-font font-light'}
                                ref={quote}></span> ”
                        </span>
                        <span
                            className={' text-white w-fit text-sm'}
                        >
                            - <span
                                className={'italic'}
                                ref={quote_auth}
                                ></span> -
                        </span>
                    </span>
                    <img
                        src={pen_img1}
                        alt={'pen image'}
                        className='
                            absolute left-40 top-50 w-30
                            translate-x-[-50%] z-96 box-border
                            p-4 rounded-full invert-100
                            '
                        ref={pen_1}
                    />
                    <img
                        src={pen_img2}
                        alt={'pen image'}
                        className='
                            absolute right-0 bottom-20 w-30
                            translate-x-[-50%] z-96 contrast-[500%]
                            '
                        ref={pen_2}
                    />
                </div>
            </div>

        </>
    )
}

export default Login;