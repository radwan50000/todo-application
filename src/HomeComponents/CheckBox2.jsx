import doneIcon from '../assets/done-mini-1484-svgrepo-com.svg';
import {useState} from 'react';
import SaveDailyTasks from "./SaveDailyTasks.js";
import SaveWeeklyTasks from "./SaveWeeklyTasks.jsx";

const CheckBox2 = ({isDone,setCompleted,allTasks,setAllTasks,taskId,taskP}) => {
    const [checked, setChecked] = useState(isDone);
    return (
        <>
            <div className='check-box-1'
                 data-checked={checked}
                 onClick={() => {
                     setChecked(!checked)
                     allTasks.tasks.forEach((j) => {
                         if(j.id === taskId){
                             j.done = j.done ? false:true;
                             setCompleted(perv => j.done ? perv+1:perv-1);
                             taskP.current.style.textDecoration = j.done ? 'line-through' : 'none';
                             console.log(allTasks);
                         }
                     })
                     setAllTasks(allTasks);
                     allTasks.projectTitle === 'Daily Tasks' ? SaveDailyTasks(allTasks):SaveWeeklyTasks(allTasks);
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

export default CheckBox2;