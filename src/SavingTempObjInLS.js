const SaveTempObjInLS = (objToSave) => {
    if(localStorage.getItem('custom-tasks') === null){
        localStorage.setItem('custom-tasks',JSON.stringify([objToSave]));
    }else{
        localStorage.setItem('custom-tasks',JSON.stringify(
            [...JSON.parse(localStorage.getItem('custom-tasks')),objToSave]
        ));
    }
}

export default SaveTempObjInLS;


