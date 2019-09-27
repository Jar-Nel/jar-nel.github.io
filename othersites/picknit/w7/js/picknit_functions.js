//This is a function to find the max ID of the objects in an array 
//and auto increment it for the next object
const getNextID = function (oArray) {
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
const getObj = function (key) {
    const oJSON = localStorage.getItem(key);
    if (oJSON !== null) {
        return JSON.parse(oJSON);
    } else {
        return [];
    }
}

//Save notes to local storage
const saveObj = function (key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
    console.log(obj);
}