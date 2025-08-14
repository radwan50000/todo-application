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


const AddTask = () => {
    const tasksContainer = useRef(null);
    const addTaskContainer = useRef(null);
    const [tempTasks , setTempTasks] = useState({});

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
                                        className= {index > 0 ? 'task-img':'task-img active-task-img'}
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


                    <div
                        className='flex flex-row items-center justify-start
                                        gap-4 text-xl'
                    >
                        <img
                            src={greenFlag}
                            alt={'green flag'}
                            className='w-4'
                        />
                        <p>
                            Clean the House.
                        </p>
                    </div>


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
                flex items-center justify-center
                z-95 bg-trans-white
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
                                            className= {index > 0 ? 'task-img':'task-img active-flag-img'}
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
                            }}>
                            Cancel
                        </div>
                        <div
                            className='py-2 px-5 border border-green-400 rounded-lg w-fit
                        font-bold text-lg cursor-pointer transition duration-250 select-none
                        hover:bg-green-400 hover:text-gray-300
                        '
                            onClick={() => {
                                tasksContainer.current.innerHTML +=
                                addTaskContainer.current.style.display = 'none';
                            }}
                        >
                            Submit
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddTask;