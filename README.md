# Bear Skin 8

Bear Skin is the default theme for the [Bear](https://github.com/zivtech/bear), which is a Drupal starter kit installation profile that can be used for building a new Drupal site. Bear Skin does not rely on the profile. Therefore, it **can be used as a standalone [starter theme](https://www.drupal.org/node/323993)**.

## Getting started
Before getting started, make sure that you have the latest version of [node.js](https://nodejs.org/en/) and [yeoman](http://yeoman.io/) installed. To start building CSS, you have to first install all of the gulp dependencies. `cd` to the project directory in your terminal and run:
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

### Pattern Lab
in a separate terminal window on your local machine, run:
```sh
$ gulp pl:watch
```

### Generate a pattern
We have a builder in the theme to generate patterns.
```sh
$ npm run new
```
Follow the prompt to create the pattern of your choice. The naming convention basically needs to follow the template suggestion (see the [Turn on dev mode](#turn-on-dev-mode) of this doc for more info.

### Gulp tasks
The default settings used for Gulp are located in `default.gulpfile.yml`. These settings include things like paths, settings, etc.

You can override any of the settings by duplicating the default file and renaming it to `gulpfile.yml`. Then, change any settings you want. This file is ignored in Git.


### Additions
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
Note: you can also just run test between environments


## Turn on dev mode <a id="turn-on-dev-mode"></a>

Copy and rename the `sites/example.settings.local.php` to be `sites/default/settings.local.php`
```sh
$ cp sites/example.settings.local.php sites/default/settings.local.php
```
Open `settings.php` file in `sites/default` and uncomment these lines:

```php
if (file_exists(__DIR__ . '/settings.local.php')) {
  include __DIR__ . '/settings.local.php';
}
```

This will include the local settings file as part of Drupal's settings file.

Open `settings.local.php` and uncomment this line to enable the null cache service:

```php
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';
```

In `settings.local.php` change the following to be `TRUE` if you want to work with enabled css- and js-aggregation:

```php
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;
```

Uncomment these lines in `settings.local.php` to Disable the render cache and Disable Dynamic Page Cache

```php
$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
```

If you do not want to install test modules and themes, set following to `FALSE`

```php
$settings['extension_discovery_scan_tests'] = TRUE;
```

Open `development.services.yml` in the sites folder and add the following block (to disable twig cache)

```yaml
parameters:
  twig.config:
    debug: true
    auto_reload: true
    cache: false
```
Afterwards you have to rebuild the Drupal cache. Otherwise your website may encounter an unexpected error on page reload. This can be done with `drush cr` or by going to `/core/rebuild.php` from your Drupal 8 website.

**Finished!** Now you're able to develop in Drupal 8 without manual cache rebuilds on a regular basis.

#### D8AX/#DAX - I pledge to make this theme as accessible as it can be. If you find any flaws, please submit an issue. Help me fix them if you can.

## A word on twig template inheritance

- `include`: Dump the contents of that template into this one.
- `extends`: Take the old template and allow me to override blocks defined in the other template - I don't get to redefine everything and I don't get to define new blocks - I just get to suppress the old block definition and redefine it (and then I can dump the parent template's block definition into my definition if I use` {{ parent() }}` – kinda like doing an include just of that one block from the parent template's definition into your child template definition
- `embed`: Include but then override blocks from that include (super useful for layouts).

Here is a set of examples that illustrate the point:

### foo.html

```twig
{% block header %}
  <h1>This is the Title of Foo</h1>
{% endblock %}
{% block section }
  <section>
    Here is some stuff from Foo.
    ...
  </section>
{% endblock %}
```

Produces:
```html
<h1>This is the Title of Foo</h1>
<section>
  Here is some stuff from Foo.
  ...
</section>
```

### bar.html

```twig
{% extends "foo.html" %}

{% block header %}
  <h2>This is Bar's Title</h2>
{% endblock %}
```

Produces:
```html
<h2>This is Bar's Title</h2>
<section>
  Here is some stuff from Foo.
  ...
</section>
```

### baz.html

```twig
<h1>This is the title from Baz</h1>
<h2>We're adding lots of stuff</h2>
{% embed "bar.html" %}
  {% block header %}
    <h3>This is overriding the h2 from Bar and redefining it here in Baz!</h3>
  {% endblock %}
{% endembed %}
<p>And let's just tack on some stuff at the bottom. Just for fun!</p>
```

Produces:
```html
<h1>This is the title from Baz</h1>
<h2>We're adding lots of stuff</h2>
<h3>This is overriding the h2 from Bar and redefining it here in Baz!</h3>
<section>
  Here is some stuff from Foo.
  ...
</section>
<p>And let's just tack on some stuff at the bottom. Just for fun!</p>
```
