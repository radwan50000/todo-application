import {useRef, useState , useEffect} from 'react';
import TaskComponent2 from "./TaskComponent2.jsx";


const CustomTaskComponent = ({task,setTask,taskId}) => {
    const header = useRef(null);
    const [taskName, setTaskName] = useState('');
    const [taskImg , setTaskImg] = useState(null);
    const [completed , setCompleted] = useState(0);
    const [miniTasks , setMiniTasks] = useState([]);
    const [noOfTasks , setNoOfTasks] = useState(0);

    useEffect(() => {
        console.log('this is task - manually Added Tasks');
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
                <div
                    className='flex flex-row items-center justify-between gap-4
                        w-[90%]'
                >
                    <div
                        className='flex flex-row items-center justify-between gap-4'
                    >
                        <img
                            src={taskImg}
                            alt='task image'
                            className='w-12'
                        />
                        <h1
                            className='text-5xl font-semibold text-gray-300 cairo'
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
                    className='w-11/12 h-[65%] border border-t-gray-300 border-b-0 border-l-0 border-r-0
                    overflow-x-hidden overflow-y-scroll no-scrollbar p-8
                    flex flex-col gap-2 items-start mt-20
                    '
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
        </>
    )
}

export default CustomTaskComponent;