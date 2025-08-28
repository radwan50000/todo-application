import {useState , useEffect , useContext , useRef} from 'react';
import AppData from './AppData';
import close from '../assets/close2.svg';
import done from '../assets/done-mini-1484-svgrepo-com.svg';
import {projectIcons} from "../Data.js";
import SaveAllCustomTasksInLS from "../SaveAllCustomTasksInLS.js";

const Setting = () => {
    const data = useContext(AppData);
    let [dataObj , setDataObj] = useState({});
    let [projectName , setProjectName] = useState('');
    let [projectImg , setProjectImg] = useState(null);
    let [tasks, setTasks] = useState(null);
    let imagePickerContainer = useRef(null);


    const activeTask = (e,className) => {
        const ele = document.querySelectorAll('.task-img');
        ele.forEach(ele => {
            ele.classList.remove(className);
        })
        e.target.classList.add(className);
    }

    useEffect(() => {
        console.log(data.manuallyAddedTasks);
        console.log(data.taskId);
        data.manuallyAddedTasks.forEach((task) => {
            if(data.taskId === task.taskid){
                setDataObj(task);
                setProjectName(task.taskname);
                setProjectImg(task.taskicon);
                setTasks(task.tasks);
            }
        })

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
                            console.log(dataObj);
                            dataObj.taskname = projectName;
                            dataObj.taskicon = projectImg;

                            data.manuallyAddedTasks.forEach((task,i) => {
                                if(task.taskid === data.taskId){
                                    data.manuallyAddedTasks.splice(i,1);
                                    data.manuallyAddedTasks.push(dataObj);
                                    data.setManuallyAddedTasks(data.manuallyAddedTasks);
                                }
                            });

                            SaveAllCustomTasksInLS(data.manuallyAddedTasks);
                            data.setSettingSection(!data.settingSection);
                        }
                    }}
                >
                <img
                    src={done}
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

        {/* EOF   */}
        </div>
    )
}

export default Setting;