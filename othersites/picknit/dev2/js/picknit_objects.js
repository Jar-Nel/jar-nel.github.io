'use strict'
/* A user has categories and pictures. */

//Data for a user
//Set up as an object.  
//Users will be an array of user objects when I get multi-user implemented.
class Users {
    constructor() {
        this.data = [];
    }
    isValidUserID(userID) {
        const userExist = this.data.filter((user) => {
            return user.ID === userID;
        });
        return (userExist.length === 1);
    }
    getUser(userID) {
        if (this.isValidUserID(userID)) {
            return this.data.filter((user) => {
                return user.ID === userID;
            })[0];
        } else return false;
    }
    addUser(user) {
        this.data.push(user);
    }
    deleteUser(userID) {
        if (this.isValidUserID(userID)) {
            this.data = this.data.filter((user) => {
                return user.ID !== userID;
            });
            return true;
        } else return false
    }
    editUser(userID, oEdits) {
        if (this.isValidUserID(userID)) {
            const userExist = this.categories.filter((user) => {
                return user.ID === userID;
            });
            Object.entries(oEdits).forEach((entry) => {
                if (Object.keys(userExist[0]).includes(entry[0])) {
                    userExist[0][entry[0]] = entry[1];
                }
            });
            return true;
        }
        else {
            return false;
        }
    }
}


class User {
    constructor(firstName, lastName, screenName) {
        this.ID =uuidv4(),
            this.firstName = firstName,
            this.lastName = lastName,
            this.screenName = screenName,
            this.categories = [],
            this.pictures = []
    }
    /* #region Functions */
    isValidCatID(categoryID) {
        const catExist = this.categories.filter(function (cat) {
            return cat.ID === categoryID;
        });
        return (catExist.length === 1)
    }
    numPicsInCategory(categoryID) {
        return this.pictures.filter(function (picture) {
            return picture.categoryID === categoryID;
        }).length;
    }
    get sortedCategories() {
        return this.categories.sort(function (a, b) {
            // Sort categories into alpha order
            if (a.name < b.name) return -1;
            else if (a.name > b.name) return 1;
            else return 0;
        });
    }
    addCategory(categoryName) {
        const catExist = this.categories.filter(function (cat) {
            return cat.name.toLowerCase() == categoryName.toLowerCase();
        });
        if (catExist.length > 0) return false;
        else {
            const newID = uuidv4();
            const newCategory = {
                ID: newID,
                name: categoryName
            }
            this.categories.push(newCategory);
            return newID;
        }
    }
    deleteCategory(categoryID) {
        if (this.isValidCatID(categoryID)) {
            if (this.numPicsInCategory(categoryID) === 0) {
                this.categories = this.categories.filter(function (cat) {
                    return cat.ID !== categoryID;
                });
                return `Category ID '${categoryID}' was deleted.`;
            } else return `Cannot delete category that contains pictures.`;
        }
        else {
            return `Category ID '${categoryID}' does not exist.`;
        }
    }
    editCategory(categoryID, oEdits) {
        if (this.isValidCatID(categoryID)) {
            const catExist = this.categories.filter(function (cat) {
                return cat.ID === categoryID;
            });
            Object.entries(oEdits).forEach(function (entry) {
                if (Object.keys(catExist[0]).includes(entry[0])) {
                    catExist[0][entry[0]] = entry[1];
                }
            });
            return true;
        }
        else {
            return false;
        }
    }
    findCategories(searchText) {
        const filteredCats = this.sortedCategories.filter(function (cat) {
            return cat.categoryName.includes(searchText);
        });
        if (filteredCats.length === 0) return false;
        else return filteredCats;
    }
    getCategoryObject(categoryID, includePics = true) {
        let checkExisting = this.categories.filter(function (category) {
            return category.ID === categoryID;
        });
        if (checkExisting.length === 1) {
            const oCategory = checkExisting[0];
            if (includePics) {
                const categoryPics = this.pictures.filter((picture) => {
                    return picture.categoryID === oCategory.ID;
                }).sort((a, b) => {
                    //Sort pics into desc date order (newest first)
                    if (a.date > b.date) return -1;
                    else if (a.date < b.date) return 1;
                    else return 0;
                });
                oCategory["pictures"] = categoryPics;
            }
            return oCategory;
        }
        else return false;
    }

    isValidPictureID(pictureID) {
        const picExist = this.pictures.filter((pic) => {
            return pic.ID === pictureID;
        });
        return (picExist.length === 1)
    }
    addPicture(picCaption, picDate, picData, categoryID = 0) {
        const before = this.pictures.length;
        const timestamp = moment(picDate).valueOf();
        const newPicture = {
            ID: uuidv4(),
            caption: picCaption,
            date: timestamp,
            data: picData,
            categoryID: categoryID
        }
        this.pictures.push(newPicture);
        return (before !== this.pictures.length);
    }
    deletePicture(pictureID) {
        if (this.isValidPictureID(pictureID)) {
            this.pictures = this.pictures.filter((picture) => {
                return picture.ID !== pictureID;
            });
            return true;
        } else return false;
    }
    editPicture(pictureID, oEdits) {
        if (this.isValidPictureID(pictureID)) {
            const picExist = this.pictures.filter((pic) => {
                return pic.ID === pictureID;
            });
            Object.entries(oEdits).forEach((entry) => {
                if (Object.keys(picExist).includes(entry[0])) {
                    picExist[entry[0]] = entry[1];
                }
            });
            return true;
        }
        else return false;
    }
    getPicture(pictureID) {
        if (this.isValidPictureID) {
            return this.pictures.filter((pic) => {
                return pictureID == pic.ID;
            })[0];
        } else return false;
    }

    /* #endregion */
}