import rubbishImg from '../assets/delete.png';
import edit from '../assets/edit-svgrepo-com.svg';
import done from '../assets/done-mini-1484-svgrepo-com.svg';
import close from '../assets/close-bold-svgrepo-com.svg';
import {useState , useRef} from 'react';
import CheckBox2 from "./CheckBox2.jsx";
import SaveDailyTasks from "./SaveDailyTasks.js";
import SaveWeeklyTasks from "./SaveWeeklyTasks.jsx";

const TaskComponent3 = ({task,taskId,flag,allTasks,setAllTasks,isDone,setCompleted,setNoOfTasks}) => {
    const [editingMode , setEditingMode] = useState(false);
    const taskP = useRef(null);
    const [taskField, setTaskField] = useState(task);
    const [oldField , setOldField] = useState(taskField);
    const container = useRef(null);

    return (
        <div ref={container} className="w-full h-fit">
            {
                editingMode ?
                    <div
                        id={taskId}
                        className='flex flex-row items-start justify-between text-xl w-11/12 h-fit flex-wrap
                     break-words relative  rounded-md p-3'
                    >
                        <div
                            className='flex flex-row gap-4 w-8/12 '
                        >
                            <img
                                src={flag}
                                alt={'redFlag flag'}
                                className='w-4 h-fit p-1 box-content mt-[3px]'
                            />
                            <input
                                type={'text'}
                                value={taskField}
                                style={{width: 'calc(85% - 4rem)',height: 'auto'}}
                                autoFocus={true}
                                className='text-xl outline-none'
                                onChange={(e) => {
                                    setTaskField(e.target.value);
                                }}
                            />
                        </div>
                        <div
                            className='flex flex-row gap-4'
                        >
                            <img
                                src={done}
                                alt={'edit image'}
                                className='w-4 h-fit p-2 box-content border border-green-400 rounded-sm
                                    transition duration-250 ease-in-out select-none
                                    cursor-pointer hover:bg-green-400'
                                onClick={() => {
                                    allTasks.tasks.forEach((j) => {
                                        if(j.id === taskId){
                                            j.task = taskField;
                                            console.log('Editied');
                                            setOldField(taskField);
                                            setEditingMode(false);
                                        }
                                    })
                                    setAllTasks(allTasks);
                                    allTasks.projectTitle === 'Daily Tasks' ? SaveDailyTasks(allTasks):SaveWeeklyTasks(allTasks);
                                }}
                            />
                            <img
                                src={close}
                                alt={'delete image'}
                                className='w-4 h-fit p-2 box-content border border-red-800 rounded-sm
                    transition duration-250 ease-in-out select-none
                    cursor-pointer hover:bg-red-800'
                                onClick={() => {
                                    setTaskField(oldField);
                                    setEditingMode(false);
                                }}
                            />
                        </div>
                    </div>
                    :
                    <div
                        id={taskId}
                        className='flex flex-row items-start justify-between text-xl w-11/12 h-fit flex-wrap
                     break-words relative  rounded-md p-3'
                    >
                        <div
                            className='flex flex-row gap-4 w-8/12'
                        >
                            <CheckBox2
                                isDone={isDone}
                                setCompleted={setCompleted}
                                allTasks={allTasks}
                                setAllTasks={setAllTasks}
                                taskId={taskId}
                                taskP={taskP}
                            />
                            <img
                                src={flag}
                                alt={'redFlag flag'}
                                className='w-4 h-fit p-1 box-content mt-[3px]'
                            />
                            <p style={{width: 'calc(85% - 4rem)',height: 'auto',textDecoration: isDone ? 'line-through' : 'none'}}
                               className='text-xl'

                               ref={taskP}
                            >
                                {taskField}
                            </p>
                        </div>
                        <div
                            className='flex flex-row gap-4'
                        >
                            <img
                                src={edit}
                                alt={'edit image'}
                                className='w-4 h-fit p-2 box-content border border-green-400 rounded-sm
                    transition duration-250 ease-in-out select-none
                    cursor-pointer hover:bg-green-400'
                                onClick={() => {
                                    setEditingMode(true);
                                }}
                            />
                            <img
                                src={rubbishImg}
                                alt={'delete image'}
                                className='w-4 h-fit p-2 box-content border border-cyan-500 rounded-sm invert-100
                                    transition duration-250 ease-in-out select-none
                                    cursor-pointer hover:bg-cyan-500'
                                onClick={() => {
                                    allTasks.tasks.forEach((j, k) => {
                                        if(j.id === taskId){
                                            allTasks.tasks.splice(k, 1);
                                            if(j.done) {
                                                setCompleted(perv => perv - 1);
                                            }
                                            setNoOfTasks(perv => perv - 1);
                                        }
                                    })
                                    setAllTasks(allTasks);
                                    allTasks.projectTitle === 'Daily Tasks' ? SaveDailyTasks(allTasks):SaveWeeklyTasks(allTasks);
                                    container.current.style.display= 'none';

                                }}
                            />
                        </div>
                    </div>
            }
        </div>
    )
}

export default TaskComponent3;