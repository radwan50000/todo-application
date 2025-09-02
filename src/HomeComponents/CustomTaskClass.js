
class CustomTaskClass {


    constructor(taskId){
        this.taskId = taskId;
        this.projectData = {};
        this.projectTitle = null;
        this.projectImg = null;
        this.tasks = [];
        this.allTasksDone = false;
        this.projectRemoved = false;
        this.getProjectData(this.taskId);
    }

    getProjectData(taskId){
        this.allProjectArr = JSON.parse(localStorage.getItem('custom-tasks')) || [];

        this.allProjectArr.forEach((task) => {
            if(taskId === task.taskid){
                this.projectData = task;
                this.projectTitle = task.taskname
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

    changeFlag(flag,taskId){
        this.projectData.tasks.forEach((task) => {
            if(task.id === taskId) {
                task.priority = flag;
            }
        });
        console.log(this.projectData);
    }

    changeProjectTask(taskText,taskId){
        this.projectData.tasks.forEach((task) => {
            if(task.id === taskId) {
                task.task = taskText;
            }
        });
    }

    removeTasks(){
        this.projectData.tasks = [];
        this.tasks = this.projectData.tasks;
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

    addTask(obj){
        this.projectData.tasks.push(obj);
        this.saveInCustomTasksArr();
        console.log(JSON.parse(localStorage.getItem('custom-tasks')));
    }

    saveInCustomTasksArr () {
        this.allProjectArr = JSON.parse(localStorage.getItem('custom-tasks')) || [];

        if(!this.projectRemoved){
            this.allProjectArr.forEach((project,i) => {
                if(project.taskid === this.taskId){
                    this.allProjectArr[i] = this.projectData;
                }
            })
        }
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
    }

}

export default CustomTaskClass;