import saveAllCustomTaskInLS from "../SaveAllCustomTasksInLS.js";


class CustomTaskClass {


    constructor(taskId){
        this.taskId = taskId;
        this.allProjectArr = JSON.parse(localStorage.getItem('custom-tasks'));
        this.projectData = {};
        this.projectName = null;
        this.projectImg = null;
        this.tasks = [];
        this.getProjectData(this.taskId);
    }

    getProjectData(taskId){
        this.allProjectArr.forEach((task) => {
            if(taskId === task.taskid){
                this.projectData = task;
                this.projectName = task.taskname
                this.projectImg = task.taskicon;
                this.tasks = task.tasks;
            }
        });
    }

    changeProjectImage(Image){
        this.projectData.taskicon = Image;
    }

    changeProjectName(Name){
        this.projectData.taskname = Name;
    }

    removeTasks(){
        this.projectData.tasks = [];
    }

    makeAllTasksUnDone(){
        this.projectData.forEach((task) => {
            task.done = false;
        });
    }

    saveInCustomTasksArr () {
        this.allProjectArr.forEach((project,i) => {
            if(project.taskid === this.taskId){
                this.allProjectArr[i] = this.projectData;
            }
        })
        saveAllCustomTaskInLS(this.allProjectArr);
    }

    saveAllCustomTaskInLS = (arrToSave) => {
        if(localStorage.getItem('custom-tasks') === null){
            localStorage.setItem('custom-tasks',JSON.stringify(arrToSave));
        }else{
            localStorage.setItem('custom-tasks',JSON.stringify(arrToSave));
        }
    }




    printData(){
        console.log(this.allProjectArr);
        console.log(this.projectName);
        console.log(this.tasks);
    }
}

export default CustomTaskClass;