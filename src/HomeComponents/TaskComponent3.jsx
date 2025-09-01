import rubbishImg from '../assets/rubbish-img.svg';
import edit from '../assets/edit-svgrepo-com.svg';
import done from '../assets/done-mini-1484-svgrepo-com.svg';
import close from '../assets/close-bold-svgrepo-com.svg';
import {useState , useRef} from 'react';
import CheckBox2 from "./CheckBox2.jsx";
import SaveDailyTasks from "./SaveDailyTasks.js";
import SaveWeeklyTasks from "./SaveWeeklyTasks.jsx";
import CustomTaskClass from "./CustomTaskClass.js";
import {flagsData} from "../Data.js";

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
    const flagImage = useRef(null);
    const chooseFlagContainer = useRef(null);
    const [flagSrc , setFlagSrc] = useState(flag);

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
                                src={flagSrc}
                                alt={'flag image'}
                                className='flag-img-TC cursor-pointer'
                                ref={flagImage}
                                onClick={() => {
                                    chooseFlagContainer.current.classList.toggle('visible-container')
                                }
                                }
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
                            <div
                                className='hidden flex-row gap-2 w-fit px-4 py-1
                                    justify-center
                                    absolute bottom-[-1] left-0 translate-y-[100%]
                                    rounded-md bg-black
                                '
                                ref={chooseFlagContainer}
                            >
                                {
                                    flagsData.map((flag , i) => {
                                        return (
                                            <img
                                                key={i}
                                                src={flag.flagImg}
                                                alt={flag.flagType}
                                                className={'flag-img-TC cursor-pointer'}
                                                onClick={() => {
                                                    flagImage.current.src = flag.flagImg;
                                                    controller.changeFlag(flag.flagImg,taskId);
                                                    chooseFlagContainer.current.classList.toggle('visible-container');
                                                }}
                                            />
                                        )
                                    })
                                }

                            </div>
                        </div>
                        <div
                            className='TC-buttons-container'
                        >
                            <img
                                src={done}
                                alt={'edit image'}
                                className='done-edit-buttons-TC'
                                onClick={() => {
                                    setFlagSrc(flagImage.current.src);
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
                                src={flagSrc}
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