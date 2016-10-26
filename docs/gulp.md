# Gulp config 

The default settings used for Gulp are located in `default.gulpfile.yml`. These settings include things like paths, settings, etc.

You can override any of the settings by duplicating the default file and renaming it to `gulpfile.yml`. Then, change any settings you want. This file is ignored in Git.

Also, individual gulp tasks live in the `gulp-tasks` directory. 

## Building CSS

To start building CSS, you have to first install all of the gulp dependencies. `cd` to the project directory in your terminal and run:
```sh
$ npm install
```

You might run into some errors initially, depending on your local setup. if so, make sure that your local paths are correct:
```sh
$ npm config set prefix /usr/local
```

Then reinstall gulp:
```sh
$ sudo npm install gulp -g
```

## Visual regression testing

We have included backstopJS to be able to run css regression test.

Configure your test with `backstop.json`. **When in doubt, visit [BackstopJS](https://github.com/garris/BackstopJS) for more config info**.
Create your reference pointer after making your changes and compile css:
```sh
$ gulp create-reference
```
To test that, run:
```sh
$ gulp run-test
```
Note: you can also just run test between environments.