import rubbishImg from '../assets/delete.png';
import edit from '../assets/edit-svgrepo-com.svg';
import done from '../assets/done-mini-1484-svgrepo-com.svg';
import close from '../assets/close-bold-svgrepo-com.svg';
import {useState , useRef} from 'react';
import CheckBox from "./CheckBox.jsx";


const TaskComponent2 = ({task,taskId,flag,allTasks,setAllTasks,isDone,setCompleted,objId}) => {
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
                                    allTasks.forEach((t) => {
                                        if(t.taskid == objId){
                                            t.tasks.forEach((j) => {
                                                if(j.id === taskId){
                                                    j.task = taskField;
                                                    console.log('Editied');
                                                    setOldField(taskField);
                                                    setEditingMode(false);
                                                }
                                            })
                                        }
                                    })
                                    setAllTasks(allTasks);
                                    console.log(allTasks);
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
                            <CheckBox
                                isDone={isDone}
                                setCompleted={setCompleted}
                                allTasks={allTasks}
                                setAllTasks={setAllTasks}
                                objId={objId}
                                taskId={taskId}
                                taskP={taskP}
                            />
                            <img
                                src={flag}
                                alt={'redFlag flag'}
                                className='w-4 h-fit p-1 box-content mt-[3px]'
                            />
                            <p style={{width: 'calc(85% - 4rem)',height: 'auto'}}
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
                                    allTasks.forEach((t) => {
                                        if(t.taskid == objId){
                                            t.tasks.forEach((j, k) => {
                                                if(j.id === taskId){
                                                    t.tasks.splice(k, 1);
                                                }
                                            })
                                        }
                                    })
                                    setAllTasks(allTasks);
                                    container.current.style.display= 'none';

                                }}
                            />
                        </div>
                    </div>
            }
        </div>
    )
}

export default TaskComponent2;