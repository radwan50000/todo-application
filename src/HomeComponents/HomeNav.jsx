import Cookies from "js-cookie";
import userImg from '../assets/user.png';
import splitView from '../assets/split.png';
import addImg from '../assets/add.png';
import searchImg from '../assets/magnifying-glass.png';
import todayImg from '../assets/june.png';
import weekImg from '../assets/calendar.png';
import signOut from '../assets/logout.png';

const HomeNav = () => {
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
                    className={'task-nav-bar'}>
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
        </>
    )
}

export default HomeNav;