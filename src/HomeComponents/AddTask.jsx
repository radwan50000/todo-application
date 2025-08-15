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
import {useRef, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {v4 as uuidv4} from 'uuid';


const AddTask = () => {
    const tasksContainer = useRef(null);
    const addTaskContainer = useRef(null);
    const ST_toAdd = useRef(null);
    const [tempTasks , setTempTasks] = useState({'taskname': '','taskicon':'','tasks':[],'completed':0});


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
                style={{width: 'calc(100% - 24rem)'}}
                className='h-dvh pt-20 pl-8 bg-gray-bg-dark
                text-gray-300 flex items-start flex-col gap-12
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
                        }}>
                        Add Task
                    </div>
                    <div
                        className='py-2 px-5 border border-gray-300 rounded-lg
                        font-bold text-lg cursor-pointer transition duration-250 select-none
                        hover:bg-gray-300 hover:text-gray-bg-dark
                        '
                        onClick={() => {

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
                                    tasksContainer.current.innerHTML += `
                                    <div
                                            id=${uuidv4()}
                                            style='display: flex;flex-direction: row;align-items: start;justify-content: start;gap: 12px;font-size: 1.25rem;
                                                width: 90%;height: fit-content;flex-wrap: wrap;word-break: break-word;position:relative;'
                                                     >
                                            <img
                                                src=${document.querySelector('.active-flag-img').src}
                                                alt={'redFlag flag'}
                                                style='width: 1rem;padding: 0.2rem;box-sizing: content-box;padding-top: 0.5rem;'
                                            />
                                            <p style='width: calc(100% - 4rem);height: auto;'>
                                                ${ST_toAdd.current.value.trim()}
                                            </p>
                                        </div>
                                    `
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