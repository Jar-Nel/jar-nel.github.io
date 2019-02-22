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

$(document).ready(function () {

  $('.collapse').on('shown.bs.collapse', function () {
    $(this).parent().addClass('active');
  });

  $('.collapse').on('hidden.bs.collapse', function () {
    $(this).parent().removeClass('active');
  });

});