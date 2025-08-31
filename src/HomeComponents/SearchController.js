
class SearchController{
    constructor(){
        this.customProjectsData = JSON.parse(localStorage.getItem('custom-tasks'));
        this.dailyData = JSON.parse(localStorage.getItem('daily-tasks'));
        this.weeklyData = JSON.parse(localStorage.getItem('weekly-tasks'));
        this.tasks = [];

        this.getCustomTasks();
        this.getDailyTasks();
        this.getWeeklyTasks();

        console.log(this.tasks);
    }

    getCustomTasks(){
        this.customProjectsData.forEach((project) => {
            project.tasks.forEach((t) => {
                this.tasks.push({
                    taskName: t.task,
                    projectName: project.taskname,
                    type: 'custom',
                    taskId: project.taskid,
                })
            })
        })
    }

    getDailyTasks(){
        this.dailyData.tasks.forEach((project) => {
            this.tasks.push({
                taskName: project.task,
                projectName: this.dailyData.projectTitle,
                type: 'daily',
            })
        })
    }

    getWeeklyTasks(){
        this.weeklyData.tasks.forEach((project) => {
            this.tasks.push({
                taskName: project.task,
                projectName: this.weeklyData.projectTitle,
                type: 'weekly',
            })
        })
    }

}


export default SearchController;
