'use strict'
/*
* PicKnit LearnTogether Week 8
*/

const loggedInUserID = 1;
let oUser = {};

//Start the program on page load
const onLoad = () => {
    /* #region Initial Data */

    //Loading some initial data for users to play with 
    //Since we're not using persistant storage yet.
    let savedUser = getObj('oUser');
    //console.log(savedUser);
    if (savedUser.length === 0) {
        //no user data found, create dummy test data.
        initializeData();
        savedUser = getObj('oUser');
    }
    let myUser = new User(savedUser.firstName, savedUser.lastName, savedUser.screenName);
    myUser.categories = savedUser.categories;
    myUser.pictures = savedUser.pictures;
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

const initializeData= () => {
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


/* #region control forms */

//this is the form used to add a category
const formAddCategory = () => {
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
    inputElement.addEventListener('input', (e) => {
        inputTxt = e.target.value;
        if (e.target.value.length > 0) {
            document.getElementById(e.target.id + '_error').innerHTML = '';
        }
    });
    //Click the save button if user presses enter.
    inputElement.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            document.getElementById('formCat_btnSave').click();
       }
    });

    //Add a container for the form controls
    const inputControlElement = document.createElement('div');
    
    //Add a save button
    const btnSaveElement = document.createElement('button');
    btnSaveElement.id = 'formCat_btnSave';
    btnSaveElement.textContent = `Save`;
    btnSaveElement.addEventListener('click', (e) => {
        //const catName = document.getElementById('').value;
        if (inputTxt.length < 1) {
            document.getElementById('formCat_name_error').innerHTML = `Category Name is required.`
        }
        else {
            if (oUser.addCategory(inputTxt)) {
                saveObj('oUser', oUser);
                document.getElementById('UserPanel').innerHTML = '';
                document.getElementById('UserPanel').appendChild(userPanel());
                updateControlsPanel(controlsPanelHome());
                updateContentPanel(categoryCardList());
            } else {
                document.getElementById('formCat_name_error').innerHTML = `"${inputTxt}" already taken`
                //alert('name taken');
            }
        }
    });
    //Add a cancel button
    const btnCancelElement = document.createElement('button');
    btnCancelElement.textContent = `Cancel`;
    btnCancelElement.addEventListener('click', (e) => {
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
//if CategoryID is supplied the category view is pushed after form close.
//id pictureID is supplied the form edits picture elements instead of adding.
const formAddPicture =  (categoryID, pictureID) => {
    //Needs to collect the following info
    //File Input
    //Caption
    //Category selection
    //date string
    //Save or cancel

    const oPicture = pictureID ? oUser.getPicture(pictureID) : undefined;

    const addPictureElement = document.createElement('div');
    addPictureElement.className = 'formPic';

    const titleElement = document.createElement('div');
    titleElement.id = 'formPic_title';
    titleElement.textContent = oPicture ? 'Edit Picture Info' : 'Add a Picture';
    addPictureElement.appendChild(titleElement);



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

    //thumbnail element
    const thumbNailElement = document.createElement('img');
    thumbNailElement.id = 'formPic_thumb';
    thumbNailElement.src = oPicture ? oPicture.data : '';

    //file input element <input type='file' />
    //This isn't something Andrew has shown but I needed it for this project.
    const fileElement = document.createElement('input');
    //Set the id to the defined id in the oPic object for this input
    fileElement.id = oPic.image.srcElementID;
    fileElement.type = 'file';
    //When a file is selected validate and add to pic object
    fileElement.addEventListener('change', (e) => {
        //Reset the error message on change.
        document.getElementById(e.target.id + '_error').innerHTML = '';
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            //Event e2 because we still need to access e from the previous event
            reader.onload = (e2) => {
                const data = e2.target.result;
                const type = data.split(';')[0].split(':')[1];
                //Make sure the file is a picture
                if (type.includes('image')) {
                    oPic.image.value = data;
                    oPic.image.valid = true;
                    document.getElementById('formPic_thumb').src = data;
                    document.getElementById('formPic_thumb').style.display = 'block';
                } else {
                    document.getElementById('formPic_thumb').style.display = 'none';
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
    captionElement.value = oPicture ? oPicture.caption : '';
    oPic.caption.value = captionElement.value;
    oPic.caption.valid = (oPic.caption.value.length > 0);
    captionElement.addEventListener('input', (e) => {
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
    oUser.sortedCategories().forEach((category) => {
        //Add each category to the drop down list
        const option = document.createElement('option');
        option.value = category.ID;
        option.text = category.name;
        //if a categoryID was passed in and it matches, make it the selected item.
        option.selected = categoryID === category.ID ? 'selected' : '';
        catElement.appendChild(option);
        //Set up initial category value
        if (!oPic.category.value) {
            oPic.category.value = categoryID ? categoryID : category.ID;
            oPic.category.valid = true;
        }
    });
    catElement.addEventListener('change', (e) => {
        //Set the object value to the selected dropdown value
        oPic.category.value = e.target[e.target.selectedIndex].value;
        //Validate value
        if (oUser.getCategoryObject(oPic.category.value, false)) {
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
    const dateElement = document.createElement('input');
    dateElement.id = oPic.datestring.srcElementID;
    dateElement.type = 'date';
    //TODO: Format this date.
    dateElement.value = oPicture ? moment(oPicture.date).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD');
    oPic.datestring.value = dateElement.value;
    oPic.datestring.valid = true;

    dateElement.addEventListener('input', (e) => {
        //update the object value on input
        oPic.datestring.value = e.target.value;
        if (oPic.datestring.value.length > 0) {
            //clear any error messages 
            document.getElementById(e.target.id + '_error').innerHTML = '';
            //TODO:  Validate Date.
            oPic.datestring.valid = true;
        }
        else {
            oPic.datestring.valid = false;
        }
    });

    //Save button
    const btnSaveElement = document.createElement('button');
    btnSaveElement.textContent = `Save`;
    btnSaveElement.addEventListener('click', (e) => {
        //Validate Input
        let bValid = true;
        //Go through the oPic object, make sure they all have values.
        Object.keys(oPic).forEach((key) => {
            if (key === 'image' && oPicture) { //no need to validate image in edit mode.
                bValid = true;
                oPic[key].valid = true;
            } else {
                if (!oPic[key].value) {
                    document.getElementById(oPic[key].srcElementID + '_error').innerHTML = `${oPic[key].name} is required.`;
                    bValid = false;
                }
            }
            //if validation has passed so far, check the valid bit on the object key.
            if (bValid) bValid = oPic[key].valid;
            //console.log(key, bValid);
        });
        //if validation passed, save input
        if (bValid) {
            
            let bSave = false;
            if (oPicture) { //edit
                oPicture.caption = oPic.caption.value;
                oPicture.date = oPic.datestring.value;
                oPicture.categoryID = oPic.category.value;
                bSave=oUser.editPicture(pictureID, oPicture);
            } else { //add
                bSave=oUser.addPicture(oPic.caption.value, oPic.datestring.value, oPic.image.value, oPic.category.value)
            }
            if (bSave) {
                saveObj('oUser', oUser);
                //addedd successfully, reset the view.
                if (categoryID) {
                    categoryView(categoryID);
                } else {
                    updateUserPanel(userPanel());
                    updateControlsPanel(controlsPanelHome());
                    updateContentPanel(categoryCardList());
                    //console.log(oPic);
                }
            } else {
                alert('Unable to save pic');
            }
        }
    });
    //Cancel button
    const btnCancelElement = document.createElement('button');
    btnCancelElement.textContent = `Cancel`;
    btnCancelElement.addEventListener('click', (e) => {
        //Just reset to the previous view
        if (categoryID) {
            categoryView(categoryID);
        } else {
            updateControlsPanel(controlsPanelHome());
            updateContentPanel(categoryCardList());
        }
    });

    if (oPicture) { //edit mode, don't ask for a new file.
        thumbNailElement.style.display = 'block';
    } else {
        addPictureElement.appendChild(inputDivElement("Upload Image:", fileElement));
    }
    addPictureElement.appendChild(thumbNailElement);
    addPictureElement.appendChild(inputDivElement("Caption for the image:", captionElement));
    oPicture ? addPictureElement.appendChild(inputDivElement("Move Image to Category:", catElement)) : addPictureElement.appendChild(inputDivElement("Put Image in Category:", catElement));
    addPictureElement.appendChild(inputDivElement("Image Date:", dateElement));
    addPictureElement.appendChild(btnSaveElement);
    addPictureElement.appendChild(btnCancelElement);

    return addPictureElement;
}

//Create an input block with a label, and input element, and an error field.
//the input element requires a unique ID.
const inputDivElement = (labelText, inputElement) => {
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

//created an element for a single category to be added to a list of categories
const categoryCardElement = (categoryID) => {
    /*
        Category Name   Picture Count
        Mouse over effect  Click to view category.
        Button to delete category only if category is zero
    */
    //Get the category object without the pictures 
    const numPics = oUser.numPicsInCategory(categoryID);
    let strPictures = 'Picture';
    if (numPics !== 1) strPictures += 's';

    //Get the category object without the pictures
    const category = oUser.getCategoryObject(categoryID, false);
    
    //create a container element for each category
    const categoryCardElement = document.createElement('div');
    categoryCardElement.className = 'categorycard';
    
    //Child container for name and count
    const categoryDescElement = document.createElement('div');
    //Child elements for name and count
    const categoryNameElement = document.createElement('div');
    categoryNameElement.textContent = category.name;

    const categoryCountElement = document.createElement('div');
    
    categoryCountElement.textContent = `${numPics} ${strPictures}`;

    categoryDescElement.appendChild(categoryNameElement);
    categoryDescElement.appendChild(categoryCountElement);

    const btnDeleteCategoryElement = document.createElement('button');
    if (numPics === 0) {
        btnDeleteCategoryElement.textContent = 'X';
        btnDeleteCategoryElement.title = 'Delete category';
    } else {
        btnDeleteCategoryElement.textContent = '-';
        btnDeleteCategoryElement.title = `Can't delete category with pictures`;
        btnDeleteCategoryElement.classList.add('disabled');
    }
    btnDeleteCategoryElement.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (numPics === 0) {
            oUser.deleteCategory(categoryID);
            saveObj('oUser', oUser);
            updateUserPanel(userPanel());
            updateContentPanel(categoryCardList());
        } else {
            alert(`Category contains ${numPics} ${strPictures}.\nCan't delete category with pictures.`);
        }
    });
    
    categoryCardElement.appendChild(categoryDescElement);
    categoryCardElement.appendChild(btnDeleteCategoryElement);

    //an event listener for click.
    categoryCardElement.addEventListener('click', (e) => {
        categoryView(categoryID);
    })

    return categoryCardElement;
}

//adds a bunch of category card elements to a list
const categoryCardList = () => {
    //A list of categoryCardElement
    const categoryCardList = document.createElement('div');
    const categoryCardTitle = document.createElement('div');
    categoryCardTitle.textContent = `Your Categories`;
    categoryCardList.appendChild(categoryCardTitle);
    //add each category to the list.
    oUser.sortedCategories().forEach((category) => {
        categoryCardList.appendChild(categoryCardElement(category.ID));
    });
    return categoryCardList;
}

//This views the contents of a category (show all the pics in the category)
const categoryView = (categoryID) => {
    //Get the category object with pictures attached.
    const category = oUser.getCategoryObject(categoryID);
    
    //Gets a category control panel node object for navigation and category info
    const categoryControl = () => {

        let pictureText = oUser.numPicsInCategory(categoryID) === 1 ? 'picture' : 'pictures';
        
        const controlsElement = document.createElement('div');
        controlsElement.className = 'catControls';
        const controlElement = document.createElement('div');
        controlElement.className = 'catControl';
        const controlBack = document.createElement('span');
        controlBack.className = 'spanlink';
        controlBack.textContent='<-- Back to Category List'
        controlBack.addEventListener('click', (e) => {
            updateControlsPanel(controlsPanelHome());
            updateContentPanel(categoryCardList());
        });
        controlElement.appendChild(controlBack);
        const controlAdd = document.createElement('span')
        controlAdd.className = 'spanlink';
        controlAdd.textContent = '[+] Add Picture Here';
        controlAdd.addEventListener('click', (e) => {
            updateControlsPanel(formAddPicture(categoryID));
            updateContentPanel();
        });
        controlElement.appendChild(controlAdd);
        controlsElement.appendChild(controlElement);

        const titleElement = document.createElement('div');
        titleElement.className = 'catTitle';
        titleElement.innerHTML = `<div><span class='catName'>${category.name}</span></div><div><span> ${oUser.numPicsInCategory(categoryID)} ${pictureText} in category.</span></div>`;
        controlsElement.appendChild(titleElement);

        return controlsElement;

    }

    //Gets the detail items in a category (all the pictures)
    const categoryDetail = () => {
        const detailElement = document.createElement('div');
        detailElement.className = 'imagelist';

        //go through all the pictures and build an object for display.
        category.pictures.forEach((picture) => {
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
            const dateTxt = moment(picture.date).format('ll');
            dateElement.textContent = `Date: ${dateTxt}`;
            controlsElement.appendChild(dateElement);
            const btnEditElement = document.createElement('button');
            btnEditElement.textContent = 'E';
            btnEditElement.title = 'Edit Picture Info';
            btnEditElement.addEventListener('click', (e) => {
                updateControlsPanel(formAddPicture(categoryID, picture.ID));
                updateContentPanel();
            })
            const btnDeleteElement = document.createElement('button');
            btnDeleteElement.textContent = 'X';
            btnDeleteElement.title = 'Delete Picture';
            btnDeleteElement.addEventListener('click', (e) => {
                //alert(picture.ID);
                if (confirm(`Do you want to delete picture with caption:\n"${picture.caption}" ?`)) {
                    oUser.deletePicture(picture.ID);
                    saveObj('oUser', oUser);
                    updateUserPanel(userPanel());
                    categoryView(categoryID);
                }
            });
            controlsElement.appendChild(btnEditElement);
            controlsElement.appendChild(btnDeleteElement);

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

const userPanel = () => {
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

const controlsPanelHome = () => {
    //The main controls at the root of the app

    const contentPanelElement = document.createElement('div');
    const btnNewCategory = document.createElement('button');
    const btnAddPic = document.createElement('button');

    btnNewCategory.textContent = 'Add Category';
    btnNewCategory.addEventListener('click', (e) => {
        updateControlsPanel(formAddCategory());
        updateContentPanel();
        setTimeout(() => {
            if (document.getElementById('formCat_name'))
                document.getElementById('formCat_name').focus();
        }, 300);
    })
    contentPanelElement.appendChild(btnNewCategory);

    btnAddPic.textContent = 'Add Picture';
    btnAddPic.addEventListener('click', (e) => {
        updateControlsPanel(formAddPicture());
        updateContentPanel();
    });
    contentPanelElement.appendChild(btnAddPic);

    return contentPanelElement;
}

//updates the user panel at the top of the page
const updateUserPanel = (element) => {
    const UserPanel = document.getElementById('UserPanel');
    UserPanel.innerHTML = '';
    if (element)
        UserPanel.appendChild(element);
}

//updates the controls panel (between user and content)
const updateControlsPanel = (element) => {
    const ControlsPanel = document.getElementById('ControlsPanel');
    ControlsPanel.innerHTML = '';
    ControlsPanel.appendChild(element);
}

//updates content panel
const updateContentPanel = (element) => {
    const contentPanel = document.getElementById('ContentPanel');
    contentPanel.innerHTML = '';
    if (element)
        contentPanel.appendChild(element);
}





/* #endregion */

