import SaveDailyTasks from "./SaveDailyTasks.js";
import {v4 as uuidv4} from 'uuid';

class DailyController{

    constructor(){
        this.objData = JSON.parse(localStorage.getItem('daily-tasks'));
        this.projectTitle = this.objData.projectTitle;
        this.projectImg = this.objData.projectIcon;
        this.tasks = this.objData.tasks;
        this.tasksNumber = this.objData.tasks.length;
        this.completed = this.objData.tasks.filter((task) => task.done).length;
    }


    addTask(task){
        const uniqueID = uuidv4();
        const obj = {
            'task': task,
            'priority': document.querySelector('.active-flag-img').src,
            'done': false,
            'id': uniqueID,
        }
        this.objData.tasks.push(obj);
        this.countTasks();
        this.countDone();

        this.saveChanges();
    }

    saveChanges(){
        SaveDailyTasks(this.objData);
    }

    removeTask(task_id){
        this.objData.tasks.forEach((j, k) => {
            if(j.id === task_id){
                this.objData.tasks.splice(k, 1);
                this.countDone();
                this.countTasks();
            }
        })
        this.saveChanges();
    }

    removeTasks(){
        this.objData.tasks = [];

        this.countDone();
        this.countTasks();
    }

    countTasks(){
        this.tasksNumber = this.objData.tasks.length;
    }

    countDone(){
        this.completed = this.objData.tasks.filter((task) => task.done).length;
        this.objData.completed = this.completed;
    }

    editTask(task_id,taskField){
        this.objData.tasks.forEach((j) => {
            if(j.id === task_id){
                j.task = taskField;
            }
        })
        this.saveChanges();
    }

    taskIsDone(task_id){
        let done = false;
        this.objData.tasks.forEach((j) => {
            if(j.id === task_id){
                j.done = !j.done;
                done = j.done;
                this.countDone();
                this.saveChanges();
            }
        })
        return done;
    }

    makeAllTasksUnDone(){
        this.tasks.forEach((task) => {
            task.done = false;
        })

        this.completed = 0;
    }

}


export default DailyController;