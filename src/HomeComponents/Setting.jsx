import {useState , useEffect , useContext , useRef} from 'react';
import AppData from './AppData';
import close from '../assets/close2.svg';
import done from '../assets/done-mini-1484-svgrepo-com.svg';
import {projectIcons} from "../Data.js";
import SaveAllCustomTasksInLS from "../SaveAllCustomTasksInLS.js";
import CustomTaskClass from "./CustomTaskClass.js";

const Setting = (
    {
        obj,
        custom,
    }
    ) => {
    const data = useContext(AppData);
    let [customTasksController] = useState(obj);

    let [projectName , setProjectName] = useState(customTasksController.projectTitle);
    let [projectImg , setProjectImg] = useState(customTasksController.projectImg);
    let [tasks, setTasks] = useState(customTasksController.tasks);

    let [pageRemoved , setPageRemoved] = useState(false);
    let imagePickerContainer = useRef(null);

    let resetDNBtn = useRef(null);
    let rmTasksBtn = useRef(null);

    let confirmChanges = useRef(null);




    const activeTask = (e,className) => {
        const ele = document.querySelectorAll('.task-img');
        ele.forEach(ele => {
            ele.classList.remove(className);
        })
        e.target.classList.add(className);
    }

    useEffect(() => {
        if(tasks.filter((task) => task.done).length < 1){
            resetDNBtn.current.disabled = true;
            resetDNBtn.current.classList.add('disabled-btn');
        }
        if(tasks.length < 1){
            rmTasksBtn.current.disabled = true;
            rmTasksBtn.current.classList.add('disabled-btn');
        }
    },[tasks,setTasks])

    return (
        <div
                className='bg-gray-bg-dark w-full h-dvh flex flex-col items-center justify-between
                    overflow-x-hidden overflow-y-scroll no-scrollbar
                '
            >
            <div
                className='
                w-full h-fit
                overflow-hidden
                pt-12 gap-4
                flex flex-col items-start justify-start
                overflow-x-hidden overflow-y-scroll
                no-scrollbar
                xl:px-8
                max-sm:px-4 sm:px-4
            '
            >
                {/*Close Setting Button*/}
                <span
                    className='absolute top-5  cursor-pointer
                        transition duration-250 ease-in-out
                        hover:invert-70
                        inline-block
                        xl:left-10 lg:left-8
                        max-sm:left-3 sm:left-3
                        '
                    onClick={() => {
                        data.setSettingSection(!data.settingSection);
                    }}
                >
                        <img
                            src={close}
                            alt={'close icon'}
                            className='
                                 xl:w-7 lg:w-6
                                 max-sm:w-5 sm:w-5
                            '
                        />
                </span>
                {/*Save Setting Button*/}

                {/*  Header  */}
                <div
                    className='
                flex w-full justify-start items-start
                text-gray-300 font-bold cairo
                xl:text-8xl xl:mt-8 xl:ml-8
                max-sm:mt-4 sm:mt-4
                max-sm:ml-0 sm:ml-0
                max-sm:text-5xl sm:text-5xl

            '>
                    <h1>
                        Setting
                    </h1>
                </div>

                {/*  Project Name  */}
                <div
                    className='
                    flex flex-row items-center justify-start
                    mt-8 gap-4 ml-4 relative
                '
                >
                    <img
                        src={projectImg}
                        alt={'project image'}
                        className='cursor-pointer
                        xl:w-14
                        max-sm:w-10 sm:w-10
                    '
                        onClick={() => {
                            if(custom) imagePickerContainer.current.classList.toggle('visible-container')
                        }}
                    />
                    {
                        custom ?
                            <input
                                className='
                        cairo outline-none
                        text-gray-300 w-fit
                        border-b border-gray-bg-dark
                        transition duration-250 ease-in-out
                        xl:text-5xl
                        max-sm:text-3xl sm:text-3xl
                    '
                                value={projectName}
                                onChange={(e) => {
                                    if(e.target.value.length < 15) {
                                        setProjectName(e.target.value);
                                    }
                                }}
                            />
                            :<h1 className='
                        cairo outline-none
                        text-gray-300 w-fit
                        border-b border-gray-bg-dark
                        transition duration-250 ease-in-out
                        xl:text-5xl
                        max-sm:text-3xl sm:text-3xl
                    '> {projectName} </h1>
                    }

                    {/*  Picker Image Container  */}
                    <div
                        className='absolute bottom-0 left-0
                            translate-y-[105%] border border-yellow-400
                             bg-gray-bg-dark rounded-md
                            hidden flex-row flex-wrap
                            content-start justify-between
                            overflow-x-hidden overflow-y-scroll no-scrollbar
                            p-2 gap-2 z-[50]
                            xl:w-full xl:h-[350px]
                            max-sm:w-12/12 sm:w-12/12'
                        ref={imagePickerContainer}
                    >
                        {
                            projectIcons.map((ele, index) => {
                                return (
                                    <img
                                        src={ele.taskImg}
                                        key={index}
                                        alt={ele.taskType}
                                        className= {ele.taskImg === projectImg > 0 ? 'active-task-img':''+' task-img'}
                                        onClick={(e) => {
                                            activeTask(e,'active-task-img')
                                            imagePickerContainer.current.classList.toggle('visible-container');
                                            setProjectImg(e.target.src);
                                        }
                                        }
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div
                    className='flex flex-col w-[98%] items-start justify-start mt-8 mx-auto
                    gap-4 text-gray-300
                '
                >
                    <h3
                        className='setting-second-header cairo'
                    >
                        Tasks
                    </h3>
                    <button
                        className={'buttons'}
                        onClick={() => {
                            customTasksController.makeAllTasksUnDone();
                            resetDNBtn.current.disabled = true;
                            resetDNBtn.current.classList.add('disabled-btn');
                        }}
                        ref={resetDNBtn}
                    >
                        Reset Progress
                    </button>
                    <button
                        className={'danger-buttons'}
                        onClick={(e) => {
                            customTasksController.removeTasks();
                            resetDNBtn.current.disabled = true;
                            resetDNBtn.current.classList.add('disabled-btn');
                            e.target.disabled = true;
                            e.target.classList.add('disabled-btn');
                        }}
                        ref={rmTasksBtn}
                    >
                        Remove Tasks
                    </button>
                </div>
                {
                    custom
                        ?
                        <div
                            className='flex flex-col w-[98%] items-start justify-start mt-8 mx-auto
                    gap-4 text-gray-300
                '
                        >
                            <h3
                                className='setting-second-header cairo'
                            >
                                Page
                            </h3>
                            <div
                                className={'danger-buttons'}
                                onClick={(e) => {
                                    customTasksController.removeProject();
                                    setPageRemoved(true);
                                    e.target.disabled = true;
                                    e.target.classList.add('disabled-btn');
                                }}
                            >
                                <p>Remove Project</p>
                            </div>
                        </div>
                        : null
                }
                {/* EOF   */}
            </div>
            {/* Save Changes Button*/}
            <div
                className='w-[98%] h-fit mx-auto flex flex-row justify-end items-center p-4'
            >
                <div
                    className='buttons w-fit'
                    onClick={() => {
                        confirmChanges.current.style.display = 'flex';
                    }}
                >
                    <p>Save Changes</p>
                </div>
            </div>
            {/*  Confirm Save Changes Window  */}
            <div
                ref={confirmChanges}
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
                            </span> you are now about to make changes to the page , are you sure you want to save the changes
                        </p>
                    </div>

                    <div
                        className='flex flex-row items-center justify-end gap-4'
                    >
                        <div
                            className='danger-buttons'
                            onClick={() => {
                                confirmChanges.current.style.display = 'none';
                            }}
                        >
                            Cancel
                        </div>
                        <div
                            className='buttons'
                            onClick={() => {
                                if(projectName.trim().length > 0) {
                                    if(custom) {
                                        customTasksController.changeProjectName(projectName);
                                        customTasksController.changeProjectIcon(projectImg);
                                    }
                                    if(pageRemoved) data.addTaskSectionEnable();
                                    if(custom) data.setManuallyAddedTasks(customTasksController.saveInCustomTasksArr());
                                    else customTasksController.saveChanges();
                                    confirmChanges.current.style.display = 'none';
                                    data.setSettingSection(!data.settingSection);
                                }
                            }}>
                            Confirm
                        </div>
                    </div>
                </div>
            </div>
        {/*  EOF  */}
        </div>
    )
}

export default Setting;