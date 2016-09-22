# Bear Skin 8

Bear Skin is the default theme for the Bear starter profile, which is a profile to use as a starter kit when building a new site. Bear Skin does not rely on the profile, but can be used as a simple, clean base theme.

## Getting started
To start building CSS, you have to install all the gulp dependencies first. After changing to the project directory in your terminal, run:
```sh
npm install
```
(you need to make sure to have node.js installed). You might run into some errors depending on how your local setup.

if so:
make sure your local paths are right:
```sh
npm config set prefix /usr/local
```
reinstall gulp:
```sh
sudo npm install gulp -g
```

### Pattern Lab

To get started you'll first need to generate the style guide:
```sh
gulp pl:generate
```
Then start the server to access it:
```sh
gulp pl:server
```
While the server is running, for auto reload on file change, in a separate terminal window (local), run:
```sh
gulp pl:watch
```

### Generate a pattern
We have a builder in the theme to generate patterns.
```sh
npm run new
```
Follow the prompt to create the pattern of your choice. The naming convention basically needs to follow the template suggestion (see the "Turn on dev mode") of this doc for more info.

### Gulp tasks
The default settings used for Gulp are located in `default.gulpfile.yml`. These settings include things like paths, settings, etc.

You can override any of the settings by duplicating the default file and renaming it to `gulpfile.yml`. Then, change any settings you want. This file is ignored in Git.


### Additions
We have included backstopJS to be able to run css regression test.

Configure your test w/ backstop.json (when in doubt, visit https://github.com/garris/BackstopJS for more config info.)

gulp create-reference - will create your reference pointer
after making your changes and compile css, run
gulp run-test
Note: you can also just run test between environments


### Turn on dev mode

Copy and rename the sites/example.settings.local.php to be sites/default/settings.local.php

$ cp sites/example.settings.local.php sites/default/settings.local.php

Open settings.php file in sites/default and uncomment these lines:

```php
<?php
if (file_exists(__DIR__ . '/settings.local.php')) {
 include __DIR__ . '/settings.local.php';
}
```

This will include the local settings file as part of Drupal's settings file.

Open settings.local.php and uncomment this line to enable the null cache service:

```php
<?php
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';
```

In settings.local.php change the following to be TRUE if you want to work with enabled css- and js-aggregation:

```php
<?php
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;
```

Uncomment these lines in settings.local.php to Disable the render cache and Disable Dynamic Page Cache

```php
<?php
$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
```

If you do not want to install test modules and themes, set following to FALSE

```php
<?php
$settings['extension_discovery_scan_tests'] = TRUE;
```

Open development.services.yml in the sites folder and add the following block (to disable twig cache)

```yaml
parameters:
  twig.config:
    debug: true
    auto_reload: true
    cache: false
```

Afterwards you have to rebuild the Drupal cache. Otherwise your website may encounter an unexpected error on page reload. This can be done by with drush:

drush cr or by visiting the following URL from your Drupal 8 website:
http://yoursite/core/rebuild.php

Finished! Now you're able to develop in Drupal 8 without manual cache rebuilds on a regular basis.

#### D8AX/#DAX - I pledge to make this theme as accessible as it can be. If you find any flaws, please submit an issue. Help me fix them if you can.
