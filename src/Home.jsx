import HomeNav from './HomeComponents/HomeNav.jsx';
import AddTask from './HomeComponents/AddTask.jsx';
import {useState , useEffect } from 'react';
import CustomTaskComponent from "./HomeComponents/CustomTaskComponent.jsx";
import DailyComponent from './HomeComponents/DailyComponent.jsx';
import todayImg from "./assets/june.png";
import weekImg from "./assets/calendar.png";
import WeeklyComponent from './HomeComponents/WeeklyComponent.jsx';

const Home = () => {
    const [addTaskSection , setAddTaskSection] = useState(true);
    const [searchSection , setSearchSection] = useState(false);
    const [todaySection , setTodaySection] = useState(false);
    const [weeklySection , setWeeklySection] = useState(false);
    const [customSection , setCustomSection] = useState(false);
    const [manuallyAddedTasks, setManuallyAddedTasks] = useState(localStorage.getItem('custom-tasks') === null ? []:JSON.parse(localStorage.getItem('custom-tasks')));
    const [taskId , setTaskId] = useState('');


    const initTodayLS = () => {
        if(localStorage.getItem('daily-tasks') === null){
            const obj = {
                'projectTitle': 'Daily Tasks',
                'projectIcon': todayImg,
                'tasks': [],
            }
            localStorage.setItem('daily-tasks',JSON.stringify(obj));
        }
    }

    const initWeeklyLS = () => {
        if(localStorage.getItem('weekly-tasks') === null){
            const obj = {
                'projectTitle': 'Weekly Tasks',
                'projectIcon': weekImg,
                'tasks': [],
            }
            localStorage.setItem('weekly-tasks',JSON.stringify(obj));
        }
    }

    const customSectionEnable = () => {
        setCustomSection(true);
        setAddTaskSection(false);
        setSearchSection(false);
        setWeeklySection(false);
        setTodaySection(false);
    }

    const weeklySectionEnable = () => {
        setCustomSection(false);
        setAddTaskSection(false);
        setSearchSection(false);
        setWeeklySection(true);
        setTodaySection(false);
    }

    const addTaskSectionEnable = () => {
        setCustomSection(false);
        setAddTaskSection(true);
        setSearchSection(false);
        setWeeklySection(false);
        setTodaySection(false);
    }

    const dailySectionEnable = () => {
        setCustomSection(false);
        setAddTaskSection(false);
        setSearchSection(false);
        setWeeklySection(false);
        setTodaySection(true);
    }

    useEffect(() => {
        initTodayLS();
        initWeeklyLS();
    },[])

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
                    dailySectionEnable={dailySectionEnable}
                    weeklySectionEnable={weeklySectionEnable}
                />
                {
                    addTaskSection ?
                        <AddTask
                            setTasks={setManuallyAddedTasks}
                            tasks={manuallyAddedTasks}/> :
                        customSection ?
                            <CustomTaskComponent
                                task={manuallyAddedTasks}
                                setTask={setManuallyAddedTasks}
                                taskId={taskId}
                                addTaskSectionEnable={addTaskSectionEnable}
                            />
                        :todaySection ?
                            <DailyComponent/>
                        :weeklySection ?
                            <WeeklyComponent/>
                        : null
                }
            </div>
        </>
    )
}


export default Home;