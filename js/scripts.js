(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.polyfillFlexbox = {
    attach: function (context, settings) {
      $('body', context).once('polyfillFlexbox', function () {
        if (flexibility instanceof Object) {
          flexibility(document.body);
        }
      });
    }
  };

})(jQuery, Drupal);