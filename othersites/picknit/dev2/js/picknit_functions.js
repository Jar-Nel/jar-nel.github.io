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
const getSavedUsersObj = () => {
    let oUsers = new Users();
    let oUser = {};
    let savedUser = getObj('oUser');
    if (savedUser.length === 0) {
        //no user data found, create dummy test data.
        initializeData();
        savedUser = getObj('oUser');
    }
    oUser = new User(savedUser.firstName, savedUser.lastName, savedUser.screenName);
    oUser.categories = savedUser.categories;
    oUser.pictures = savedUser.pictures;

    oUsers.addUser(oUser);

    return oUsers;    
}

const initializeData = () => {
    let myUser = new User('Jared', 'Nelson', 'JLN');
    let catIds = [];

    catIds.push(myUser.addCategory('Pictures of Cats'));
    catIds.push(myUser.addCategory('Pictures of Dogs'));
    catIds.push(myUser.addCategory('Funny Memes'));
    myUser.addPicture(`Well it isn't false`, '2019-09-17', imagedata[3], catIds[2]);
    myUser.addPicture(`Truth!`, '2019-08-21', imagedata[2], catIds[2]);
    myUser.addPicture(`Truth?`, '2019-08-22', imagedata[1], catIds[2]);
    myUser.addPicture('Eric Schmidt Evil, Inc.', '2019-08-24', imagedata[0], catIds[2]);
    myUser.addPicture(`Cats in a box`, '2019-09-08', imagedata[4], catIds[0]);
    myUser.addPicture(`Wassup?`, '2019-09-10', imagedata[5], catIds[1]);
    saveObj('oUser', myUser);
}


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