/* A user has categories and pictures. */

//Data for a user
//Set up as an object.  
//Users will be an array of user objects when I get multi-user implemented.
let users = {
    data: [],
    isValidUserID: function (userID) {
        const userExist = this.data.filter(function (user) {
            return user.ID === userID;
        });
        if (userExist.length === 1) return true;
        else return false;
    },
    getUser: function (userID) {
        if (this.isValidUserID(userID)) {
            return this.data.filter(function (user) {
                return user.ID === userID;
            })[0];
        } else return false;
    },
    addUser: function (user) {
        this.data.push(user);
    },
    deleteUser: function (userID) {
        if (this.isValidUserID(userID)) {
            this.data = this.data.filter(function (user) {
                return user.ID !== userID;
            });
            return true;
        } else return false
    },
    editUser: function (userID, oEdits) {
        if (this.isValidUserID(userID)) {
            const userExist = this.categories.filter(function (user) {
                return user.ID === userID;
            });
            Object.entries(oEdits).forEach(function (entry) {
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


const User = function (firstName, lastName, screenName) {
    this.ID = getNextID(users.data),
        this.firstName = firstName,
        this.lastName = lastName,
        this.screenName = screenName,
        this.categories = [],
        this.pictures = [],
        /* #region Functions */
        this.isValidCatID = function (categoryID) {
            const catExist = this.categories.filter(function (cat) {
                return cat.ID === categoryID;
            });
            if (catExist.length === 1) return true;
            else return false;
        },
        this.numPicsInCategory = function (categoryID) {
            return this.pictures.filter(function (picture) {
                return picture.categoryID === categoryID;
            }).length;
        },
        this.sortedCategories = function () {
            return this.categories.sort(function (a, b) {
                // Sort categories into alpha order
                if (a.name < b.name) return -1;
                else if (a.name > b.name) return 1;
                else return 0;
            });
        },
        this.addCategory = function (categoryName) {
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
        },
        this.deleteCategory = function (categoryID) {
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
        },
        this.editCategory = function (categoryID, oEdits) {
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
        },
        this.findCategories = function (searchText) {
            const filteredCats = this.categories.filter(function (cat) {
                return cat.categoryName.includes(searchText);
            });
            if (filteredCats.length === 0) return false;
            else return filteredCats;
        }
        this.getCategoryObject = function (categoryID, includePics = true) {
            let checkExisting = this.categories.filter(function (category) {
                return category.ID === categoryID;
            });
            if (checkExisting.length === 1) {
                const oCategory = checkExisting[0];
                if (includePics) {
                    const categoryPics = this.pictures.filter(function (picture) {
                        return picture.categoryID === oCategory.ID;
                    }).sort(function (a, b) {
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
        },

        this.isValidPictureID = function (pictureID) {
            const picExist = this.pictures.filter(function (pic) {
                return pic.ID === pictureID;
            });
            if (picExist.length === 1) return true;
            else return false;
        },
        this.addPicture = function (picCaption, picDate, picData, categoryID = 0) {
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
        },
        this.deletePicture = function (pictureID) {
            if (this.isValidPictureID(pictureID)) {
                this.pictures = this.pictures.filter(function (picture) {
                    return picture.ID !== pictureID;
                });
                return true;
            } else return false;
        },
        this.editPicture = function (pictureID, oEdits) {
            if (this.isValidPictureID(pictureID)) {
                const picExist = this.pictures.filter(function (pic) {
                    return pic.ID === pictureID;
                });
                Object.entries(oEdits).forEach(function (entry) {
                    if (Object.keys(picExist).includes(entry[0])) {
                        picExist[entry[0]] = entry[1];
                    }
                });
                return true;
            }
            else return false;
        },
        this.getPicture = function (pictureID) {
            if (this.isValidPictureID) {
                return this.pictures.filter(function (pic) {
                    return pictureID == pic.ID;
                })[0];
            } else return false;
        }

    /* #endregion */
}
