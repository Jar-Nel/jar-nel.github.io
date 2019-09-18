const loggedInUserID = 1;
let oUser = {};

//Start the program on page load
const onLoad = function () {
    //alert('hello');
    /* #region Initial Data */

    //Loading some initial data for users to play with 
    //Since we're not using persistant storage yet.
    let myUser = new User('Jared', 'Nelson', 'JLN');
    myUser.addCategory('Pictures of Cats');
    myUser.addCategory('Pictures of Dogs');
    myUser.addCategory('Funny Memes');
    myUser.addPicture(`Well it isn't false`, '2019-09-17', imagedata[3], 3);
    myUser.addPicture(`Truth!`, '2019-08-21', imagedata[2], 3);
    myUser.addPicture(`Truth?`, '2019-08-22', imagedata[1], 3);
    myUser.addPicture('Eric Schmidt Evil, Inc.', '2019-08-24', imagedata[0], 3);
    myUser.addPicture(`Cats in a box`, '2019-09-08', imagedata[4], 1);
    myUser.addPicture(`Wassup?`, '2019-09-10', imagedata[5], 2);
    users.addUser(myUser);
    
    /* #endregion */

    //Populate the user object with the logged in user data
    oUser = users.getUser(loggedInUserID);

    
    //Load the inital display
    if (oUser) {
        updateUserPanel(userPanel());
        updateControlsPanel(controlsPanelHome());
        updateContentPanel(categoryCardList());
    }
    else {
        updateUserPanel(userPanel());
    }
}

/*
* PicKnit LearnTogether Week 5
* An attempt to live within the constraints of the first five sections.
* Arrays and loops!  Finally!
*/

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
                const newCategory = {
                    ID: getNextID(this.categories),
                    name: categoryName
                }
                this.categories.push(newCategory);
                return true;
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
        this.getCategoryObject = function (categoryID, includePics = true) {
            let checkExisting = this.categories.filter(function (category) {
                return category.ID === categoryID;
            });
            if (checkExisting.length === 1) {
                const oCategory = checkExisting[0];
                if (includePics) {
                    const categoryPics = this.pictures.filter(function (picture) {
                        return picture.categoryID === oCategory.ID;
                    })
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
            const newPicture = {
                ID: getNextID(this.pictures),
                caption: picCaption,
                date: picDate,
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


/* #region control forms */

//this is the form used to add a category
const formAddCategory = function () {
    //addCategoryElement
    //  inputElement
    //  inputControlElement
    //    btnSaveElement
    //    btnCancelElement

    //Create a new element to contain the form
    const addCategoryElement = document.createElement('div');
    let inputTxt = '';

    
    //Add an input field to get the category name
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.id = 'formCat_name';
    inputElement.addEventListener('input', function (e) {
        inputTxt = e.target.value;
        if (e.target.value.length > 0) {
            document.getElementById(e.target.id + '_error').innerHTML = '';
        }
    });

    //Add a container for the form controls
    const inputControlElement = document.createElement('div');
    
    //Add a save button
    const btnSaveElement = document.createElement('button');
    btnSaveElement.textContent = `Save`;
    btnSaveElement.addEventListener('click', function (e) {
        //const catName = document.getElementById('').value;
        if (oUser.addCategory(inputTxt)) {
            document.getElementById('UserPanel').innerHTML = '';
            document.getElementById('UserPanel').appendChild(userPanel());
            updateControlsPanel(controlsPanelHome());
            updateContentPanel(categoryCardList());
        } else {
            document.getElementById('formCat_name_error').innerHTML = `"${inputTxt}" already taken`
            //alert('name taken');
        }
    });
    //Add a cancel button
    const btnCancelElement = document.createElement('button');
    btnCancelElement.textContent = `Cancel`;
    btnCancelElement.addEventListener('click', function (e) {
        updateControlsPanel(controlsPanelHome());
        updateContentPanel(categoryCardList());
    });

    //Add the button elements to the controls container
    inputControlElement.appendChild(btnSaveElement);
    inputControlElement.appendChild(btnCancelElement);

    //add the inputs and controls to the form
    addCategoryElement.appendChild(inputDivElement("Category Name", inputElement));
    addCategoryElement.appendChild(inputControlElement);

    //return the form
    return addCategoryElement;
}

//returns an element containing the add picture form
const formAddPicture = function () {
    //Needs to collect the followint info
    //File Input
    //Caption
    //Category selection
    //date string
    //Save or cancel

    const addPictureElement = document.createElement('div');
    //This object is used to store form data and to help with form validation.
    //The element is logged so we know where to send an error message.
    //The name is used in messages to the user
    //Valid is a boolean for validation of the data.
    //Value will be appended by the form elements
    let oPic = {
        image: {
            srcElementID: 'formPic_pictureFile',
            name: 'Image',
            valid: false
        },
        caption: {
            srcElementID: 'formPic_caption',
            name: 'Caption',
            valid: false
        },
        category: {
            srcElementID: 'formPic_pictureCategory',
            name: 'Category',
            valid: false
        },
        datestring: {
            srcElementID: 'formPic_date',
            name: 'Image Date',
            valid: false
        }
    }

    //file input element <input type='file' />
    //This isn't something Andrew has shown but I needed it for this project.
    const fileElement = document.createElement('input');
    //Set the id to the defined id in the oPic object for this input
    fileElement.id = oPic.image.srcElementID;
    fileElement.type = 'file';
    //When a file is selected validate and add to pic object
    fileElement.addEventListener('change', function (e) {
        //Reset the error message on change.
        document.getElementById(e.target.id + '_error').innerHTML = '';
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            //Event e2 because we still need to access e from the previous event
            reader.onload = function (e2) {
                const data = e2.target.result;
                const type = data.split(';')[0].split(':')[1];
                //console.log(type);
                //Make sure the file is a picture
                if (type.includes('image')) {
                    oPic.image.value = data;
                    oPic.image.valid = true;
                } else {
                    document.getElementById(e.target.id + '_error').innerHTML = 'The selected file was not recognized as a valid image format';
                    oPic.image.valid = false;
                }
            };
        }
    });

    //Caption input element <input type='text' />
    const captionElement = document.createElement('input');
    //Set the id to the defined id in the oPic object for this input
    captionElement.id = oPic.caption.srcElementID;
    captionElement.type = 'text';
    captionElement.addEventListener('input', function (e) {
        //update the object value on input
        oPic.caption.value = e.target.value;
        if (e.target.value.length > 0) {
            //reset any error messages on new input.
            document.getElementById(e.target.id + '_error').innerHTML = '';
            oPic.caption.valid = true;
        }
        else oPic.caption.valid = false;
    });

    //Category Selection select element (dropdown)
    const catElement = document.createElement('select');
    //Set the id to the defined id in the oPic object for this input
    catElement.id = oPic.category.srcElementID;
    //sorted categories is alphabetical
    oUser.sortedCategories().forEach(function (category) {
        //Add each category to the drop down list
        const option = document.createElement('option');
        option.value = category.ID;
        option.text = category.name;
        catElement.appendChild(option);
        //Set up initial category value
        if (!oPic.category.value) {
            oPic.category.value = category.ID;
            oPic.category.valid = true;
        }
    });
    catElement.addEventListener('change', function (e) {
        //Set the object value to the selected dropdown value
        oPic.category.value = e.target[e.target.selectedIndex].value;
        //Validate value
        if (oUser.getCategoryObject(parseInt(oPic.category.value), false)) {
            document.getElementById(e.target.id + '_error').innerHTML = '';
            oPic.category.valid = true;
        }
        else {
            document.getElementById(e.target.id + '_error').innerHTML = 'The selected category is not available';
            oPic.category.valid = false;
        }
    });

    //Date entry <input type='date'>
    //This returns a string.  
    //Don't worry, Rio, I'm not using date functions yet (Andrew hasn't shown them)
    const dateElement = document.createElement('input');
    dateElement.id = oPic.datestring.srcElementID;
    dateElement.type = 'date';
    dateElement.addEventListener('input', function (e) {
        //update the object value on input
        oPic.datestring.value = e.target.value;
        if (oPic.datestring.value.length > 0) {
            //clear any error messages 
            document.getElementById(e.target.id + '_error').innerHTML = '';
            //with no date functions validation is boring for now.
            oPic.datestring.valid = true;
        }
        else {
            oPic.datestring.valid = false;
        }
    });

    //Save button
    const btnSaveElement = document.createElement('button');
    btnSaveElement.textContent = `Save`;
    btnSaveElement.addEventListener('click', function (e) {
        //Validate Input
        let bValid = true;
        //Go through the oPic object, make sure they all have values.
        Object.keys(oPic).forEach(function (key) {
            if (!oPic[key].value) {
                document.getElementById(oPic[key].srcElementID + '_error').innerHTML = `${oPic[key].name} is required.`;
                bValid = false;
            }
            //if validation has passed so far, check the valid bit on the object key.
            if (bValid) bValid = oPic[key].valid;
        });
        //if validation passed, save input
        if (bValid) {
            if (oUser.addPicture(oPic.caption.value, oPic.datestring.value, oPic.image.value, parseInt(oPic.category.value))) {
                //addedd successfully, reset the view.
                updateUserPanel(userPanel());
                updateControlsPanel(controlsPanelHome());
                updateContentPanel(categoryCardList());
                //console.log(oPic);
            } else {
                alert('Unable to save pic');
            }
        }
    });
    //Cancel button
    const btnCancelElement = document.createElement('button');
    btnCancelElement.textContent = `Cancel`;
    btnCancelElement.addEventListener('click', function (e) {
        //Just reset to the previous view
        updateControlsPanel(controlsPanelHome());
        updateContentPanel(categoryCardList());
    });

    addPictureElement.appendChild(inputDivElement("Upload Image:", fileElement));
    addPictureElement.appendChild(inputDivElement("Caption for the image:", captionElement));
    addPictureElement.appendChild(inputDivElement("Put Image in Category:", catElement));
    addPictureElement.appendChild(inputDivElement("Image Date:", dateElement));
    addPictureElement.appendChild(btnSaveElement);
    addPictureElement.appendChild(btnCancelElement);

    return addPictureElement;
}

//Create an input block with a label, and input element, and an error field.
//the input element requires a unique ID.
const inputDivElement = function (labelText, inputElement) {
    //containing div element we will return
    const divElement = document.createElement('div');
    divElement.className = 'inputDivElement'
    //Label element for the input
    const labelElement = document.createElement('label');
    labelElement.textContent = labelText;
    labelElement.htmlFor = inputElement.id;
    //Error message element
    const errorElement = document.createElement('div');
    errorElement.id = inputElement.id + '_error';
    errorElement.className = 'inputerror';

    divElement.appendChild(labelElement);
    divElement.appendChild(inputElement);
    divElement.appendChild(errorElement);

    return divElement;
}

/* #endregion */

/* #region display Data */

const categoryCardElement = function (categoryID) {
    /*
        Category Name   Picture Count
        Mouse over effect  Click to view category.
    */
    //Get the category object without the pictures 
    const category = oUser.getCategoryObject(categoryID, false);
    
    //create a container element for each category
    const categoryCardElement = document.createElement('div');
    categoryCardElement.className = 'categorycard';
    //Child elements for name and count
    const categoryNameElement = document.createElement('div');
    const categoryCountElement = document.createElement('div');

    categoryNameElement.textContent = category.name;
    categoryCountElement.textContent = `${oUser.numPicsInCategory(categoryID)} Pictures`;
    categoryCardElement.appendChild(categoryNameElement);
    categoryCardElement.appendChild(categoryCountElement);

    //an event listener for click.
    categoryCardElement.addEventListener('click', function (e) {
        categoryView(categoryID);
    })

    return categoryCardElement;
}
const categoryCardList = function () {
    //A list of categoryCardElement
    const categoryCardList = document.createElement('div');
    const categoryCardTitle = document.createElement('div');
    categoryCardTitle.textContent = `Your Categories`;
    categoryCardList.appendChild(categoryCardTitle);
    //add each category to the list.
    oUser.sortedCategories().forEach(function (category) {
        categoryCardList.appendChild(categoryCardElement(category.ID));
    });
    return categoryCardList;
}

//This views the contents of a category (show all the pics in the category)
const categoryView = function (categoryID) {
    //Get the category object with pictures attached.
    const category = oUser.getCategoryObject(categoryID);
    
    //Gets a category control panel node object for navigation and category info
    const categoryControl = function () {

        
        const controlsElement = document.createElement('div');
        const controlElement = document.createElement('div');
        controlElement.innerHTML = `<span class="spanlink"><- Back to Category List</span>`;
        controlElement.addEventListener('click', function (e) {
            updateControlsPanel(controlsPanelHome());
            updateContentPanel(categoryCardList());
        });
        controlsElement.appendChild(controlElement);

        const titleElement = document.createElement('div');
        titleElement.innerHTML = `<span>${category.name}</span><span> ${oUser.numPicsInCategory(categoryID)} Pictures`;
        controlsElement.appendChild(titleElement);

        return controlsElement;

    }

    //Gets the detail items in a category (all the pictures)
    const categoryDetail = function () {
        const detailElement = document.createElement('div');
        detailElement.className = 'imagelist';

        //go through all the pictures and build an object for display.
        category.pictures.forEach(function (picture) {
            //pictureContainer
            //  pictureElement
            //    imageElement
            //    captionMask
            //    captionElement
            //  controlsElement
            //    dateElement
            const pictureContainer = document.createElement('div');
            pictureContainer.className = 'pictureContainer';
            const pictureElement = document.createElement('div');
            pictureElement.className = 'pictureElement';
            const imageElement = document.createElement('img');
            imageElement.src = picture.data;
            const captionMask = document.createElement('div');
            captionMask.className = 'imageCaptionMask';
            captionMask.textContent = picture.caption;
            const captionElement = document.createElement('div');
            captionElement.className = 'imageCaption';
            captionElement.textContent = picture.caption;

            const controlsElement = document.createElement('div');
            controlsElement.className = 'imageControl';
            const dateElement = document.createElement('span');
            dateElement.textContent = `Date: ${picture.date}`;
            controlsElement.appendChild(dateElement);

            pictureElement.appendChild(imageElement);
            pictureElement.appendChild(captionMask);
            pictureElement.appendChild(captionElement);

            pictureContainer.appendChild(pictureElement);
            pictureContainer.appendChild(controlsElement);

            detailElement.appendChild(pictureContainer);

        });

        return detailElement;

    }

    updateControlsPanel(categoryControl());

    updateContentPanel(categoryDetail());
}

const userPanel = function () {
    //this shows the user panel at the top of the page.  
    //The logged in user name and relevant stastics are here.
    const userPanelElement = document.createElement('div');
    const userAccountElement = document.createElement('div');
    const userContentSummaryElement = document.createElement('div');
    if (oUser) {
        //Greet the user
        userAccountElement.textContent = `Hello, ${oUser.screenName}`;
        userContentSummaryElement.textContent += `You have ${oUser.pictures.length} pictures in ${oUser.categories.length} categories`;
    } else {
        //User not found
        userAccountElement.textContent = `User ID not found.  Are you logged in?`;
        userContentSummaryElement.textContent += ``;
    }
    userPanelElement.appendChild(userAccountElement);
    userPanelElement.appendChild(userContentSummaryElement);
    return userPanelElement;
}

const controlsPanelHome = function () {
    //The main controls at the root of the app

    const contentPanelElement = document.createElement('div');
    const btnNewCategory = document.createElement('button');
    const btnAddPic = document.createElement('button');

    btnNewCategory.textContent = 'Add Category';
    btnNewCategory.addEventListener('click', function (e) {
        updateControlsPanel(formAddCategory());
        updateContentPanel();
    })
    contentPanelElement.appendChild(btnNewCategory);

    btnAddPic.textContent = 'Add Picture';
    btnAddPic.addEventListener('click', function (e) {
        updateControlsPanel(formAddPicture());
        updateContentPanel();
    });
    contentPanelElement.appendChild(btnAddPic);

    return contentPanelElement;
}

const updateUserPanel = function (element) {
    const UserPanel = document.getElementById('UserPanel');
    UserPanel.innerHTML = '';
    if (element)
        UserPanel.appendChild(element);
}

const updateControlsPanel = function (element) {
    const ControlsPanel = document.getElementById('ControlsPanel');
    ControlsPanel.innerHTML = '';
    ControlsPanel.appendChild(element);
}

const updateContentPanel = function (element) {
    const contentPanel = document.getElementById('ContentPanel');
    contentPanel.innerHTML = '';
    if (element)
        contentPanel.appendChild(element);
}





/* #endregion */

