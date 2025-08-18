import HomeNav from './HomeComponents/HomeNav.jsx';
import AddTask from './HomeComponents/AddTask.jsx';
import {useState , useEffect } from 'react';
import CustomTaskComponent from "./HomeComponents/CustomTaskComponent.jsx";

const Home = () => {
    const [addTaskSection , setAddTaskSection] = useState(true);
    const [searchSection , setSearchSection] = useState(false);
    const [todaySection , setTodaySection] = useState(false);
    const [weeklySection , setWeeklySection] = useState(false);
    const [customSection , setCustomSection] = useState(false);
    const [manuallyAddedTasks, setManuallyAddedTasks] = useState([]);
    const [taskId , setTaskId] = useState('');

    return (
        <>
            <div
                className='flex flex-row items-start
                    bg-gray-bg w-full h-dvh
                    '>
                <HomeNav
                    tasks={manuallyAddedTasks}
                    setCustomSection={setCustomSection}
                    setWeeklySection={setWeeklySection}
                    setTodaySection={setTodaySection}
                    setSearchSection={setSearchSection}
                    setAddTaskSection={setAddTaskSection}
                    setTaskId={setTaskId}
                />
                {
                    addTaskSection ?
                        <AddTask setTasks={setManuallyAddedTasks} tasks={manuallyAddedTasks}/> :
                        customSection ?
                            <CustomTaskComponent task={manuallyAddedTasks} taskId={taskId}/>: null
                }
            </div>
        </>
    )
}


export default Home;