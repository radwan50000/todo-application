import doneIcon from '../assets/done-mini-1484-svgrepo-com.svg';
import soundTrack from '../sounds/tik.mp3';
import {useState , useRef} from 'react';
import saveAllCustomTaskInLS from "../SaveAllCustomTasksInLS.js";

const CheckBox = ({isDone,setCompleted,allTasks,setAllTasks,objId,taskId,taskP}) => {
    const [checked, setChecked] = useState(isDone);
    const audio = useRef(null);

    return (
        <>
            <div className='check-box-1'
                 data-checked={checked}
                 onClick={() => {
                     setChecked(!checked)
                     allTasks.forEach((t) => {
                         if(t.taskid === objId){
                             t.tasks.forEach((j) => {
                                 if(j.id === taskId){
                                     j.done = j.done ? false:true;
                                     setCompleted(perv => j.done ? perv+1:perv-1);
                                     t.completed = j.done ? t.completed+1:t.completed-1;
                                     taskP.current.style.textDecoration = j.done ? 'line-through' : 'none';
                                     if(j.done){
                                         audio.current.currentTime = 0;
                                         audio.current.play();
                                     }
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
            <audio ref={audio} src={soundTrack} preload="auto"></audio>
        </>
    )
}

export default CheckBox;