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
      var $mainMenu = $('.menu--main');

      $('#mnav', context).on('click', function () {
        $(this).toggleClass('open');
        $mainMenu.toggleClass('open');
      });

      var $mainSearch = $('#msearch-content');

      $('#msearch', context).on('click', function () {
        $mainSearch.toggleClass('open');
      });

      $('#msearch-close', context).on('click', function () {
        $mainSearch.removeClass('open');
      });

    }
  };

})(jQuery, Drupal);
