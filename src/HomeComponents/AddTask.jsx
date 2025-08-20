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
import {useRef, useState , useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import TaskComponent from './TaskComponent.jsx';
import {v4 as uuidv4} from 'uuid';
import saveTempObjInLS from '../SavingTempObjInLS.js';


const AddTask = ({setTasks, tasks}) => {
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

    useEffect( () => {

    },[addedTasks])



    return (
        <>
            <div
                className='right-component-style
                '
            >
                <div
                    className='flex flex-row items-center gap-10'>
                    <h3
                        className='text-xl font-light cairo'>
                        Tasks Name
                    </h3>
                    <input
                        type='text'
                        placeholder=''
                        className='border border-gray-300 rounded-md
                             p-2 outline-none text-xl'
                        ref={mainTaskName}
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
                        Task Icon
                    </h3>
                    <div className='flex flex-row gap-2'>
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
                    className='text-3xl font-medium cairo'>
                    Tasks
                </h1>
                <div
                    className='w-11/12 h-[55%] border border-gray-300 rounded-md
                    overflow-x-hidden overflow-y-scroll no-scrollbar p-8
                    flex flex-col gap-2 items-start
                    '
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
                    <div
                        className='py-2 px-5 border border-gray-300 rounded-lg
                        font-bold text-lg cursor-pointer transition duration-250 select-none
                        hover:bg-gray-300 hover:text-gray-bg-dark
                        '
                        onClick={() => {
                            if(mainTaskName.current.value.trim() !== '') {
                                tempTasks.taskname =  mainTaskName.current.value.trim();
                                tempTasks.taskicon = document.querySelector('.active-task-img').src;
                                tempTasks.taskid = uuidv4();
                                setTasks([...tasks , tempTasks]);
                                setTempTasks({'taskname': '','taskicon':'','taskid':'','tasks':[],'completed':0});
                                tasksContainer.current.innerHTML = '';
                                mainTaskName.current.value = '';

                                saveTempObjInLS(tempTasks);
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
                                [{
                                    'flagType': 'green flag',
                                    'flagImg': greenFlag
                                },
                                    {
                                        'flagType': 'blue flag',
                                        'flagImg': blueFlag,
                                    },
                                    {
                                        'flagType': 'red flag',
                                        'flagImg': redFlag,
                                    },
                                    {
                                        'flagType': 'yellow flag',
                                        'flagImg': yellowFlag
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