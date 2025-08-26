import rubbishImg from '../assets/rubbish-img.svg';
import edit from '../assets/edit-svgrepo-com.svg';
import done from '../assets/done-mini-1484-svgrepo-com.svg';
import close from '../assets/close-bold-svgrepo-com.svg';
import {useState , useRef} from 'react';
import CheckBox from "./CheckBox.jsx";
import saveAllCustomTaskInLS from "../SaveAllCustomTasksInLS.js";

const TaskComponent2 = ({task,taskId,flag,allTasks,setAllTasks,isDone,setCompleted,objId,setNoOfTasks}) => {
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
                        className='TC-container'
                    >
                        <div
                            className='left-side-TC2'
                        >
                            <img
                                src={flag}
                                alt={'flag image'}
                                className='flag-img-TC'
                            />
                            <input
                                type={'text'}
                                value={taskField}
                                autoFocus={true}
                                className='input-field-TC2'
                                onChange={(e) => {
                                    setTaskField(e.target.value);
                                }}
                            />
                        </div>
                        <div
                            className='TC-buttons-container'
                        >
                            <img
                                src={done}
                                alt={'edit image'}
                                className='done-edit-buttons-TC'
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
                                    saveAllCustomTaskInLS(allTasks);
                                }}
                            />
                            <img
                                src={close}
                                alt={'delete image'}
                                className='CD-btns-TC'
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
                        className='TC-container'
                    >
                        <div
                            className='left-side-TC2'
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
                                className='flag-img-TC'
                            />
                            <p style={{textDecoration: isDone ? 'line-through' : 'none'}}
                               className='text-TC2'
                                ref={taskP}
                            >
                                {taskField}
                            </p>
                        </div>
                        <div
                            className='TC-buttons-container'
                        >
                            <img
                                src={edit}
                                alt={'edit image'}
                                className='done-edit-buttons-TC'
                                onClick={() => {
                                    setEditingMode(true);
                                }}
                            />
                            <img
                                src={rubbishImg}
                                alt={'delete image'}
                                className='CD-btns-TC'
                                onClick={() => {
                                    allTasks.forEach((t) => {
                                        if(t.taskid == objId){
                                            t.tasks.forEach((j, k) => {
                                                if(j.id === taskId){
                                                    t.tasks.splice(k, 1);
                                                    if(j.done) {
                                                        setCompleted(perv => perv - 1);
                                                        t.completed = t.completed - 1;
                                                    }
                                                    setNoOfTasks(perv => perv - 1);
                                                }
                                            })
                                        }
                                    })
                                    setAllTasks(allTasks);
                                    saveAllCustomTaskInLS(allTasks);
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