'use strict'
//This is a function to find the max ID of the objects in an array
//and auto increment it for the next object
const getNextID = (oArray) => {
    //Get max USER ID and increment for new
    if (oArray.length < 1) return 1;
    else {
        //sort descending
        let sortArray = oArray.sort(function (a, b) {
            if (a.ID > b.ID) {
                return -1;
            } else if (a.ID < b.ID) {
                return 1;
            } else {
                return 0;
            }
        });
        return sortArray[0].ID + 1;
    }
}


//Save and retrieve
//Read existing usersObj from storage
const getObj = (key) => {
    
    try {
        const oJSON = localStorage.getItem(key);
        return oJSON ? JSON.parse(oJSON) : [];
    }
    catch (e) {
        return [];
    }
}

//Save notes to local storage
const saveObj = (key, obj) => {
    localStorage.setItem(key, JSON.stringify(obj));
    //console.log(obj);
}