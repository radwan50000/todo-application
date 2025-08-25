import campingImg from '../assets/camping-tent.png';
import familyImg from '../assets/family.png';
import groceryImg from '../assets/grocery-cart.png';
import houseImg from '../assets/house.png';
import shoppingImg from '../assets/online-shopping.png';
import workImg from '../assets/suitcase.png';
import vacationImg from '../assets/sunbathing.png';
import homeworkImg from '../assets/homework.png';
import studyImg from '../assets/study.png';
import cookingImg from '../assets/bake.png';
import yellowFlag from '../assets/yellowFlag.png';
import greenFlag from '../assets/greenFlag.png';
import redFlag from '../assets/redFlag.png';
import blueFlag from '../assets/blueFlag.png';
import gymImg from '../assets/dumbbell.png';
import menuImg from '../assets/menu-icon.svg';
import {useRef, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import TaskComponent from './TaskComponent.jsx';
import {v4 as uuidv4} from 'uuid';
import SaveTempObjInLS from '../SavingTempObjInLS.js';
import MenuCloseNavButton from "./MenuCloseNavButton.jsx";


const AddTask = (
    {
        setTasks,
        tasks,
        navMenuOpened,
        setNavMenuOpened
    }) => {
    const tasksContainer = useRef(null);
    const addTaskContainer = useRef(null);
    const ST_toAdd = useRef(null);
    const mainTaskName = useRef(null);
    const [addedTasks, setAddedTasks] = useState([]);
    const [tempTasks , setTempTasks] = useState({'taskname': '','taskicon':'','taskid':'','tasks':[],'completed':0});





    const activeTask = (e,className) => {
        const ele = document.querySelectorAll('.task-img');
        ele.forEach(ele => {
            ele.classList.remove(className);
        })
        e.target.classList.add(className);
    }




    return (
        <>
            <div
                className='right-component-style
                '
            >
                <MenuCloseNavButton
                    setNavMenuOpened={setNavMenuOpened}
                    navMenuOpened={navMenuOpened}
                />
                <div
                    className='flex flex-row items-center
                    xl:gap-10 xl:w-fit
                    max-sm:gap-3 sm:gap-3 max-sm:w-full sm:w-full
                    '>
                    <h3
                        className='font-light cairo
                        xl:text-xl
                        max-sm:text-lg sm:text-lg
                        '>
                        Tasks Name
                    </h3>
                    <input
                        type='text'
                        placeholder=''
                        className='border border-gray-300 rounded-md
                            outline-none
                            xl:text-xl xl:p-2 xl:w-fit
                            max-sm:text-sm sm:text-sm max-sm:p-1 sm:p-1
                            max-sm:w-7/12 sm:w-7/12
                        '
                        ref={mainTaskName}
                        />
                    <h3
                        className='font-medium cairo text-red-800 select-none
                        xl:text-xl
                        max-sm:hidden sm:hidden
                        '>
                        * required field
                    </h3>
                </div>
                <div
                    className='flex flex-row items-center justify-start
                    xl:gap-14
                    max-sm:gap-5 sm:gap-5
                    '>
                    <h3
                        className='font-light cairo
                        xl:text-xl xl:w-fit
                        max-sm:text-lg sm:text-lg max-sm:w-fit sm:w-fit
                        '>
                        Task Icon
                    </h3>
                    <div className='flex flex-row gap-2 overflow-x-scroll no-scrollbar
                        max-sm:w-9/12
                    '>
                        {
                            [
                                {
                                    'taskImg' : houseImg,
                                    'taskType': 'house'
                                },
                                {
                                    'taskImg' : workImg,
                                    'taskType': 'work'
                                },
                                {
                                    'taskImg' : familyImg,
                                    'taskType': 'family'
                                },
                                {
                                    'taskImg' : gymImg,
                                    'taskType': 'Training'
                                },
                                {
                                'taskImg' : groceryImg,
                                'taskType': 'grocery'
                            },
                                {
                                'taskImg' : shoppingImg,
                                'taskType': 'shopping'
                            },
                                {
                                'taskImg' : vacationImg,
                                'taskType': 'vacation'
                            },
                                {
                                'taskImg' : studyImg,
                                'taskType': 'study'
                            },
                                {
                                'taskImg' : homeworkImg,
                                'taskType': 'homework'
                            },
                                {
                                'taskImg' : cookingImg,
                                'taskType': 'cooking'
                            },{
                                'taskImg' : campingImg,
                                'taskType': 'camping'
                            }].map((ele, index) => {
                                return (
                                    <img
                                        src={ele.taskImg}
                                        key={index}
                                        alt={ele.taskType}
                                        className= {index > 0 ? 'task-img select-none':'task-img active-task-img select-none'}
                                        onClick={(e) => activeTask(e,'active-task-img')}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <h1
                    className='font-medium cairo
                    xl:text-3xl
                    max-sm:text-xl sm:text-xl
                    '>
                    Tasks
                </h1>
                <div
                    className='container-of-TC-container no-scrollbar'
                    ref={tasksContainer}>

                    {
                        addedTasks.map(t => {
                                return (
                                    <TaskComponent
                                        task={t.task}
                                        id={t.id}
                                        flag={t.priority}
                                        setTempTasks={setTempTasks}
                                        tempTasks={tempTasks}
                                        key={t.id}/>
                                )
                            }
                        )
                    }

                </div>
                <div
                    className='flex flex-row items-center justify-end gap-4
                    w-11/12 h-fit'>
                    <div
                        className='buttons'
                        onClick={() => {
                            addTaskContainer.current.style.display = 'flex';
                            ST_toAdd.current.focus();
                        }}>
                        Add Task
                    </div>
                    <div
                        className='buttons'
                        onClick={() => {
                            if(mainTaskName.current.value.trim() !== '') {
                                tempTasks.taskname =  mainTaskName.current.value.trim();
                                tempTasks.taskicon = document.querySelector('.active-task-img').src;
                                tempTasks.taskid = uuidv4();
                                setTempTasks({'taskname': '','taskicon':'','taskid':'','tasks':[],'completed':0});
                                tasksContainer.current.innerHTML = '';
                                mainTaskName.current.value = '';
                                setTasks([...tasks , tempTasks]);
                                SaveTempObjInLS(tempTasks);
                                console.log(localStorage.getItem('custom-tasks'));


                            }else {
                                toast('Tasks Name must be filled', {
                                    theme: 'dark',
                                    closeOnClick: true,
                                    type: 'error',
                                });
                            }
                        }}>
                        Submit
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
                            className='cancelTaskButton'
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
                                    tempTasks.tasks.push(obj);
                                        setAddedTasks([...addedTasks,obj]);
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
            <ToastContainer />

        </>
    )
}

export default AddTask;