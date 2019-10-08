'use strict'

let oUsers = {};
let oUser = {};

const viewImage = () => {
    oUsers = getSavedUsersObj();
    let loggedInUserID = oUsers.data[0].ID;
    oUser = oUsers.getUser(loggedInUserID);

    const ImageContainer = document.getElementById('ImageContainer');
    const ImagePanel = document.getElementById('ImagePanel');
    const ImageMeta = document.getElementById('ImageMeta');

    //get picture id from hash string
    const imageID = location.hash.substring(1);
    if (oUser.isValidPictureID(imageID)) {
        const image = oUser.getPicture(imageID);
        const ImageElement = document.createElement('img');
        ImageElement.src = image.data;

        ImagePanel.innerHTML = '';
        ImagePanel.appendChild(ImageElement);
        ImageMeta.innerHTML = `${image.caption}`;

        ImagePanel.style.width = `${ImageElement.width}px`;
        ImageContainer.style.width= `${ImageElement.width}px`;
        console.log(ImageElement.width);
    } else {
        ImagePanel.innerHTML = 'Invalid Image ID';
    }
  
}

window.addEventListener('storage', (e) => {
    //this.console.log('some data changed');
    if (e.key === 'oUser') {
        oUser = JSON.parse(e.newValue);
        viewImage();
    }
});
