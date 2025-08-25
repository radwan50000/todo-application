import rubbishImg from '../assets/delete.png';
import edit from '../assets/edit-svgrepo-com.svg';
import done from '../assets/done-mini-1484-svgrepo-com.svg';
import close from '../assets/close-bold-svgrepo-com.svg';
import {useState , useRef} from 'react';

const TaskComponent = ({task,id,flag,tempTasks , setTempTasks}) => {
    const [editingMode , setEditingMode] = useState(false);
    const [taskField, setTaskField] = useState(task);
    const [oldField , setOldField] = useState(taskField);
    const container = useRef(null);

    return (
        <div ref={container} className="w-full h-fit">
            {
                editingMode ?
                    <div
                        id={id}
                        className='TC-container'
                    >
                        <div
                            className='left-side-TC'
                        >
                            <img
                                src={flag}
                                alt={'redFlag flag'}
                                className='flag-img-TC'
                            />
                            <input
                                type={'text'}
                                value={taskField}
                                autoFocus={true}
                                className='input-field-TC'
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
                                    tempTasks.tasks = tempTasks.tasks.map((t) => {
                                        if(t.id !== id) return t;
                                        else{
                                            t.task = taskField;
                                            return t;
                                        }
                                    });
                                    setTempTasks(tempTasks);
                                    setOldField(taskField);
                                    console.log(tempTasks.tasks);
                                    setEditingMode(false);
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
                                    setEditingMode(false)
                                }}
                            />
                        </div>
                    </div>
                    :
                    <div
                        id={id}
                        className='TC-container'
                    >
                        <div
                            className='left-side-TC'
                        >
                            <img
                                src={flag}
                                alt={'redFlag flag'}
                                className='flag-img-TC'
                            />
                            <p
                                className='text-TC'>
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
                                onClick={(e) => {
                                    tempTasks.tasks = tempTasks.tasks.filter((task) => task.id !== id);
                                    setTempTasks(tempTasks);
                                    console.log(tempTasks);
                                    console.log(id);
                                    container.current.remove();
                                }}
                            />
                        </div>
                    </div>
            }
        </div>
    )
}

export default TaskComponent;