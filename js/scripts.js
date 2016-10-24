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

  Drupal.behaviors.mobileNavigation = {
    attach: function (context, settings) {

      // define the navigation to be turned into a mobile one
      var $mainMenu = $('.menu--main', context);

      if ($mainMenu.length) {
        $mainMenu.once('mobileNavigation', function () {

          // elements that toggle mobile menu
          var $nav = $('#mnav', context);
          var $search = $('#msearch', context);
          var $closer = $('#msearch-close', context);

          // search content
          var $mainSearch = $('#msearch-content');

          $nav.on('click', function () {
            $(this).toggleClass('open');
            $mainMenu.toggleClass('open');
          });

          $search.on('click', function () {
            $mainSearch.toggleClass('open');
          });

          $closer.on('click', function () {
            $mainSearch.removeClass('open');
          });
        });
      }
    }
  };

})(jQuery, Drupal);
