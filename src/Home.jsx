import HomeNav from './HomeComponents/HomeNav.jsx';
import AddTask from './HomeComponents/AddTask.jsx';
import {useState , useEffect } from 'react';

const Home = () => {
    const [addTaskSection , setAddTaskSection] = useState(true);
    const [searchSection , setSearchSection] = useState(false);
    const [todaySection , setTodaySection] = useState(false);
    const [weeklySection , setWeeklySection] = useState(false);



    return (
        <>
            <div
                className='flex flex-row items-start
                    bg-gray-bg w-full h-dvh
                    '>
                <HomeNav/>
                {
                    addTaskSection ?
                        <AddTask/>:null
                }
            </div>
        </>
    )
}


export default Home;