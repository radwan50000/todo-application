import HomeNav from './HomeComponents/HomeNav.jsx';
import AddTask from './HomeComponents/AddTask.jsx';
import {useState, useEffect,useRef} from 'react';
import CustomTaskComponent from "./HomeComponents/CustomTaskComponent.jsx";
import DailyComponent from './HomeComponents/DailyComponent.jsx';
import Hammer from 'hammerjs';
import WeeklyComponent from './HomeComponents/WeeklyComponent.jsx';
import Setting from './HomeComponents/Setting.jsx';
import AppData from './HomeComponents/AppData.jsx';

const Home = () => {
    const PageContainer = useRef(null);
    const [addTaskSection , setAddTaskSection] = useState(false);
    const [searchSection , setSearchSection] = useState(false);
    const [todaySection , setTodaySection] = useState(true);
    const [weeklySection , setWeeklySection] = useState(false);
    const [customSection , setCustomSection] = useState(false);
    const [manuallyAddedTasks, setManuallyAddedTasks] = useState(localStorage.getItem('custom-tasks') === null ? []:JSON.parse(localStorage.getItem('custom-tasks')));
    const [taskId , setTaskId] = useState('');
    const [navMenuOpened, setNavMenuOpened] = useState(false);
    const [canOpenNavMenu, setCanOpenNavMenu] = useState(true);
    const [settingSection, setSettingSection] = useState(true);
    const [settingDataToShow , setSettingDataToShow] = useState({});


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
        if(!settingSection){
            const hammer = new Hammer(PageContainer.current);
            hammer.get("swipe").set({ direction: Hammer.DIRECTION_HORIZONTAL});
            hammer.get("pan").set({
                direction: Hammer.DIRECTION_HORIZONTAL,
                threshold: 350,
                pointers: 1
            });

            hammer.on('panleft',(e) => {
                if(canOpenNavMenu){
                    setNavMenuOpened(false);
                }
            })

            hammer.on('panright',() => {
                if(canOpenNavMenu){
                    setNavMenuOpened(true);
                }
            })
        }
    },[settingSection]);



    return (
        <>
                <AppData value={
                    {
                        settingSection,
                        setSettingSection,
                        setSettingDataToShow,
                        manuallyAddedTasks,
                        setManuallyAddedTasks,
                        taskId,
                    }

                }>
                    {
                        settingSection ?
                            <Setting />
                            :
                            <div
                                className='flex flex-row items-start
                                bg-gray-bg w-full h-dvh
                                '
                                            ref={PageContainer}
                            >
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
                                    navMenuOpened={navMenuOpened}
                                    setNavMenuOpened={setNavMenuOpened}
                                    canOpenNavMenu={canOpenNavMenu}
                                    setCanOpenNavMenu={setCanOpenNavMenu}
                                />
                                {
                                    addTaskSection ?
                                        <AddTask
                                            setTasks={setManuallyAddedTasks}
                                            tasks={manuallyAddedTasks}
                                            navMenuOpened={navMenuOpened}
                                            setNavMenuOpened={setNavMenuOpened}
                                            customSectionEnable={customSectionEnable}
                                            setTaskId={setTaskId}
                                        /> :
                                        customSection ?
                                            <CustomTaskComponent
                                                task={manuallyAddedTasks}
                                                setTask={setManuallyAddedTasks}
                                                taskId={taskId}
                                                addTaskSectionEnable={addTaskSectionEnable}
                                                navMenuOpened={navMenuOpened}
                                                setNavMenuOpened={setNavMenuOpened}
                                            />
                                            :todaySection ?
                                                <DailyComponent
                                                    navMenuOpened={navMenuOpened}
                                                    setNavMenuOpened={setNavMenuOpened}
                                                />
                                                :weeklySection ?
                                                    <WeeklyComponent
                                                        navMenuOpened={navMenuOpened}
                                                        setNavMenuOpened={setNavMenuOpened}
                                                    />
                                                    : null
                                        }
                           </div>
                    }
                </AppData>
        </>
    )
}


export default Home;