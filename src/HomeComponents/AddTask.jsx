import {useRef, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import TaskComponent from './TaskComponent.jsx';
import {v4 as uuidv4} from 'uuid';
import SaveTempObjInLS from '../SavingTempObjInLS.js';
import MenuCloseNavButton from "./MenuCloseNavButton.jsx";
import {projectIcons,flagsData} from '../Data.js';
import SettingGear from "./SettingGear.jsx";


const AddTask = (
    {
        setTasks,
        tasks,
        navMenuOpened,
        setNavMenuOpened,
        customSectionEnable,
        setTaskId
    }) => {
    const tasksContainer = useRef(null);
    const addTaskContainer = useRef(null);
    const ST_toAdd = useRef(null);
    const [taskImg , setTaskImg] = useState(projectIcons[0]['taskImg']);
    const [projectName , setProjectName] = useState('');
    const imagePickerContainer = useRef(null);
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
                <div
                    className='opt-header'
                >
                    <MenuCloseNavButton
                        setNavMenuOpened={setNavMenuOpened}
                        navMenuOpened={navMenuOpened}
                    />

                </div>
                <div className='C-Add-task'>
                    <div
                        className='flex flex-row items-center
                        xl:gap-4 xl:w-fit relative
                        max-sm:gap-3 sm:gap-3 max-sm:w-full sm:w-full'
                    >
                        <img
                            src={taskImg}
                            alt={'task image'}
                            className='cover-img'
                            onClick={() => {
                                imagePickerContainer.current.classList.toggle('visible-container');
                            }}
                            />
                        <input
                            type='text'
                            placeholder='Project Name'
                            value={projectName}
                            className='border-b border-gray-300
                            outline-none
                            xl:text-xl xl:p-2 xl:w-fit
                            max-sm:text-md sm:text-md max-sm:p-1 sm:p-1
                            max-sm:w-7/12 sm:w-7/12
                        '
                            ref={mainTaskName}
                            onChange={(e) => {
                                if(e.target.value.length < 15) {
                                    setProjectName(e.target.value);
                                }
                            }}
                        />
                        <div
                            className='absolute bottom-0 left-0
                            translate-y-[105%] border border-yellow-400
                             bg-gray-bg-dark rounded-md
                            hidden flex-row flex-wrap
                            content-start justify-between
                            overflow-x-hidden overflow-y-scroll no-scrollbar
                            p-2 gap-2 z-[50]
                            xl:w-full xl:h-[350px]
                            max-sm:w-7/12 sm:w-7/12'
                            ref={imagePickerContainer}
                            >
                            {
                                projectIcons.map((ele, index) => {
                                    return (
                                        <img
                                            src={ele.taskImg}
                                            key={index}
                                            alt={ele.taskType}
                                            className= {index > 0 ? 'task-img ':'task-img active-task-img select-none'}
                                            onClick={(e) => {
                                                activeTask(e,'active-task-img')
                                                imagePickerContainer.current.classList.toggle('visible-container');
                                                setTaskImg(e.target.src)
                                                }
                                            }
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
                </div>
                <div
                    className='flex flex-row items-center justify-end gap-4
                    w-12/12 h-fit py-3 px-4'>
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
                                let id = uuidv4();
                                tempTasks.taskid = id;
                                setTempTasks({'taskname': '','taskicon':'','taskid':'','tasks':[],'completed':0});
                                tasksContainer.current.innerHTML = '';
                                mainTaskName.current.value = '';
                                setProjectName('');
                                setTasks([...tasks , tempTasks]);
                                SaveTempObjInLS(tempTasks);
                                setTaskId(id);
                                customSectionEnable();
                                console.log(localStorage.getItem('custom-tasks'));


                            }else {
                                toast('Project Name must be filled', {
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
                                flagsData.map((ele, index) => {
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