(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$scope','$window'];
    function UserBlockController($scope,$window) {

        activate();

        ////////////////

        function activate() {

          $scope.userBlockVisible = true;
          $scope.userName=$window.localStorage.userName;
          $scope.position=$window.localStorage.position;

          var detach = $scope.$on('toggleUserBlock', function(/*event, args*/) {

            $scope.userBlockVisible = ! $scope.userBlockVisible;

          });

          $scope.$on('$destroy', detach);
        }
    }
})();
