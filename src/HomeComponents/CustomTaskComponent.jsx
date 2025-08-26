import {useRef, useState , useEffect} from 'react';
import TaskComponent2 from "./TaskComponent2.jsx";
import greenFlag from "../assets/greenFlag.png";
import blueFlag from "../assets/blueFlag.png";
import redFlag from "../assets/redFlag.png";
import yellowFlag from "../assets/yellowFlag.png";
import {toast, ToastContainer} from "react-toastify";
import {v4 as uuidv4} from 'uuid';
import saveAllCustomTaskInLS from "../SaveAllCustomTasksInLS.js";
import SaveAllCustomTasksInLS from "../SaveAllCustomTasksInLS.js";
import MenuCloseNavButton from "./MenuCloseNavButton.jsx";


const CustomTaskComponent = (
        {
            task,
            setTask,
            taskId,
            addTaskSectionEnable,
            setNavMenuOpened,
            navMenuOpened
        }
    ) => {
    const header = useRef(null);
    const addTaskContainer = useRef(null);
    const ST_toAdd = useRef(null);
    const removePageSection = useRef(null);
    const [taskName, setTaskName] = useState('');
    const [taskImg , setTaskImg] = useState(null);
    const [completed , setCompleted] = useState(0);
    const [miniTasks , setMiniTasks] = useState([]);
    const [noOfTasks , setNoOfTasks] = useState(0);

    const activeTask = (e,className) => {
        const ele = document.querySelectorAll('.task-img');
        ele.forEach(ele => {
            ele.classList.remove(className);
        })
        e.target.classList.add(className);
    }



    useEffect(() => {
        console.log(task);
        task.forEach((t) => {
            if(t.taskid === taskId){
                setTaskName(t.taskname);
                setTaskImg(t.taskicon);
                setMiniTasks([...t.tasks]);
                setNoOfTasks(t.tasks.length);
                setCompleted(t.completed);
            }
        });
    },[task , taskId]);

    useEffect(() => {


    },[completed , miniTasks]);


    return (
        <>
            <div className='right-component-style no-scrollbar'>

                <MenuCloseNavButton
                    setNavMenuOpened={setNavMenuOpened}
                    navMenuOpened={navMenuOpened}
                />
                <div
                    className='C-H-o-Component'
                >
                    <div
                        className='H-o-Component'
                    >
                        <div
                            className='l-H-o-Component'
                        >
                            <img
                                src={taskImg}
                                alt='task image'
                            />
                            <h1
                                className='cairo'
                                ref={header}
                            >
                                {taskName}
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
                            miniTasks.map((t) => {
                                return (
                                    <TaskComponent2
                                        setCompleted={setCompleted}
                                        allTasks={task}
                                        setAllTasks={setTask}
                                        key={t.id}
                                        taskId={t.id}
                                        objId={taskId}
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
                        onClick={() => {
                            removePageSection.current.style.display = 'flex';
                        }}>
                        Remove Page
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
                                    task.forEach((t) => {
                                        if(t.taskid === taskId){
                                            t.tasks.push(obj);
                                            setMiniTasks(t.tasks);
                                            setNoOfTasks(t.tasks.length);
                                        }
                                    });
                                    setTask(task);
                                    setMiniTasks([...miniTasks,obj]);
                                    saveAllCustomTaskInLS(task);
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
                            </span> you are now about to remove this page of tasks , are you sure you want to delete it ?
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
                            Remove
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default CustomTaskComponent;