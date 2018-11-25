# OMBRE WEBSITE (Beta)

Welcome to Ombre!

This is the repository corresponding to Ombre's website.

Please feel free to contribute and improve this website as you see fit!

Also, if you've experienced any bugs while using this site, please report an issue!

## Building This Site
For the sake of development, it is sufficient to simply clone this project and run it normally (ie by opening index.html in a browser of your choice). However, before serving live, build this website using the provided build utility.

To build this site, ensure you have Node.js (version >= 8.0.0) installed, and then run the command: `node build.js`. A new file called index.html will be generated inside the directory `/optimized`. This file can be further optimized by running it through a minification script that will be included at a later time.

The server root should be set to the directory optimized, and the contents of `/assets` should be copied there.

*NOTE*: The build script has some directive it can be told.
* If you wish for a comment NOT to be removed, include @KEEP or @keep anywhere inside that comment.

Dependancies for building script:
* Node.js version >= 8.0.0
* rimraf https://www.npmjs.com/package/rimraf
* ncp https://www.npmjs.com/package/ncp
* html-minifier https://www.npmjs.com/package/html-minifier

@TODO Propper minification support for JS and JQuery will be added soon.

A script to check your dependencies and install the required tools automatically will be added soon.
