
class CustomTaskClass {


    constructor(taskId){
        this.taskId = taskId;
        this.projectData = {};
        this.projectTitle = null;
        this.projectImg = null;
        this.tasks = [];
        this.tasksNumber = 0;
        this.completed = 0;
        this.allTasksDone = false;
        this.projectRemoved = false;
        this.getProjectData(this.taskId);
        this.countDone();
    }

    getProjectData(taskId){
<<<<<<< HEAD
        this.allProjectArr = JSON.parse(localStorage.getItem('custom-tasks')) || [];

=======
>>>>>>> features
        this.allProjectArr.forEach((task) => {
            if(taskId === task.taskid){
                this.projectData = task;
                this.projectTitle = task.taskname
                this.projectImg = task.taskicon;
                this.tasks = task.tasks;
                this.allTasksDone = this.isAllTasksDone();
                this.tasksNumber = task.tasks.length;
            }
        });
    }

    changeProjectIcon(icon){
        this.projectData.taskicon = icon;
        this.projectImg = icon;
    }

    changeProjectName(Name){
        this.projectData.taskname = Name;
        this.projectTitle = Name;
    }

    changeFlag(flag,taskId){
<<<<<<< HEAD
        this.projectData.tasks.forEach((task) => {
            if(task.id === taskId) {
                task.priority = flag;
=======
        let tasks = this.projectData.tasks.map(task => task);
        let task = tasks.filter(task => task.id === taskId)[0];

        task.priority = flag;

        tasks = tasks.map((t,i) => {
            if(t.id === taskId){
                tasks[i] = task;
>>>>>>> features
            }
            return t;
        });

        this.projectData.tasks = tasks;
    }

    changeProjectTask(taskText,taskId){
<<<<<<< HEAD
        this.projectData.tasks.forEach((task) => {
            if(task.id === taskId) {
                task.task = taskText;
            }
        });
=======
        let tasks = this.projectData.tasks.map(task => task);
        let task = tasks.filter(task => task.id === taskId)[0];

        task.task = taskText;

        tasks = tasks.map((t,i) => {
            if(t.id === taskId){
                tasks[i] = task;
            }
            return t;
        });

        this.projectData.tasks = tasks;
    }

    addTask(obj){
        let tasks = this.projectData.tasks.map(task => task);

        tasks.push(obj);

        this.projectData.tasks = tasks;

        this.countTasks();
        this.countDone();
        this.saveChanges();

    }

    countTasks(){
        this.tasksNumber = this.projectData.tasks.length;
    }

    countDone(){
        this.completed = this.projectData.tasks.filter((task) => task.done).length;
        this.projectData.completed = this.completed;
>>>>>>> features
    }

    removeTasks(){
        this.projectData.tasks = [];

        this.tasks = this.projectData.tasks;

        this.countTasks();
        this.countDone();
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
<<<<<<< HEAD
=======

    saveChanges () {
        if(!this.projectRemoved){
            this.allProjectArr.forEach((project,i) => {
                if(project.taskid === this.taskId){
                    this.allProjectArr[i] = this.projectData;
                }
            })
        }
        this.saveAllCustomTaskInLS(this.allProjectArr);
    }

>>>>>>> features
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