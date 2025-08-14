import Cookies from "js-cookie";
import userImg from '../assets/user.png';
import splitView from '../assets/split.png';
import addImg from '../assets/add.png';
import searchImg from '../assets/magnifying-glass.png';
import todayImg from '../assets/june.png';
import weekImg from '../assets/calendar.png';
import signOut from '../assets/logout.png';
import {useNavigate} from 'react-router-dom';
import {useRef} from 'react';

const HomeNav = () => {
    const nav = useNavigate();
    const confirmSignOutContainer = useRef(null);
    const confirmSignOutField = useRef(null);

    return (
        <>
            <div
                className='flex flex-col p-4
                    h-dvh w-[24rem] justify-between'>
               <div
                    className='flex flex-col'>
                   <div
                       className='flex flex-row items-center mb-8
                    justify-between select-none'>
                       <div
                           className='flex flex-row items-center
                        gap-2'>
                           <img
                               src={userImg}
                               alt='user image'
                               className='w-5  rounded-full
                        border-4 border-pink-500 invert-100 p-2
                        box-content'
                           />
                           <p
                               className='text-white cairo font-bold text-2xl'>
                               {
                                   Cookies.get('username')
                               }
                           </p>
                       </div>
                       <img
                           src={splitView}
                           alt={'split view image'}
                           className='w-6 invert-100 mr-4 cursor-pointer contrast-100
                            hover:invert-70 transition duration-350 ease-in-out'
                       />
                   </div>
                   <div
                       className={'task-nav-bar'}>
                       <img
                           src={addImg}
                           alt={'add icon image'}
                       />
                       <p
                           className='text-red-200'>
                           Add Task
                       </p>
                   </div>
                   <div
                       className={'task-nav-bar '}>
                       <img
                           src={searchImg}
                           alt={'search icon image'}
                           className='invert-60'
                       />
                       <p>
                           Search
                       </p>
                   </div>
                   <div
                       className={'task-nav-bar'}>
                       <img
                           src={todayImg}
                           alt={'today icon image'}
                       />
                       <p>
                           Today
                       </p>
                   </div>
                   <div
                       className={'task-nav-bar'}>
                       <img
                           src={weekImg}
                           alt={'add icon image'}
                           className='invert-60'
                       />
                       <p>
                           Week
                       </p>
                   </div>
                   <h2
                       className='py-3 px-2 text-3xl font-bold text-gray-300'>
                       My Projects
                   </h2>
               </div>
                <div
                    className={'task-nav-bar'}
                    onClick={() => {
                        confirmSignOutContainer.current.style.display = 'flex';
                    //     const allCookies = Object.keys(Cookies.get());
                    //     allCookies.forEach((cookie) => Cookies.remove(cookie));
                    //     nav('/');
                    }}>
                    <img
                        src={signOut}
                        alt={'add icon image'}
                        className='invert-60'
                    />
                    <p>
                        Sign Out
                    </p>
                </div>
            </div>
            <div
                className='flex w-full h-dvh items-center justify-center
                        absolute bg-trans-white z-95 hidden'
                ref={confirmSignOutContainer}>
                <div
                    className='w-6/12 h-fit pt-18 pb-8 px-12 bg-white rounded-md
                        relative flex flex-col items-center'>
                    <h1
                        className='text-red-800 text-8xl font-black cairo'>
                        Warning
                    </h1>
                    <p
                        className='text-black text-2xl my-8 font-medium'>
                        by sign out all data will be loss and deleted forever . you will can't retrieve it again , make sure that you don't have any important or sensitive data to loss here . <br/> To confirm sign out please enter your password :
                    </p>
                    <input
                        type='password'
                        placeholder=''
                        className='w-8/12 outline-none border-3 border-black rounded-md p-2
                        text-5xl text-center'
                        ref={confirmSignOutField}
                        />
                    <div
                        className='w-8/12 border-red-800 border-4 py-4 text-4xl
                            mt-4 text-red-800 rounded-md font-black cairo flex items-center justify-center
                            cursor-pointer transition duration-350 ease-out select-none hover:bg-red-800 hover:text-white'
                            onClick={() => {
                                if(confirmSignOutField.current.value.trim() === Cookies.get('password')) {
                                    Cookies.remove('username');
                                    Cookies.remove('password');
                                    nav('/');
                                }else {
                                    confirmSignOutField.current.style.borderColor = 'red';
                                }
                            }}>
                        <p>
                            Sign Out
                        </p>
                    </div>
                    <div className='absolute top-2 right-2 w-fit h-fit p-1
                     text-3xl font-black cairo bg-red-800 text-white
                     transition duration-250 ease-in-out
                     rounded-sm select-none cursor-pointer hover:opacity-70
                    '
                        onClick={() => {
                            confirmSignOutContainer.current.style.display= 'none';
                        }}>
                        ✘
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeNav;