//import { Collapse } from "../darkly/js/bootstrap";

(function () {
  $(window).scroll(function () {
    var top = $(document).scrollTop();
    if (top > 50)
      $('#home > .navbar').removeClass('navbar-transparent');
    else
      $('#home > .navbar').addClass('navbar-transparent');
  });

  $("a[href='#']").click(function (e) {
    e.preventDefault();
  });

  var $button = $("<div id='source-button' class='btn btn-primary btn-xs'>&lt; &gt;</div>").click(function () {
    var html = $(this).parent().html();
    html = cleanSource(html);
    $("#source-modal pre").text(html);
    $("#source-modal").modal();
  });

  $('.bs-component [data-toggle="popover"]').popover();
  $('.bs-component [data-toggle="tooltip"]').tooltip();

  $(".bs-component").hover(function () {
    $(this).append($button);
    $button.show();
  }, function () {
    $button.hide();
  });

  function cleanSource(html) {
    html = html.replace(/×/g, "&times;")
      .replace(/«/g, "&laquo;")
      .replace(/»/g, "&raquo;")
      .replace(/←/g, "&larr;")
      .replace(/→/g, "&rarr;");

    var lines = html.split(/\n/);

    lines.shift();
    lines.splice(-1, 1);

    var indentSize = lines[0].length - lines[0].trim().length,
      re = new RegExp(" {" + indentSize + "}");

    lines = lines.map(function (line) {
      if (line.match(re)) {
        line = line.substring(indentSize);
      }

      return line;
    });

    lines = lines.join("\n");

    return lines;
  }

})();

//Adding my own functions here
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

//this is to support the color changing
let colorI = 1;
let animateColor = '';//setInterval(changeColor, 150)'';

//This is to support animation
let bPlayDark = true;
let speedMultiplier = 3;


//This is the page load function
const LoadContent = (hash) => {
  //Reload the last user selected theme
  let theme = getCookie('theme');
  if (theme === "") theme = "light"; else bPlayDark = false;
  changeTheme(theme);

  document.getElementById('pageContent').style.display = 'none'

  //Load the home page if no page specified.
  if (!hash) hash = window.location.hash;
  if (hash.length < 1) hash = 'home.html';
  hash = hash.replace('#', '');
  window.location.hash = `#${hash}`;

  //If there is other information we need to render the page it will be seperated by a ~. This splits the page from the information
  let optString = '';
  if (hash.indexOf('~') > 0) {
    optString = hash.split('~')[1];
    hash = hash.split('~')[0];
  }

  let pageContent = document.getElementById('pageContent');
  let breadCrumb = document.getElementById('breadcrumb');
  let navObj = undefined;
  //Load the navigation JSON and look at what we need to compose the page.
  LoadJson('content/navigation.json').then((response) => {
    navObj = response.find((element) => { return element.hash === hash });
    if (!navObj) {
      showError(`Unable to load content.  Unknown hash.`);
    }
    else {
      //Title
      document.title = `JPoD:${navObj.title}`;
      //Breadcrumb
      breadCrumb.innerHTML = '';
      navObj.breadcrumb.forEach(element => {
        breadCrumb.innerHTML += element;
      });
      //NavBar
      //navbarItems.innerHTML = '';
      $('.nav-item').removeClass('active');
      navObj.activeNavbaritems.forEach(element => {
        $(element).addClass('active');
      });
      //Content
      LoadContentPage(`${navObj.path}${navObj.page}`).then((response) => {
        if (response) {
          /* #region Page Processing */
          switch (hash.toLowerCase()) {
            case "toc.html":
              /* #region TOC */
              pageContent.innerHTML = response;
              switch (optString.toLowerCase()) {
                case 's1':
                  $('#collapse1').collapse('show');
                  break;
                case 's2':
                  $('#collapse2').collapse('show');
                  break;
                case 's3':
                  $('#collapse3').collapse('show');
                  break;
                case 's4':
                  $('#collapse4').collapse('show');
                  break;
              }
              document.getElementById('pageContent').style.opacity = "0";
              document.getElementById('pageContent').style.display = 'block';
              fadeDiv('pageContent', 0, 1, .1, 50, console.log);
              /* #endregion */
              break;
            case "ct.html":
              /* #region Current Topics */
              LoadJson('content/currenttopics/ctcontent.json').then((responsect) => {
                ctObj = responsect.find((ctElement) => { return ctElement.entry === optString });
                if (!ctObj) {
                  showError(`Unable to load content.  Unknown Current Topics entry`);
                } else {
                  //Current Topic data loaded.
                  document.title = `JPoD:${ctObj.pagetitle}`;
                  breadCrumb.innerHTML += ctObj.breadcrumb;
                  response = response.replace(/##ctTitle##/g, ctObj.title);
                  response = response.replace(/##ctAuthor##/g, ctObj.author);
                  response = response.replace(/##ctDate##/g, ctObj.date);
                  response = response.replace(/##ctResponseTitle##/g, ctObj.responsetitle);

                  if (ctObj.assignment.indexOf('.html') < 0) {
                    response = response.replace(/##ctAssignment##/g, ctObj.assignment);
                    response = response.replace(/##ctResponse##/g, ctObj.response);
                    pageContent.innerHTML = response;
                    document.getElementById('pageContent').style.opacity = "0";
                    document.getElementById('pageContent').style.display = 'block';
                    fadeDiv('pageContent', 0, 1, .1, 50, console.log);
                  }
                  else {
                    LoadContentPage(`${navObj.path}${ctObj.entry}/${ctObj.assignment}`).then((assignmentContent) => {
                      response = response.replace(/##ctAssignment##/g, assignmentContent);
                      LoadContentPage(`${navObj.path}${ctObj.entry}/${ctObj.response}`).then((responseContent) => {
                        response = response.replace(/##ctResponse##/g, responseContent);
                        pageContent.innerHTML = response;
                        document.getElementById('pageContent').style.opacity = "0";
                        document.getElementById('pageContent').style.display = 'block';
                        fadeDiv('pageContent', 0, 1, .1, 50, console.log);
                      }).catch((e) => {
                        showError(`Content page ${navObj.path}${ctObj.entry}${ctObj.response} not found.`);
                      });
                    }).catch((e) => {
                      showError(`Content page ${navObj.path}${ctObj.entry}${ctObj.assignment} not found.`);
                    });
                  }
                }
              }).catch((e) => {
                showError(`CT Content JSON not found.`);
              });

              /* #endregion */
              break;
            default:
              pageContent.innerHTML = response;
              document.getElementById('pageContent').style.opacity = "0";
              document.getElementById('pageContent').style.display = 'block';
              fadeDiv('pageContent', 0, 1, .1, 50, console.log);
              break;
          }
          //Start rainbow animation of section if present.
          if (document.getElementById('spanColor')) {
            //Start the color change
            objColorId = document.getElementById('spanColor');
            objColorId.innerHTML = generateRainbowText("Hello, world!");
            //setTimeout("changeColor()", 150);
            clearInterval(animateColor);
            animateColor = setInterval(changeColor, 150);
          }
          /* #endregion */
        }
        else {
          showError("Content page not found.<br /><img src='img/derpshrug.png' style='width:400px; max-width:100%;' />");
        }
      }).catch((e) => {
        showError("Content page not found.<br /><img src='img/derpshrug.png' style='width:400px; max-width:100%;' />");
      });
    }
  }).catch((e) => {
    showError("Unable to load content json.<br />" + e.message + "<br /><img src='img/derpshrug.png' style='width:400px; max-width:100%;' />");
  });
  //freaking jQuery calls. 
  //$('.navbar-collapse').collapse('hide');
  $('#navbarColor01').collapse('hide');
  //$('.collapse').collapse('show');
}

const LoadJson = async (locationJSon) => {
  //let response = await fetch('content/navigation.json');
  let response = await fetch(locationJSon);
  return await response.json();
}

const LoadContentPage = async (page) => {
  let response = await fetch(page);
  return await response.text();
}

const showError = (errMsg) => {
  document.getElementById('breadcrumb').innerHTML='&nbsp;';
  document.getElementById('pageContent').innerHTML = `<div>${errMsg}</div><img src='img/derpshrug.png' style='width:400px; max-width:100%;' />`;
  document.getElementById('pageContent').style.display = 'block';
}


/* #region Rainbow Text */
function changeColor() {
  try {
    let text = "Hello, world!";
    let objColorId = document.getElementById("spanColor");
    if (objColorId) {
      let childNodes = objColorId.childNodes;
      for (let i = 0; i < childNodes.length; i++) {
        let hue = (360 * (i + colorI) / text.length);
        if (hue > 359) hue = hue - 360;
        childNodes[(text.length - 1) - i].style = `color:hsl(${hue},80%,50%);`
      }
      colorI++;
      if (colorI > text.length) colorI = 1;
    }
    else clearInterval(animateColor);
  }
  catch (e) {
    console.log(e.message);
    clearInterval(animateColor);
  }
}

function changeColor2() {
  let text = "Hello, World";
  let objColorId = document.getElementById("spanColor");
  if (objColorId) {
    let childNodes = objColorId.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
      let hue = (360 * (i + colorI) / text.length);
      if (hue > 359) hue = hue - 360;
      childNodes[text.length - i].style = `color:hsl(${hue},80%,50%);`
    }
    colorI++;
    if (colorI > text.length) colorI = 1;
    setTimeout("changeColor()", 150);
  }
}

function generateRainbowText(text) {
  let outText = "";
  for (let i = 0; i < text.length; i++) {
    let hue = (360 * (i + colorI) / text.length);
    if (hue > 359) hue = hue - 360;
    let charText = "<span id=\"sc_" + i.toString() + "\" style=\"color:hsl(" + hue + ",80%,50%);\">";
    outText += charText + text[i] + "</span>";
  }
  //document.getElementById("output").value="colorI: "+colorI+"\r\n"+outText;
  return outText;
}

/* #endregion */

/* #region Change Theme and Theme transition Animations */
const changeSpeedMultiplier = (multiplier) => {
  if (multiplier) {
    speedMultiplier = multiplier;
  } else {
    if (speedMultiplier === 0) speedMultiplier = 3;
    else speedMultiplier = 0;
    //speedMultiplier = speedMultiplier + 1;
    //if (speedMultiplier > 3) speedMultiplier = 1;
  }
  console.log(`Speed: ${speedMultiplier}x`)
}

const clickTheme = (oldTheme) => {
  $('#navbarColor01').collapse('hide');

  document.getElementById('divMask').style.display = "block";
  if (oldTheme === "dark") {
    //console.log(`Current Theme: ${oldTheme}. Changing theme to: light`);
    divOverlay = document.getElementById('divOverlay');
    divOverlay.style.opacity = 1.0;
    divOverlay.style.boxShadow = "0px 0px 0px 50000px #FFF";
    divOverlay.style.display = "block";
    changeTheme("light");
    fadeDiv('divOverlay', 1.0, 0, .1, 70, (result) => {
      divObj.style.display = "none";
    });
    setCookie('theme', 'light', 1);
  } else {
    //console.log(`Current Theme: ${oldTheme}. Changing theme to: dark`);
    if (bPlayDark) {
      animateDark();
      bPlayDark = false;
    }
    else {
      divOverlay = document.getElementById('divOverlay');
      divOverlay.style.opacity = 1.0;
      divOverlay.style.boxShadow = "0px 0px 0px 50000px #000";
      divOverlay.style.display = "block";
      changeTheme("dark");
      fadeDiv('divOverlay', 1.0, 0, .1, 70, (result) => {
        divObj.style.display = "none";
      });
    }
    setCookie('theme', 'dark', 1);
    //changeTheme("dark");
  }
}

const changeTheme = (theme) => {
  document.getElementById('divMask').style.display = "block";
  //Change theme
  linkTags = document.getElementsByName('cssLink'); //.forEach(linkTag => {
  for (let i = 0; i < linkTags.length; i++) {
    if (linkTags[i].title === theme) linkTags[i].disabled = false;
    else linkTags[i].disabled = true;
  }
  //update control
  themeControl = document.getElementById('ctlSwitchTheme');
  themeControl.title = theme;
  themeControl.innerHTML = `Theme: <img src=\"img/lightsw_${theme}.png\" style=\"height: 32px\";>`;
  $('#navbarColor01').collapse('hide');
  document.getElementById('divMask').style.display = "none";
}

const dialogControlClick = (action) => {
  let dialogControlObj = document.getElementById('dialogControl');
  if (dialogControlObj) {
    if (action) dialogControlObj.title = action;
    if (dialogControlObj.title.toLowerCase() === "pause") {
      changeSpeedMultiplier(0);
      dialogControlObj.title = "play";
      //document.getElementById('dialogControlImage').src='../image/play_32.png';
      dialogControlObj.innerHTML = "<img src='img/play_32.png' style='width:32px;'>";
    } else {
      changeSpeedMultiplier(3);
      dialogControlObj.title = "pause";
      dialogControlObj.innerHTML = "<img src='img/pause_32.png' style='width:32px;'>";
    }
  }
}

const animateDialog = async (dialogTxt, callback) => {
  /* #region AnimateDialog */
  //Text at 4 per second.  _ is a one second pause, # is a <br>, ~ clears the box
  let dialogObj = document.getElementById('dialogDiv');
  let dialogContent = document.getElementById('dialogContent');
  if (dialogObj && dialogContent) {
    dialogObj.style.display = "block";
    //let dialogTxt = "Hey!#_Who turned out the lights?___~___Wait.#_I found a flashlight.____#Let's see if this helps._____"
    let divTxt = '';
    let dialogTxtPosition = 0;
    let waitCount = 0;
    let frameCount = 0;
    let bClearDialog = true;
    dialogContent.innerHTML = "";

    const dialogFrame = () => {
      if (frameCount > 3) {
        frameCount = 1;
        if (bClearDialog) {
          divTxt = '';
          bClearDialog = false;
        }
        if (dialogTxtPosition < dialogTxt.length) {
          let c = dialogTxt.substr(dialogTxtPosition, 1);
          switch (c) {
            case '_':
              if (waitCount > 8) {
                dialogTxtPosition++;
                waitCount = 0;
              } else {
                waitCount++;
              }
              break;
            case '#':
              divTxt += '<br />';
              dialogTxtPosition++;
              break;
            case '~':
              dialogControlClick('pause');
              dialogTxtPosition++;
              bClearDialog = true;
              //clearInterval(animateDialogID);
              break;
            default:
              divTxt += c;
              dialogTxtPosition++;
          }
          dialogContent.innerHTML = divTxt;
        } else {
          clearInterval(animateDialogID);
          dialogObj.style.display = "none";
          callback("animateDialog done");
        }
      } else {
        frameCount = frameCount + (speedMultiplier * 1);
      }
    }
    let animateDialogID = setInterval(dialogFrame, (22));
  }
  /* #endregion */
}

const animateFlashlight = async (seconds, callback) => {
  /* #region AnimateFlashlight */
  divOverlay = document.getElementById('divOverlay');
  divOverlay.style.opacity = 1.0;
  divOverlay.style.boxShadow = "0px 0px 0px 50000px #000";
  divOverlay.style.display = "block";

  let diameter = 150;
  if (window.innerWidth > 800) diameter = 200;
  divOverlay.style.minWidth = `${diameter}px`;
  divOverlay.style.minHeight = `${diameter}px`;

  let bounceHeight = (window.innerHeight - diameter) - 5;
  let bounceWidth = (window.innerWidth - diameter) - 5;
  let post = diameter;
  let posl = diameter;
  let x = (Math.round((Math.random() * 4) - 2) * 2)
  let y = (Math.round((Math.random() * 4) - 2) * 2)
  let frameCount = 0;

  const flashlightFrame = () => {
    if (frameCount < (seconds * 100)) {
      while ((post > bounceHeight) || (post < 0) || (posl > bounceWidth) || (posl < 0)) {
        x = (Math.round((Math.random() * 4) - 2) * 2);
        y = (Math.round((Math.random() * 4) - 2) * 2);
        post = (post + y);
        posl = (posl + x);
      }
      divOverlay.style.top = `${post}px`;
      divOverlay.style.left = `${posl}px`;
      post = (post + y);
      posl = (posl + x);
      frameCount++;
      //if (!((post > bounceHeight) || (post < 0) || (posl > bounceWidth) || (posl < 0))) {
      //divOverlay.style.top = `${post}px`;
      //divOverlay.style.left = `${posl}px`;
      //}
    } else {
      diameter = 1;
      divOverlay.style.minWidth = `${diameter}px`;
      divOverlay.style.minHeight = `${diameter}px`;
      divOverlay.style.top = '100%';
      divOverlay.style.left = '100%';

      clearInterval(animateFlashlightID);
      callback("animateFlashlight done");
    }
  }
  let = animateFlashlightID = setInterval(flashlightFrame, (10));

  /* #endregion */
}

const animateDark = () => {
  //clearInterval(animateFlashlight);
  //clearInterval(animateDialog);
  divOverlay = document.getElementById('divOverlay');
  divOverlay.style.opacity = 1.0;
  divOverlay.style.boxShadow = "0px 0px 0px 50000px #000";
  divOverlay.style.display = "block";


  let dialogTxt = "Hey!#_Who turned out the lights?_~___Wait.#_I found a flashlight.____#Let's see if this helps._~";
  animateDialog(dialogTxt, (result) => {
    console.log(result);
    animateFlashlight(6, (result) => {
      console.log(result);
      dialogTxt = "That didn't help!#__. _ . _ . _ #___We'll just have to wait for our eyes to adjust._~";
      animateDialog(dialogTxt, (result) => {
        console.log(result);
        changeTheme("dark");
        fadeDiv('divOverlay', 1.0, 0, .02, 100, (result) => {
          divObj.style.display = "none";
        });
        dialogTxt = "There we go...___#That's better.________";
        animateDialog(dialogTxt, console.log);
      });
    });
  });
}

const animateLight = () => {
  divOverlay = document.getElementById('divOverlay');
  divOverlay.style.boxShadow = "0px 0px 0px 50000px #FFF";
  divOverlay.style.display = "block";
  fadeDiv('divOverlay', 1.0, 0, 0.1, 70, (result) => {
    divObj.style.display = "none";
  });
}

const fadeDiv = async (divObjID, startopacit, endopacit, changeopacit, delay, callback) => {
  divObj = document.getElementById(divObjID);
  if (divObj) {
    let opacit = startopacit;
    const fadeDivFrame = () => {
      let bDone = false;
      if (startopacit < endopacit) {
        opacit = opacit + changeopacit;
        if (!(opacit < endopacit)) bDone = true;
      }
      else {
        opacit = opacit - changeopacit;
        if (!(opacit > endopacit)) bDone = true;
      }

      divObj.style.opacity = opacit;
      //console.log(opacit, changeopacit);

      if (bDone) {
        clearInterval(fadeDivID);
        callback("fadeDiv Done");
      }
    }
    let = fadeDivID = setInterval(fadeDivFrame, delay);
  }
}

/* #endregion */

/* #region cookies */
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
/* #endregion */


/*$(document).ready(function () {

  $('.collapse').on('shown.bs.collapse', function () {
    $(this).parent().addClass('active');
  });

  $('.collapse').on('hidden.bs.collapse', function () {
    $(this).parent().removeClass('active');
  });

});*/