import doneIcon from '../assets/done-mini-1484-svgrepo-com.svg';
import {useState} from 'react';
import saveAllCustomTaskInLS from "../SaveAllCustomTasksInLS.js";

const CheckBox = ({isDone,setCompleted,allTasks,setAllTasks,objId,taskId,taskP}) => {
    const [checked, setChecked] = useState(isDone);
    return (
        <>
            <div className='w-6 h-6 rounded-md bg-transparent
                    border-green-300 border select-none
                    transition duration-250 ease-in-out
                    p-[2px] cursor-pointer mt-1
                '
                 data-checked={checked}
                 onClick={() => {
                     setChecked(!checked)
                     allTasks.forEach((t) => {
                         if(t.taskid === objId){
                             allTasks.tasks.forEach((j) => {
                                 if(j.id === taskId){
                                     j.done = j.done ? false:true;
                                     setCompleted(perv => j.done ? perv+1:perv-1);
                                     t.completed = j.done ? t.completed+1:t.completed-1;
                                     taskP.current.style.textDecoration = j.done ? 'line-through' : 'none';
                                     console.log(t);
                                 }
                             })

                         }
                     })
                     setAllTasks(allTasks);
                     saveAllCustomTaskInLS(allTasks);
                 }}
            >
                {
                    checked ?
                        <div
                            className='flex items-center justify-center
                                bg-[#00ff004a] rounded-md
                                w-full h-full
                                '>
                            <img
                                src={doneIcon}
                                alt={'done icon'}
                                className='w-9/12'
                            />
                        </div>
                        :null
                }
            </div>
        </>
    )
}

export default CheckBox;