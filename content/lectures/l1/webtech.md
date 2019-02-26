### Top
# **Lynda Week 2**
## Section 3
- [Server-side scripting](#server-side-scripting)
- [The importance of PHP (_or, probably the worst programming language ever used_)](#the-importance-of-php-or-probably-the-worst-programming-language-ever-used)
- [Other popular server languages](#other-popular-server-languages)
- [Dealing with data](#dealing-with-data)
- [Using SQL Databases](#using-sql-databases)
- [Content Management System](#content-management-system)
- [Content Delivery Network (_CDN_)](#content-delivery-network-cdn)
- [Cloud Services](#cloud-services)
- [What is GitHub](#what-is-github)

## Section 4
- [Javascript libraries](#javascript-libraries)
- [Frameworks and boilerplates](#frameworks-and-boilerplates)
- [CSS Preprocessors](#css-preprocessors)

# **Lynda Week 1**
## Section 1
- [How the web works](#how-the-web-works)
- [Working with clients and servers](#working-with-clients-and-servers)
- [The DNS and why it matters](#the-dns-and-why-it-matters)
- [Internet Protocols](#internet-protocols)
- [Exploring HTTP](#exploring-http)
- [Anatomy of a URL](#anatomy-of-a-url)
- [How Browsers Work](#how-browsers-work)
- [Web standards and the W3C](#web-standards-and-the-w3c)
- [Web Server Basics](#web-server-basics)

## Section 2
- [Front-end Design](#front-end-design)
- [HTML, the language of the web](#html-the-language-of-the-web)
- [Structuring HTML](#structuring-html)
- [Controlling presentation through CSS](#controlling-presentation-through-css)
- [Client-side scripting with JavaScript](#client-side-scripting-with-javascript)
- [Common image types](#common-image-types)
- [What is an API?](#what-is-an-api)
- [HTML5 APIs](#html5-apis)
- [Web Fonts](#web-fonts)

([Back to top](#top))
# Section 1 - _Introduction to the Web_</span>

## How the web works 
- The _internet_ and the _web_ are not the same thing
    - The _internet_ is a term that refers to a massive network of millions of computers all over the world.
    - The _web_ is a series of interactions between two types of systems: clients, and servers
        - _Clients_ request and render web content
        - _Servers_ are applications that deliver content or servers to clients.

([Back to top](#top))
## Working with clients and servers
- Browser make a request using a URL (_uniform resource locator_)
- Request passed on to DNS, translated URL domain to IP address.
- Browser uses IP address to locate server and request content
- Dynamic site pages must be processed by an application before data is returned

([Back to top](#top))
## The DNS and why it matters
- DNS one of the most important processes on the web
- Phone book of the internet.  Translates domain names to IP addresses
- DNS system is a huge database spread all over the world.
- If DNS is not assigned properly, no one will be able to find your site.

([Back to top](#top))
## Internet Protocols
_Protocols_ are simple languages that let one computer share data with another
- TCP/IP: **T**ransmission **C**ontrol **P**rotocol / **I**nternet **P**rotocol
- Internet uses multiple layers of protocols
    - Appliction Layer
        - HTTP
        - FTP
        - SMTP
        - DNS

Won't need to know specifics of most protocl.s

([Back to top](#top))
## Exploring HTTP
_HTTP_: **H**yper**t**ext **T**ransfer **P**rotocol
- Other common web protocols
    - FTP - **F**ile **T**ransfer **P**rotocl
    - SMTP - **S**imple **M**ail **T**ransfer **P**rotocol
    - RTP - **R**eal-Time **T**ransfer **P**rotocol

HTTP is a stateless protocol   
- Nothing about a request is remembered.
- Persistent data has to be handled through other means
    - Usually handled through cookies, JavaScript, variables

([Back to top](#top))
## Anatomy of a URL
_URL_: **U**inform **R**esource **L**ocator

<span style="background-color:#A299A7; color:black;">http</span>://<span style="background-color:#440044; color:white;">www.lynda.com</span>   
<span style="background-color:#A299A7; color:black;">protocol</span>://<span style="background-color:#440044; color:white;">resource</span>

Resource: <span style="background-color:#84BDC0; color:black;">www</span>.<span style="background-color:#BC7375; color:black;">lynda</span>.<span style="background-color:#ECDC9F; color:black;">com</span>   
<span style="background-color:#84BDC0; color:black;">www</span>=Subdomain   
<span style="background-color:#BC7375; color:black;">lynda</span>=Domain   
<span style="background-color:#ECDC9F; color:black;">com</span>=Top-level Domain

_Subdomains_ allow servers to identify unique content   

([Back to top](#top))
## How Browsers Work
- Browsers use HTTP to send a request to the server
- Server sends requested data back to browser
- Browser uses internal rendering engine and displays content

### Broswer components
- Browser UI
- Internal Engine
- Rendering Engine
- Networking
- Data Storage
- JavaScript Interpreter

([Back to top](#top))
## Web standards and the W3C
1998: Web Standards Project
- Group of web professionals and companies that actively support W3C and adoption of web standards.
- W3C started in 1994, and issued recommendations for web tech
- Encouraged use of standards compliant browsers

The importance of standards
- Writing standards ensures consistency across supporting browsers.
- See the [W3C](www.w3.org) website for info.

([Back to top](#top))
## Web Server Basics
Sites are stored on webservers as a series of files and folders.  Dynamic sites have to process data.
- _Web Stacks_ are groups of software that wirk in conjunction with each other to build and process web sites
- Web Stacks consist of:
    - Operating System
    - Web Server
    - Database Server
    - Programming Language

([Back to top](#top))
# Section 2 - _Front End Design_

## Front-end Design
Many web designers refer to themselves as _front end designers_.
- Front End Design:
    - Visual Layer of Websites and Applications
    - Typically the UI, Layout, typography, images, and other visual elements and their styling
    - Can refer to usability and UX design as well
- Most common languages for _front end_ content
    - HTML
    - CSS
    - JavaScript
- Roles of _front end_ designer
    - Page Layout
    - Form Design
    - Interactivity and animation
    - Site imagery

([Back to top](#top))
## HTML, the language of the web
HTML: **H**yper**t**ext **M**arkup **L**anguage

([Back to top](#top))
## Structuring HTML
HTML is a markup language that uses tags to structure documents and give elements meaning.

HTML Structure:
- Doctype
    - HTML
        - HEAD
            - Title
        - /HEAD
        - BODY
           - Content
        - /BODY
    - /HTML

Visual elements go in _body_ tag.

([Back to top](#top))
## Controlling presentation through CSS
CSS: **C**ascading **S**tyle **S**heets

CSS is a collection of formatting rules.

Benefits of CSS
- Allows for modular site design
- Faster development
- Creates portable styles that can be re-used

([Back to top](#top))
## Client-side scripting with JavaScript
Modern web design depends on client scripting

JavaScript: Scripting language developed in 1995 by Netscape to increase the functionality of its browser.  Has evolved into the scripting language of the web.

JavaScript functionality:
- Allows designers to create interactive elements
- Can open new windows or give feedback
- Can update, sort, and present data directly in the browser
- No server interaction required

([Back to top](#top))
## Common image types
Four most common formats:

- JPG: (JPEG) **J**oint **P**hotographic **E**xperts **G**roup
    - Uses Lossy compression
- GIF: **G**raphics **I**nterchange **F**ormat
    - Introduced in 1987 by CompuServe
    - Limited to max of 256 colors
- SVG: **S**calable **V**ector **G**raphics
    - Written in SVG markup
    - Vector graphics format
- PNG: **P**ortable **N**etwork **G**raphics
    - Developed in 1995
    - Support transparancy, lossless compression
    - Typically larger than JPGs and GIFs

([Back to top](#top))
## What is an API?
API: **A**pplication **P**rogramming **I**nterface

- A set of instructions and standards for accessing services

Open APIs:  APIs exposed for others to use

API Considerations:
- Most APIs limit amount of data or types of services availalbe
- APIs evolve and change.
- Sites might shut down

([Back to top](#top))
## HTML5 APIs
- Media API
    - control loading and playback of media
- Drag and Drop API
    - Enable drag and drop functionality on page elements
- App cache API
    - Allows storing data offline
    - Data can be synced later
- Geolocation API
    - Get user location
- Canvas API
    - Allow drawing directly in browser

([Back to top](#top))
## Web Fonts
_Web Fonts_: Automatic downloading and temporary installation of a font on a client

Font formats designed for Web Usage:
- EOT
- WOFF

Use _TypeKit_ hosting service for fonts.

([Back to top](#top))
# Section 3 - _Back-End Technology_

## Server-side scripting
Any scripting or programming that runs on a server is referred to as _server side scripting_

Early days of the web used _CGI_ scripts.  Now there are many more tools available.

The server processes the script before sending the page to the browser.

The scripts themselves are hidden from the end users.

Server-Side processing concerns:
- Processing is done on the server, which for high traffic sites increases server load.
- Processing data usually requires a page refresh on the browser
- AJAX and other client-side bridges help enhance the usability of server-side scripting

([Back to top](#top))
## The importance of PHP (_or, probably the worst programming language ever used_)

PHP 3.0 was released in 1997.

Paired with Apache servers and other open source tools.

Using PHP
- You can find PHP on almost all hosting plans
- Large pool of existing developers to work with
- PHP is relatively easy to learn, with a lot of available resources.

_Note:  I disagree with the lecture here.  From my experience PHP is a terrible language to use and using it extensively **will** make you a bad programmer.  See a great summary of what makes PHP so terrible here: [PHP: a fractal of bad design](https://eev.ee/blog/2012/04/09/php-a-fractal-of-bad-design/)_

([Back to top](#top))
## Other popular server languages

_JSP_: Java Server Pages
- Part of larger Java Framework
- Scripts are combinations of XML and Java scriplets which can be difficult for beginners.
- JSP is widely used in enterprise-level sites, but can be used for any sized site.
- It's easy to find hosting, but be sure you're choosing the proper Java platform.

_.NET_: Several languages in the .NET framework.
- ~~VB .NET is often referred to as .NET~~ C# and ASP .NET are much more widely used today.
- Often used for large-scale, enterprise sized sites or applications, _and is being used more and more for small hobbyist sites and back end app services_
- ~~Can only be hosted on Windows Servers~~. Microsoft has open-sourced .NET core and it is available on Windows, Linux and Mac platforms.

_ColdFusion_ 
- Uses a markup language much like HTML
- Centeral administrator makes many tasks simple
- ColdFusion sites and applications often require less code than other languages (_Note: I have not found this to be true_)
- ColdFustion hosts can be harder to find and more expensive than other choices.

_Python_
- Powerful development language
- Has a variety of web-related libraries that make it easier to build sites and web-based applications.
- Typically used to create larger sites or applications.

_Ruby_
- General-purpos development language
- Its popularity online is due largely to the Ruby-on-rails web framework.
- Simple syntax and powerful features make it a popular choice for creating dynamic sites.

_Choosing a Server-side language_
- Choose a platform based on cost, developer network, and ease of use.
-  Find a developer that can assist you in finding the right plaftorm
- Find out about platforms and make an informed decision.

([Back to top](#top))
## Dealing with data
Online data can be handled in an umber of different ways
- Can be stored on a client
- Stored in structured text files
- Stored within a database

Before HTML5 clients were limited to storing cookies.  HTML5 introduced client web storage API.  Allows sites to store key value pairs in the browser.

the most efficient way to store complex data or large datasets is a _database_.

_Relational Databases_
- Store data in tables that relate to each other based on item key values
- This allows for complex sorting and filtering of data

_Non-Relational Databases (NoSQL)_
- Alnative to relational databases that are growing in popularity.
NoSQL databases store individual flat, object driven datasets.
- These are often faster to index, and scale easier than relational databases.

([Back to top](#top))
## Using SQL Databases
_SQL_: Structured Query Language

Most common form of data stored by web applications

_SQL Syntax_
- SQL Syntax is simple and logical, the basics are easy to learn
- select, insert, update, delete, and other simple statements are used to retrieve and manipulate data.

_Learning SQL_
- There are multiple versions of SQL, each with its own extensions
- Dedicated applications can help you create and manage databases.
- Although web designers don't need to become fluent in SQL, understanding the basics is important.

([Back to top](#top))
## Content Management System
_CMS_: an application designed to control the creation, management, publishing, and archiving of a site's content.

_CMS Benefits_
- Updating content can be done through a WYSIWYG editor.
- Most CMS allow you to create user groups with verious permission levels.
- Allows users to create content without involving a designer.
- Most CMS have extensions that add features to sites.

([Back to top](#top))
## Content Delivery Network (_CDN_)
A system for delivering content over a distributed network of servers.

_CDNs_ and largely used to serve static resources such as JavaScript libraries or video.

_Types of CDNs_
- Some CDNs host a single type of resource
- CDNs like _YouTube_ serve as a content aggregators as well.
- You can choose between numerous free or commercial CDNs for dedicated service.

_CDN issues_
- A CDN adds an additional layer of complexity to your site.
- For dedicated resources, you don't have the ability to create custom downloads.
- Certain security requirements might prevent the use of an external CDN.

([Back to top](#top))
## Cloud Services
_Cloud Computing_
- A distributed network of computers that can perform tasks by taking advantage of the scale and power of the network.
- Usually refers to distributed processes over the internet.

([Back to top](#top))
## What is GitHub
An online distribution service that allows users to store repositories online that ce be version controlled and shared by other users.

_GITHUB_
- Built around _GIT_, an open source version control system.
- Allows you to manage projects, publish files, and store revisions.
- Offers both free and commercial plans.
- Features an easy to use web interface

([Back to top](#top))
# Section 4 - _Assembly Technologies_

## Javascript libraries
_Javascript Library_
- A collection of JavaScript methods and functions that make it easier to perform targeted tasks.
- Extend the functionality of native JavaScript.  They range from the extremely focused sets like Date.js to the broader task oriented libraries like jQuery.

_Pros of using libraries_
- Using libraries make the process of writing JavaScript more efficient.
- You can often extend your own coding capabilities through libraries (_or provides a crutch that prevents you from developing those abilities_)
- The code is generally widely used and tested.

_Cons of using libraries_
- Libraries increase the size of your code, and often add additional server requests.
- you can become tied to specific library syntax.
- Without knowing native Javascript you're not always making an informed choice about the library.

([Back to top](#top))
## Frameworks and boilerplates
Collection of prebuilt CSS, HTML, and JavaScript files designed to speed development of sites.

_Boilerplate_
- A set of templates built around a specific starting point or goal.
- Meant to provide a starting point for building sites or apps.

_Frameworks_
- A collection of assets designed to help build sites or applications
- This could include CSS grids, JavaScript libraries, and HTML templates.

_Complex UI Frameworks_
- Frameworks like _Bootstrap_ are built around developing the front end of sites or applications.
- these UI Frameworks function more like development tools.
- While they add the most overhead, they also give developers the widest set of tools to work with.

_Minimal Frameworks_
- Minimal frameworks typically have a single goal or focus
- Designed to have a small footprint and help out in specific areas.

_Prototyping_
- Frameworks are often used to build HTML prototypes
- Can dramatically speed up prototype development and iteration
- Framework code is generally _not_ used for final production.

([Back to top](#top))
## CSS Preprocessors
Scripting languagte that extends the functionality of CSS and must be complied into native CSS code before publishing.

_Preprocessor Benefits_
- Add additional functionality that CSS lacks.
- Their syntax makes writing CSS more efficient.
- Many browser inconsistencies are dealt with automatically when CSS is processed.

_Preprocessor Cons_
- In team environments, or if production code is shared, everyone will need to know the preprocessor syntax.
- Processed CSS can be bloated and inneficient.
- Additional layer of complexity to workflows.

([Back to top](#top))
# Section 5 - _Next Steps_

_Resources_
- Lynda
- [W3C](www.w3.org)
- [How Browsers Work](talligarsiel.com/projects/howbrowserswork1.htm)
- [20 things](www.20thingsilearned.com)

