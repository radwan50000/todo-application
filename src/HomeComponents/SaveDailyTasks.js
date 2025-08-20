const SaveDailyTasks = (obj) => {
    localStorage.setItem('daily-tasks',JSON.stringify(obj));
}

export default SaveDailyTasks;