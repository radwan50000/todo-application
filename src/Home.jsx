import HomeNav from './HomeComponents/HomeNav.jsx';
import AddTask from './HomeComponents/AddTask.jsx';
import {useState , useEffect } from 'react';

const Home = () => {
    const [addTaskSection , setAddTaskSection] = useState(true);
    const [searchSection , setSearchSection] = useState(false);
    const [todaySection , setTodaySection] = useState(false);
    const [weeklySection , setWeeklySection] = useState(false);
    const [customSection , setCustomSection] = useState(false);
    const [manuallyAddedTasks, setManuallyAddedTasks] = useState([]);

    return (
        <>
            <div
                className='flex flex-row items-start
                    bg-gray-bg w-full h-dvh
                    '>
                <HomeNav tasks={manuallyAddedTasks}/>
                {
                    addTaskSection ?
                        <AddTask setTasks={setManuallyAddedTasks} tasks={manuallyAddedTasks}/>:null
                }
            </div>
        </>
    )
}


export default Home;