export const saveAllCustomTaskInLS = (arrToSave) => {
    if(localStorage.getItem('custom-tasks') === null){
        localStorage.setItem('custom-tasks',JSON.stringify(arrToSave));
    }else{
        localStorage.setItem('custom-tasks',JSON.stringify(arrToSave));
    }
}

export default saveAllCustomTaskInLS;