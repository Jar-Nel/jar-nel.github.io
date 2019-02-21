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

const LoadContent = (hash) => {
  if (!hash) hash = window.location.hash;
  if (hash.length<1) hash='home.html';
  hash = hash.replace('#', '');
  window.location.hash=`#${hash}`;
  let pageContent = document.getElementById('pageContent');
  let breadCrumb = document.getElementById('breadcrumb');
  let navbarItems = document.getElementById('navbarItems');
  let navObj = undefined;
  LoadNavJson().then((response) => {
    navObj = response.find((element) => { return element.hash === hash });
    if (!navObj) pageContent.innerHTML = "Unable to load content.  Unknown hash";
    else {
      //Title
      document.title=`JPD:${navObj.title}`;
      //Breadcrumb
      breadCrumb.innerHTML = '';
      navObj.breadcrumb.forEach(element => {
        breadCrumb.innerHTML+=element;
      });
      //NavBar
      navbarItems.innerHTML='';
      navObj.navbaritems.forEach(element => {
        navbarItems.innerHTML+=element;
      });
      //Content
      LoadContentPage(navObj.page).then((response) => {
        if (response)
          pageContent.innerHTML = response;
        else pageContent.innerHTML = "Content page not found";
      }).catch((e) => {
        pageContent.innerHTML = "Content page not found";
      });
    }
  }).catch((e) => {
    pageContent.innerHTML = "Unable to load content json " +  e.message;
  });
  //freaking jQuery calls. 
  $('.navbar-collapse').collapse('hide');
}

const LoadNavJson = async () => {
  let response = await fetch('content/navigation.json');
  return await response.json();
}

const LoadContentPage = async (page) => {
  let response = await fetch(page);
  return await response.text();
}