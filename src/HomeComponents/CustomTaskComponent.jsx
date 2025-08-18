import {useRef, useState , useEffect} from 'react';
import TaskComponent from "./TaskComponent.jsx";

const CustomTaskComponent = ({task,taskId}) => {
    const header = useRef(null);
    const [taskName, setTaskName] = useState('');
    const [taskImg , setTaskImg] = useState(null);
    const [completed , setCompleted] = useState(0);
    const [miniTasks , setMiniTasks] = useState([]);
    const [noOfTasks , setNoOfTasks] = useState(0);

    useEffect(() => {
        console.log(task);
        task.forEach((t) => {
            if(t.taskid === taskId){
                setTaskName(t.taskname);
                setTaskImg(t.taskicon);
                setMiniTasks([...t.tasks]);
                setNoOfTasks(miniTasks.length);
            }
        });

    },[task , taskId]);


    return (
        <>
            <div className='right-component-style'>
                <div
                    className='flex flex-row items-center justify-between gap-4
                        w-[90%]
                        '
                >
                    <div
                        className='flex flex-row items-center justify-between gap-4'
                    >
                        <img
                            src={taskImg}
                            alt='task image'
                            className='w-9'
                        />
                        <h1
                            className='text-3xl font-semibold text-gray-300 cairo'
                            ref={header}
                        >
                            {taskName}
                        </h1>
                    </div>
                    <span
                        className='text-3xl cairo'
                    >
                        {completed} / {noOfTasks}
                    </span>
                </div>
                <div
                    className='w-11/12 h-[65%] border border-gray-300 rounded-md
                    overflow-x-hidden overflow-y-scroll no-scrollbar p-8
                    flex flex-col gap-2 items-start mt-20
                    '
                    >

                </div>
            </div>
        </>
    )
}

export default CustomTaskComponent;