/**=========================================================
 * Module: masonry-deck.js
 * Demo for Angular Deck
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('MasonryDeckController', MasonryDeckController)
        .directive('imageloaded', imageloaded); // required by demo

    MasonryDeckController.$inject = ['RouteHelpers'];
    function MasonryDeckController(RouteHelpers) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.basepath = RouteHelpers.basepath;

          vm.photos = [
              {id: 'photo-1', name: 'Awesome photo', src: 'http://lorempixel.com/400/300/abstract'},
              {id: 'photo-2', name: 'Great photo', src: 'http://lorempixel.com/450/400/city'},
              {id: 'photo-3', name: 'Strange photo', src: 'http://lorempixel.com/400/300/people'},
              {id: 'photo-4', name: 'A photo?', src: 'http://lorempixel.com/400/300/transport'},
              {id: 'photo-5', name: 'What a photo', src: 'http://lorempixel.com/450/300/fashion'},
              {id: 'photo-6', name: 'Silly photo', src: 'http://lorempixel.com/400/300/technics'},
              {id: 'photo-7', name: 'Weird photo', src: 'http://lorempixel.com/410/350/sports'},
              {id: 'photo-8', name: 'Modern photo', src: 'http://lorempixel.com/400/300/nightlife'},
              {id: 'photo-9', name: 'Classical photo', src: 'http://lorempixel.com/400/300/nature'},
              {id: 'photo-10', name: 'Dynamic photo', src: 'http://lorempixel.com/420/300/abstract'},
              {id: 'photo-11', name: 'Neat photo', src: 'http://lorempixel.com/400/300/sports'},
              {id: 'photo-12', name: 'Bumpy photo', src: 'http://lorempixel.com/400/300/nightlife'},
              {id: 'photo-13', name: 'Brilliant photo', src: 'http://lorempixel.com/400/380/nature'},
              {id: 'photo-14', name: 'Excellent photo', src: 'http://lorempixel.com/480/300/technics'},
              {id: 'photo-15', name: 'Gorgeous photo', src: 'http://lorempixel.com/400/300/sports'},
              {id: 'photo-16', name: 'Lovely photo', src: 'http://lorempixel.com/400/300/nightlife'},
              {id: 'photo-17', name: 'A "wow" photo', src: 'http://lorempixel.com/400/300/nature'},
              {id: 'photo-18', name: 'Bodacious photo', src: 'http://lorempixel.com/400/300/abstract'}
          ];
        }
    }

    // Add class to img element when source is loaded
    function imageloaded () {
        // Copyright(c) 2013 Andr?? K??nig <akoenig@posteo.de>
        // MIT Licensed
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          var cssClass = attrs.loadedclass;

          element.bind('load', function () {
              angular.element(element).addClass(cssClass);
          });
        }
    }

})();


