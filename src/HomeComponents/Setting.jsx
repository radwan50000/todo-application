import {useState , useEffect , useContext , useRef} from 'react';
import AppData from './AppData';
import close from '../assets/close2.svg';
import done from '../assets/done-mini-1484-svgrepo-com.svg';
import {projectIcons} from "../Data.js";
import SaveAllCustomTasksInLS from "../SaveAllCustomTasksInLS.js";
import CustomTaskClass from "./CustomTaskClass.js";

const Setting = () => {
    const data = useContext(AppData);
    let [customTasksController] = useState(() => new CustomTaskClass(data.taskId));

    let [projectName , setProjectName] = useState(customTasksController.projectName);
    let [projectImg , setProjectImg] = useState(customTasksController.projectImg);
    let [tasks, setTasks] = useState(customTasksController.tasks);
    let imagePickerContainer = useRef(null);
    let [pageRemoved , setPageRemoved] = useState(false);




    const activeTask = (e,className) => {
        const ele = document.querySelectorAll('.task-img');
        ele.forEach(ele => {
            ele.classList.remove(className);
        })
        e.target.classList.add(className);
    }

    useEffect(() => {

    },[])

    return (
        <div
            className='
                w-full h-dvh
                overflow-hidden
                bg-gray-bg-dark
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
                <span
                    className='absolute top-5  cursor-pointer
                            transition duration-250 ease-in-out
                            hover:invert-70
                            inline-block
                            xl:right-10 lg:right-8
                            max-sm:right-3 sm:right-3
                            '
                    onClick={() => {
                        if(projectName.trim().length > 0) {
                            customTasksController.changeProjectName(projectName);
                            customTasksController.changeProjectIcon(projectImg);
                            if(pageRemoved) data.addTaskSectionEnable();
                            data.setManuallyAddedTasks(customTasksController.saveInCustomTasksArr());
                            data.setSettingSection(!data.settingSection);
                        }
                    }}
                >
                <img
                    src={done}
                    alt={'done icon'}
                    className='
                         xl:w-7 lg:w-6
                         max-sm:w-5 sm:w-5
                    '
                />
                </span>
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
                    className='w-10 cursor-pointer'
                    onClick={() => {
                        imagePickerContainer.current.classList.toggle('visible-container')
                    }}
                />
                <input
                    className='
                        cairo text-3xl outline-none
                        text-gray-300 w-fit
                        border-b border-gray-bg-dark
                        transition duration-250 ease-in-out
                    '
                    value={projectName}
                    onChange={(e) => {
                        if(e.target.value.length < 15) {
                            setProjectName(e.target.value);
                        }
                    }}
                    />

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
                    className='text-2xl cairo font-bold text-gray-500'
                    >
                    Tasks
                </h3>
                <div
                    className={tasks.length > 0 ? 'buttons':'buttons pointer-none'}
                    onClick={() => {
                        customTasksController.makeAllTasksUnDone();
                    }}
                    >
                    Reset Progress
                </div>
                <div
                    className={tasks.length > 0 ? 'danger-buttons':'danger-buttons pointer-none'}
                    onClick={() => {
                        customTasksController.removeTasks();
                    }}
                >
                    Remove Tasks
                </div>
            </div>
            <div
                className='flex flex-col w-[98%] items-start justify-start mt-8 mx-auto
                    gap-4 text-gray-300
                '
            >
                <h3
                    className='text-2xl cairo font-bold text-gray-500'
                >
                    Page
                </h3>
                <div
                    className={'danger-buttons'}
                    onClick={() => {
                        customTasksController.removeProject();
                        setPageRemoved(true);
                    }}
                >
                Remove Page
            </div>
        </div>
        {/* EOF   */}
        </div>
    )
}

export default Setting;