import rubbishImg from '../assets/rubbish-img.svg';
import edit from '../assets/edit-svgrepo-com.svg';
import done from '../assets/done-mini-1484-svgrepo-com.svg';
import close from '../assets/close-bold-svgrepo-com.svg';
import {useState , useRef} from 'react';
import CheckBox from "./CheckBox.jsx";
import saveAllCustomTaskInLS from "../SaveAllCustomTasksInLS.js";
import {flagsData} from "../Data.js";
import CustomTaskClass from "./CustomTaskClass.js";

const TaskComponent2 = ({task,taskId,flag,allTasks,setAllTasks,isDone,setCompleted,objId,setNoOfTasks}) => {
    const [editingMode , setEditingMode] = useState(false);
    const taskP = useRef(null);
    const [taskField, setTaskField] = useState(task);
    const [oldField , setOldField] = useState(taskField);
    const container = useRef(null);
    const flagImage = useRef(null);
    const chooseFlagContainer = useRef(null);
    const [controller] = useState(() => new CustomTaskClass(objId));
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
                                alt={'Done image'}
                                className='done-edit-buttons-TC'
                                onClick={() => {
                                    controller.changeProjectTask(taskField,taskId);
                                    setFlagSrc(flagImage.current.src);
                                    setOldField(taskField);
                                    setEditingMode(false);
                                    setAllTasks(prevTasks => {
                                        return prevTasks.map(project => {
                                            if (project.taskid === objId) {
                                                return {
                                                    ...project,
                                                    tasks: project.tasks.map(t =>
                                                        t.id === taskId
                                                            ? { ...t, task: taskField, priority: flagImage.current.src }
                                                            : t
                                                    )
                                                };
                                            }
                                            return project;
                                        });
                                    });
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