import Cookies from "js-cookie";
import userImg from '../assets/user.png';
import splitView from '../assets/nav-icon.svg';
import addImg from '../assets/add.png';
import searchImg from '../assets/magnifying-glass.png';
import todayImg from '../assets/june.png';
import weekImg from '../assets/calendar.png';
import signOut from '../assets/logout.png';
import warningImg from '../assets/warning-svgrepo-com.svg';
import {useNavigate} from 'react-router-dom';
import {useRef, useState} from 'react';
import {useEffect} from 'react';


const HomeNav = (
    {
        tasks,
        setAddTaskSection,
        setTodaySection,
        dailySectionEnable,
        setWeeklySection,
        setSearchSection,
        setCustomSection,
        setTaskId,
        weeklySectionEnable,
        navMenuOpened,
        setNavMenuOpened,
        canOpenNavMenu,
        setCanOpenNavMenu
    }) => {
    const nav = useNavigate();
    const navMenu = useRef(null);
    const confirmSignOutContainer = useRef(null);
    const confirmSignOutField = useRef(null);
    //CTB_Container -> Custom Tasks Button Container
    const CTB_Container = useRef(null);

    window.addEventListener("resize", () => {
        window.innerWidth <= 1280 ? setCanOpenNavMenu(true):setCanOpenNavMenu(false);
    });

    const customSectionEnable = () => {
        setCustomSection(true);
        setAddTaskSection(false);
        setSearchSection(false);
        setWeeklySection(false);
        setTodaySection(false);
    }

    const addTaskSectionEnable = () => {
        setCustomSection(false);
        setAddTaskSection(true);
        setSearchSection(false);
        setWeeklySection(false);
        setTodaySection(false);
    }

    const clostNavMenuWhenPressOnTask = () => {
        document.querySelectorAll('.task-nav-bar').forEach((btn) => {
            btn.addEventListener('click', () => {
                if(canOpenNavMenu) {
                    setNavMenuOpened(false);
                }
            })
        })

        document.querySelectorAll('.custom-task-button').forEach((btn) => {
            btn.addEventListener('click', () => {
                if(canOpenNavMenu) {
                    setNavMenuOpened(false);
                }
            })
        })
    }

    useEffect(() => {
        window.innerWidth <= 1280 ? setCanOpenNavMenu(true):setCanOpenNavMenu(false);
        
        clostNavMenuWhenPressOnTask();

    },[tasks]);

    return (
        <>
            <div
                className='flex flex-col p-4
                    h-dvh w-[24rem] justify-between
                    overflow-x-hidden overflow-y-scroll no-scrollbar
                    transition duration-250 ease-in-out
                    bg-gray-bg
                    z-50
                    xl:flex xl:relative
                    max-sm:absolute max-sm:top-0 max-sm:left-0
                    sm:absolute sm:top-0 sm:left-0
                    '
                    ref={navMenu}
                style={{transform: canOpenNavMenu ? navMenuOpened ? 'translateX(0%)':'translateX(-100%)':'translateX(0%)'}}
            >
               <div
                    className='flex flex-col relative'>
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
                           className='w-6 mr-4 cursor-pointer contrast-100
                            hover:invert-70 transition duration-350 ease-in-out
                            xl:hidden
                            max-sm:inline-block sm:inline-block
                            '
                           onClick={() => {
                               setNavMenuOpened(!navMenuOpened);
                           }}
                       />
                   </div>
                   <div
                       className={'task-nav-bar'}
                        onClick={() => {
                            addTaskSectionEnable();
                        }}
                   >
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
                       className={'task-nav-bar'}
                        onClick={() => {
                            dailySectionEnable();
                        }}
                   >
                       <img
                           src={todayImg}
                           alt={'today icon image'}
                       />
                       <p>
                           Today
                       </p>
                   </div>
                   <div
                       className={'task-nav-bar'}
                        onClick={() => {
                            weeklySectionEnable();
                        }}
                   >
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
                   <div
                        className='w-full h-[45vh]
                            flex flex-col items-start justify-start gap-4
                            overflow-y-scroll overflow-x-hidden no-scrollbar
                            '
                        ref={CTB_Container}
                   >
                       {
                           tasks.map((task) => {
                               return (
                                   <div id={task.taskid} key={task.taskid}
                                        className='custom-task-button'
                                        onClick={() => {
                                            customSectionEnable();
                                            setTaskId(task.taskid);
                                        }}
                                   >
                                       <img
                                           src={task.taskicon}
                                           alt={'task icon'}
                                           className='w-6'
                                       />
                                        <h2>
                                            {task.taskname}
                                        </h2>
                                   </div>
                               )
                           })
                       }
                   </div>
               </div>
                <div
                    className={'task-nav-bar'}
                    onClick={() => {
                        confirmSignOutContainer.current.style.display = 'flex';
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
                    className='w-6/12 h-fit pb-8 bg-white rounded-md overflow-hidden
                        relative flex flex-col items-center'>
                    <div
                        className='flex items-center justify-center w-full py-4 h-fit bg-[#ffb703]'
                    >
                        <img
                            src={warningImg}
                            alt='warning img'
                            className='w-4/12'
                            />
                    </div>
                    <p
                        className='text-text-dark text-2xl my-8 font-medium px-9'>
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
                                    localStorage.clear();
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
                     text-3xl font-black cairo bg-text-dark text-white
                     transition duration-250 ease-in-out
                     rounded-sm select-none cursor-pointer hover:shadow-xs hover:shadow-gray-600
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