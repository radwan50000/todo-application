import doneIcon from '../assets/done-mini-1484-svgrepo-com.svg';
import {useState} from 'react';

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
                             t.tasks.forEach((j) => {
                                 if(j.id === taskId){
                                     console.log(j.done);
                                     j.done = !j.done;
                                     setCompleted(perv => j.done ? perv+1:perv-1);
                                     t.completed = j.done ? t.completed++:t.completed--;
                                     taskP.current.style.textDecoration = j.done ? 'line-through' : 'none';
                                 }
                             })
                         }
                     })
                     setAllTasks(allTasks);
                     console.log(allTasks);
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