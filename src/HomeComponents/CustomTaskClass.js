
class CustomTaskClass {


    constructor(taskId){
        this.taskId = taskId;
        this.allProjectArr = JSON.parse(localStorage.getItem('custom-tasks'));
        this.projectData = {};
        this.projectName = null;
        this.projectImg = null;
        this.tasks = [];
        this.allTasksDone = false;
        this.projectRemoved = false;
        this.getProjectData(this.taskId);
        console.log('this is constructor');
    }

    getProjectData(taskId){

        this.allProjectArr.forEach((task) => {
            if(taskId === task.taskid){
                this.projectData = task;
                this.projectName = task.taskname
                this.projectImg = task.taskicon;
                this.tasks = task.tasks;
                this.allTasksDone = this.isAllTasksDone();
            }
        });
    }

    changeProjectIcon(icon){
        this.projectData.taskicon = icon;
    }

    changeProjectName(Name){
        this.projectData.taskname = Name;
    }

    changeProjectData(name , icon , tasks){
        this.projectData.taskname = name;
        this.projectData.taskicon = icon;
        this.projectData.tasks = tasks;
    }

    removeTasks(){
        this.projectData.tasks = [];
        this.projectData.completed = 0;
    }

    isAllTasksDone(){
        if(this.tasks.length < 1) return false;
        let isDone = true;
        this.tasks.forEach((task) => {
            if(!task.done) isDone = false;
        })
        return isDone;
    }



    makeAllTasksUnDone(){
        this.projectData.tasks.forEach((task) => {
            task.done = false;
        });
        this.projectData.completed = 0;
    }

    saveInCustomTasksArr () {
        if(!this.projectRemoved){
            this.allProjectArr.forEach((project,i) => {
                if(project.taskid === this.taskId){
                    this.allProjectArr[i] = this.projectData;
                }
            })
        }
        console.log(this.projectRemoved);
        console.log(this.allProjectArr);
        this.saveAllCustomTaskInLS(this.allProjectArr);
        return this.allProjectArr;
    }

    saveAllCustomTaskInLS = (arrToSave) => {
        if(localStorage.getItem('custom-tasks') === null){
            localStorage.setItem('custom-tasks',JSON.stringify(arrToSave));
        }else{
            localStorage.setItem('custom-tasks',JSON.stringify(arrToSave));
        }
    }

    removeProject(){
        this.allProjectArr = this.allProjectArr.filter((project) => project.taskid !== this.taskId);
        this.projectRemoved = true;
        console.log(this.allProjectArr);
    }

}

export default CustomTaskClass;