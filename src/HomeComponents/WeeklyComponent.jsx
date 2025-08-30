import {useEffect, useRef, useState} from "react";
import TaskComponent3 from "./TaskComponent3.jsx";
import redFlag from "../assets/redFlag.png";
import yellowFlag from "../assets/yellowFlag.png";
import greenFlag from "../assets/greenFlag.png";
import blueFlag from "../assets/blueFlag.png";
import {toast, ToastContainer} from "react-toastify";
import {v4 as uuidv4} from 'uuid';
import SaveWeeklyTasks from "./SaveWeeklyTasks.jsx";
import MenuCloseNavButton from "./MenuCloseNavButton.jsx";
import SaveDailyTasks from "./SaveDailyTasks.js";
import saveWeeklyTasks from "./SaveWeeklyTasks.jsx";
import SettingGear from "./SettingGear.jsx";


const WeeklyComponent = (
        {
            setNavMenuOpened,
            navMenuOpened
        }
    ) => {
    const header = useRef(null);
    const addTaskContainer = useRef(null);
    const ST_toAdd = useRef(null);
    const removePageSection = useRef(null);
    const [dailyObj , setDailyObj] = useState(JSON.parse(localStorage.getItem('weekly-tasks')));
    const [projectName, setProjectName] = useState('');
    const [projectImg , setProjectImg] = useState(null);
    const [completed , setCompleted] = useState(0);
    const [tasks , setTasks] = useState([]);
    const [noOfTasks , setNoOfTasks] = useState(0);

    const activeTask = (e,className) => {
        const ele = document.querySelectorAll('.task-img');
        ele.forEach(ele => {
            ele.classList.remove(className);
        })
        e.target.classList.add(className);
    }



    useEffect(() => {
        console.log(dailyObj);
        setProjectName(dailyObj.projectTitle);
        setProjectImg(dailyObj.projectIcon);
        setTasks([...dailyObj.tasks]);
        setNoOfTasks(dailyObj.tasks.length);
        setCompleted(dailyObj.tasks.filter((t) => t.done).length);
    },[dailyObj]);


    return (
        <>
            <div className='right-component-style no-scrollbar'>
                <div
                    className='opt-header'
                >
                    <MenuCloseNavButton
                        setNavMenuOpened={setNavMenuOpened}
                        navMenuOpened={navMenuOpened}
                    />
                    <SettingGear
                    />
                </div>
                <div className='C-H-o-Component'>
                    <div
                        className='H-o-Component'
                    >
                        <div
                            className='l-H-o-Component'
                        >
                            <img
                                src={projectImg}
                                alt='task image'
                            />
                            <h1
                                className='cairo'
                                ref={header}
                            >
                                {projectName}
                            </h1>
                        </div>
                        <span
                            className='r-H-o-Component cairo'
                        >
                        {completed} / {noOfTasks}
                    </span>
                    </div>
                    <div
                        className='T-C-loadedIn no-scrollbar'
                    >
                        {
                            tasks.map((t) => {
                                return (
                                    <TaskComponent3
                                        setCompleted={setCompleted}
                                        allTasks={dailyObj}
                                        setAllTasks={setDailyObj}
                                        key={t.id}
                                        taskId={t.id}
                                        flag={t.priority}
                                        task={t.task}
                                        isDone={t.done}
                                        setNoOfTasks={setNoOfTasks}
                                        noOfTasks={noOfTasks}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div
                    className='add-remove-buttons-container'
                >
                    <div
                        className='danger-buttons'
                        style={{visibility: noOfTasks > 0 ? 'visible' : 'hidden'}}
                        onClick={() => {
                            removePageSection.current.style.display = 'flex';
                        }}>
                        Clear All
                    </div>
                    <div
                        className='buttons'
                        onClick={() => {
                            addTaskContainer.current.style.display = 'flex';
                            ST_toAdd.current.focus();
                        }}>
                        Add Task
                    </div>
                </div>
            </div>
            <div
                ref={addTaskContainer}
                className='w-full h-dvh
                absolute top-0 left-0
                items-center justify-center
                z-95 bg-trans-white hidden
                '
            >
                <div
                    className='addTaskToTasksContainer'
                >
                    <div
                        className='enterTaskNameContainer'>
                        <h3
                            className='taskTitle cairo'>
                            Task
                        </h3>
                        <input
                            type='text'
                            placeholder=''
                            className='taskInputField'
                            ref={ST_toAdd}
                        />
                        <h3
                            className='text-xl font-medium cairo text-red-800 select-none
                            xl:inline-block
                            max-sm:hidden sm:hidden
                            '>
                            * required field
                        </h3>
                    </div>
                    <div
                        className='enterTaskPriorityContainer'>
                        <h3
                            className='priorityTitle cairo'>
                            Task Priority
                        </h3>
                        <div className='flex flex-row gap-2 w-fit'>
                            {
                                [
                                    {
                                        'flagType': 'red flag',
                                        'flagImg': redFlag,
                                    },
                                    {
                                        'flagType': 'yellow flag',
                                        'flagImg': yellowFlag
                                    },
                                    {
                                        'flagType': 'green flag',
                                        'flagImg': greenFlag
                                    },
                                    {
                                        'flagType': 'blue flag',
                                        'flagImg': blueFlag,
                                    }].map((ele, index) => {
                                    return (
                                        <img
                                            src={ele.flagImg}
                                            key={index}
                                            alt={ele.flagType}
                                            id={ele.flagType}
                                            className= {index > 0 ? 'task-img select-none':'task-img active-flag-img select-none'}
                                            onClick={(e) => activeTask(e,'active-flag-img')}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div
                        className='flex flex-row items-center justify-end gap-4'
                    >
                        <div
                            className='danger-buttons'
                            onClick={() => {
                                addTaskContainer.current.style.display = 'none';
                                ST_toAdd.current.value = ''
                            }}>
                            Cancel
                        </div>
                        <div
                            className='addTaskButton'
                            onClick={() => {
                                if(ST_toAdd.current.value.trim() !== '') {
                                    const uniqueID = uuidv4();
                                    const obj = {
                                        'task': ST_toAdd.current.value.trim(),
                                        'priority': document.querySelector('.active-flag-img').src,
                                        'done': false,
                                        'id': uniqueID,
                                    }
                                    dailyObj.tasks.push(obj);
                                    setTasks(dailyObj.tasks);
                                    setNoOfTasks(dailyObj.tasks.length);
                                    saveWeeklyTasks(dailyObj);
                                    ST_toAdd.current.value = ''
                                    addTaskContainer.current.style.display = 'none';
                                }else {
                                    toast('No Data Entered!',{
                                        theme: 'dark',
                                        closeOnClick: true,
                                        type: 'warning',
                                    });
                                }
                            }}
                        >
                            Add Task
                        </div>
                    </div>
                </div>
            </div>
            <div
                ref={removePageSection}
                className='w-full h-dvh
                absolute top-0 left-0
                items-center justify-center
                z-95 bg-trans-white hidden
                '
            >
                <div
                    className='py-16 px-12 bg-gray-bg rounded-md
                    text-gray-300 flex flex-col gap-8 m-8
                    '
                >
                    <div
                        className='flex flex-row items-center gap-4'>

                        <p
                            className='text-2xl font-light cairo w-fit text-gray-300'
                        >
                            <span
                                className='text-2xl font-black cairo w-fit text-red-800 px-1 underline'>
                                Alert!
                            </span> you are now about to remove all tasks in this page, are you sure you want to delete them ?
                        </p>
                    </div>

                    <div
                        className='flex flex-row items-center justify-end gap-4'
                    >
                        <div
                            className='buttons'
                            onClick={() => {
                                removePageSection.current.style.display = 'none';
                            }}
                        >
                            Cancel
                        </div>
                        <div
                            className='danger-buttons'
                            onClick={() => {
                                dailyObj.tasks = [];
                                setDailyObj(dailyObj);
                                SaveWeeklyTasks(dailyObj);
                                setTasks(dailyObj.tasks);
                                setNoOfTasks(dailyObj.tasks.length);
                                setCompleted(0);
                                console.log(dailyObj);
                                removePageSection.current.style.display = 'none';
                            }}>
                            Clear All
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default WeeklyComponent;