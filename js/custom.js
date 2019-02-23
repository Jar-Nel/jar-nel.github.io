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

//This is the page load function
const LoadContent = (hash) => {

  document.getElementById('pageContent').style.display = 'none'

  if (!hash) hash = window.location.hash;
  if (hash.length < 1) hash = 'home.html';
  hash = hash.replace('#', '');
  window.location.hash = `#${hash}`;

  let optString = '';
  if (hash.indexOf('~') > 0) {
    optString = hash.split('~')[1];
    hash = hash.split('~')[0];
  }

  let pageContent = document.getElementById('pageContent');
  let breadCrumb = document.getElementById('breadcrumb');
  let navObj = undefined;
  LoadNavJson().then((response) => {
    navObj = response.find((element) => { return element.hash === hash });
    if (!navObj) {
      pageContent.innerHTML = "Unable to load content.  Unknown hash.<br /><img src='img/derpshrug.png' style='width:400px' />";
      document.getElementById('pageContent').style.display = 'block';
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
      LoadContentPage(navObj.page).then((response) => {
        if (response) {
          pageContent.innerHTML = response;
          document.getElementById('pageContent').style.display = 'block';
          if (hash.toLowerCase() === 'toc.html') {
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
          }
          if (document.getElementById('spanColor')) {
            //Start the color change
            objColorId = document.getElementById('spanColor');
            objColorId.innerHTML = generateRainbowText("Hello, world!");
            setTimeout("changeColor()", 150);

          }
        }
        else {
          pageContent.innerHTML = "Content page not found.<br /><img src='img/derpshrug.png' style='width:400px' />";
          document.getElementById('pageContent').style.display = 'block';
        }
      }).catch((e) => {
        pageContent.innerHTML = "Content page not found.<br /><img src='img/derpshrug.png' style='width:400px' />";
        document.getElementById('pageContent').style.display = 'block';
      });
    }
  }).catch((e) => {
    pageContent.innerHTML = "Unable to load content json.<br />" + e.message + "<br /><img src='img/derpshrug.png' style='width:400px' />";
    document.getElementById('pageContent').style.display = 'block';
  });
  //freaking jQuery calls. 
  //$('.navbar-collapse').collapse('hide');
  $('#navbarColor01').collapse('hide');
  //$('.collapse').collapse('show');
}

const LoadNavJson = async () => {
  let response = await fetch('content/navigation.json');
  return await response.json();
}

const LoadContentPage = async (page) => {
  let response = await fetch(page);
  return await response.text();
}

function changeColor() {
  let text = "Jared Nelson";
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

const clickTheme = (oldTheme) => {
  if (oldTheme === "dark") {
    //console.log(`Current Theme: ${oldTheme}. Changing theme to: light`);
    animateLight();
    changeTheme("light");
  } else {
    //console.log(`Current Theme: ${oldTheme}. Changing theme to: dark`);
    animateDark();
    changeTheme("dark");
  }
}

const changeTheme = (theme) => {
  //Change theme
  document.getElementsByName('cssLink').forEach(linkTag => {
    //alert(`${linkTag.title}, ${theme}`);
    if (linkTag.title === theme) linkTag.disabled = false;
    else linkTag.disabled = true;
  })
  //update control
  themeControl = document.getElementById('ctlSwitchTheme');
  themeControl.title = theme;
  themeControl.innerHTML = `Theme: <img src=\"img/lightsw_${theme}.png\" style=\"height: 32px\";>`;
  $('#navbarColor01').collapse('hide');
}

const animateDark = () => {
  divOverlay = document.getElementById('divOverlay');
  divOverlay.style.opacity=1.0;
  divOverlay.style.boxShadow="0px 0px 0px 50000px #000";
  divOverlay.style.display = "block";
  //fadeDiv('divOverlay', 1.0);
}

const animateLight = () => {
  divOverlay = document.getElementById('divOverlay');
  divOverlay.style.boxShadow="0px 0px 0px 50000px #FFF";
  divOverlay.style.display = "block";
  fadeDiv('divOverlay', 1.0);
}

const fadeDiv = (divObjID, opacit) => {
  divObj=document.getElementById(divObjID);
  opacit=opacit-0.1;
  divObj.style.opacity = opacit;
  //console.log(opacit);
  if (opacit>0.1) {
    setTimeout(`fadeDiv('${divObjID}', ${opacit})`, 50);
  }
  else divObj.style.display="none";
}
/*$(document).ready(function () {

  $('.collapse').on('shown.bs.collapse', function () {
    $(this).parent().addClass('active');
  });

  $('.collapse').on('hidden.bs.collapse', function () {
    $(this).parent().removeClass('active');
  });

});*/