# Bear Skin 8

Bear Skin is the default theme for the Bear starter profile, which is a profile to use as a starter kit when building a new site. Bear Skin does not rely on the profile, but can be used as a simple, clean base theme.

Getting started
---------------
To start building CSS, you have to install all the gulp dependencies first. After changing to the project directory in your terminal, just "npm install" (you need to make sure to have node.js installed). You might run into some errors depending on how your local setup.

if so:
make sure your local paths are right: npm config set prefix /usr/local
reinstall gulp: sudo npm install gulp -g

After the process finishes, you'll be able to run all the gulp tasks (see below).

Gulp tasks
----------

gulp watch - watches sass, images, js, and php files.
We are using browsersync which is going to proxy your local site. When using gulp watch, you should add a parameter to tell browsersync which site to proxy. ex: gulp watch --hostname=bearskin.vm

Make sure that you do not proxy through a .local address as this is a DNS that OSX uses for one of its app.

This will launch your site in the browser(s) defined on line 128 of gulpfile.js

gulp sass - compiles Sass into CSS. This is the theme's styles.
You shouldn't need to add vendor prefixes for CSS because Autoprefixer will do that for you.

gulp panels - compiles Sass in the panels-layouts directory.
This is CSS for the panel layouts only, but it does use the variables from the theme styles in order to keep paddings, margins, and breakpoints consistent with the theme.

gulp scripts - checks your JS for errors.
gulp images - optimizes images.
gulp build - combines tasks #2 - #5 into a single build process.


Additions
---------

We have included backstopJS to be able to run css regression test.

Configure your test w/ backstop.json (when in doubt, visit https://github.com/garris/BackstopJS for more config info.)

gulp create-reference - will create your reference pointer
after making your changes and compile css, run
gulp run-test
Note: you can also just run test between environments

#D7AX/#DAX - I pledge to make this theme as accessible as it can be. If you find any flaws, please submit an issue. Help me fix them if you can.
