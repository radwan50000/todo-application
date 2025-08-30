import rubbishImg from '../assets/rubbish-img.svg';
import edit from '../assets/edit-svgrepo-com.svg';
import done from '../assets/done-mini-1484-svgrepo-com.svg';
import close from '../assets/close-bold-svgrepo-com.svg';
import {useState , useRef} from 'react';
import CheckBox2 from "./CheckBox2.jsx";
import SaveDailyTasks from "./SaveDailyTasks.js";
import SaveWeeklyTasks from "./SaveWeeklyTasks.jsx";

const TaskComponent3 = (
        {
            task,
            taskId,
            flag,
            allTasks,
            setAllTasks,
            isDone,
            setCompleted,
            setNoOfTasks,
            controller,
        }
    ) => {
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
                                    console.log(controller);
                                    controller.editTask(taskId, taskField);
                                    setOldField(taskField);
                                    setEditingMode(false);
                                    setAllTasks(controller.objData);
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
                            <CheckBox2
                                isDone={isDone}
                                setCompleted={setCompleted}
                                allTasks={allTasks}
                                setAllTasks={setAllTasks}
                                taskId={taskId}
                                taskP={taskP}
                                controller={controller}
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
                                    controller.removeTask(taskId);
                                    setCompleted(controller.completed);
                                    setNoOfTasks(controller.tasksNumber);
                                    controller.saveChanges();
                                    setAllTasks(controller.objData);
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