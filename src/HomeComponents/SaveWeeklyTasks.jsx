const SaveWeeklyTasks = (obj) => {
    localStorage.setItem('weekly-tasks',JSON.stringify(obj));
}

export default SaveWeeklyTasks;