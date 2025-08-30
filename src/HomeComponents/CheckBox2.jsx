import doneIcon from '../assets/done-mini-1484-svgrepo-com.svg';
import {useState , useRef} from 'react';
import soundTrack from "../sounds/tik.mp3";

const CheckBox2 = ({isDone,setAllTasks,taskId,taskP,controller}) => {
    const [checked, setChecked] = useState(isDone);
    const audio = useRef(null);

    return (
        <>
            <div className='check-box-1'
                 data-checked={checked}
                 onClick={() => {
                     setChecked(!checked);
                     const done = controller.taskIsDone(taskId)
                     taskP.current.style.textDecoration = done ? 'line-through' : 'none';
                     if(done){
                         audio.current.currentTime = 0;
                         audio.current.play();
                     }
                     setAllTasks(controller.objData);
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

export default CheckBox2;