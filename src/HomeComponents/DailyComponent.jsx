import {useEffect, useRef, useState} from "react";
import TaskComponent3 from "./TaskComponent3.jsx";
import redFlag from "../assets/redFlag.png";
import yellowFlag from "../assets/yellowFlag.png";
import greenFlag from "../assets/greenFlag.png";
import blueFlag from "../assets/blueFlag.png";
import saveAllCustomTaskInLS from "../SaveAllCustomTasksInLS.js";
import {toast, ToastContainer} from "react-toastify";
import {v4 as uuidv4} from 'uuid';
import SaveAllCustomTasksInLS from "../SaveAllCustomTasksInLS.js";
import SaveDailyTasks from "./SaveDailyTasks.js";


const DailyComponent = () => {
    const header = useRef(null);
    const addTaskContainer = useRef(null);
    const ST_toAdd = useRef(null);
    const removePageSection = useRef(null);
    const [dailyObj , setDailyObj] = useState(JSON.parse(localStorage.getItem('daily-tasks')));
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
        dailyObj.tasks.forEach((t) => t.done? setCompleted(perv => perv+1):setCompleted(completed));
    },[dailyObj]);


    return (
        <>
            <div className='right-component-style no-scrollbar'>
                <div
                    className='flex flex-row items-center justify-between gap-4
                        w-[90%]'
                >
                    <div
                        className='flex flex-row items-center justify-between gap-4'
                    >
                        <img
                            src={projectImg}
                            alt='task image'
                            className='w-12'
                        />
                        <h1
                            className='text-5xl font-semibold text-gray-300 cairo'
                            ref={header}
                        >
                            {projectName}
                        </h1>
                    </div>
                    <span
                        className='text-3xl cairo'
                    >
                        {completed} / {noOfTasks}
                    </span>
                </div>
                <div
                    className='w-11/12 h-[65%] border border-t-gray-300 border-b-0 border-l-0 border-r-0
                    overflow-x-hidden overflow-y-scroll no-scrollbar p-8
                    flex flex-col gap-2 items-start mt-20
                    '
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
                <div
                    className='flex w-11/12  h-fit items-center justify-between'
                >
                    <div
                        className='py-2 px-5 border border-red-800 rounded-lg text-red-800
                        font-bold text-lg cursor-pointer transition duration-250 select-none
                        hover:bg-red-800 hover:text-gray-300
                        '
                        onClick={() => {
                            removePageSection.current.style.display = 'flex';
                        }}>
                        Clear All
                    </div>
                    <div
                        className='py-2 px-5 border border-gray-300 rounded-lg
                        font-bold text-lg cursor-pointer transition duration-250 select-none
                        hover:bg-gray-300 hover:text-gray-bg-dark
                        '
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
                    className='py-16 px-12 bg-gray-bg rounded-md
                    text-gray-300 flex flex-col gap-8
                    '
                >
                    <div
                        className='flex flex-row items-center gap-10'>
                        <h3
                            className='text-xl font-light cairo'>
                            Task
                        </h3>
                        <input
                            type='text'
                            placeholder=''
                            className='border border-gray-300 rounded-md w-[35rem]
                             p-2 outline-none text-xl'
                            ref={ST_toAdd}
                        />
                        <h3
                            className='text-xl font-medium cairo text-red-800'>
                            * required field
                        </h3>
                    </div>
                    <div
                        className='flex flex-row items-center gap-13'>
                        <h3
                            className='text-xl font-light cairo'>
                            Task Priority
                        </h3>
                        <div className='flex flex-row gap-2'>
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
                            className='py-2 px-5 border border-red-800 rounded-lg w-fit
                        font-bold text-lg cursor-pointer transition duration-250 select-none
                        hover:bg-red-800 hover:text-gray-300
                        '
                            onClick={() => {
                                addTaskContainer.current.style.display = 'none';
                                ST_toAdd.current.value = ''
                            }}>
                            Cancel
                        </div>
                        <div
                            className='py-2 px-5 border border-green-400 rounded-lg w-fit
                        font-bold text-lg cursor-pointer transition duration-250 select-none
                        hover:bg-green-400 hover:text-gray-300
                        '
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


                                    SaveDailyTasks(dailyObj);
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
                            className='py-2 px-5 border border-gray-300 rounded-lg w-fit
                        font-bold text-lg cursor-pointer transition duration-250 select-none
                        hover:bg-gray-300 hover:text-text-dark
                        '
                            onClick={() => {
                                removePageSection.current.style.display = 'none';
                            }}
                        >
                            Cancel
                        </div>
                        <div
                            className='py-2 px-5 border border-red-800 rounded-lg w-fit
                            font-bold text-lg cursor-pointer transition duration-250 select-none
                             hover:bg-red-800 hover:text-gray-300
                        '
                            onClick={() => {
                                task.forEach((t,i) => {
                                    if(t.taskid === taskId){
                                        task.splice(i,1);
                                    }
                                });
                                setTask(perv => perv.filter(t => t.taskid !== taskId));
                                SaveAllCustomTasksInLS(task);
                                addTaskSectionEnable();
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

export default DailyComponent;