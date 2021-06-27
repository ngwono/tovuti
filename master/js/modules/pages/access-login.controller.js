/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.pages')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['$http', '$state','$window','baseURL'];
    function LoginFormController($http, $state,$window,baseURL) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          // bind here all data from the form
          vm.account = {};
          // place the message if something goes wrong
          vm.authMsg = '';

          vm.login = function() {
            vm.authMsg = '';

            if(vm.loginForm.$valid) {

              $http
                .post(baseURL+'api/employee-login/', {userName: vm.account.email, password: vm.account.password})
                .then(function(data) {
                  var response=angular.fromJson(data.data);
                  console.log(response);
                  
                  // assumes if ok, response is an object with some data, if not, a string with error
                  // customize according to your api
                  if ( response.id==null || response==null || response.id=="" ) {
                    vm.authMsg = 'Incorrect credentials.';
                  }else{

                    $window.localStorage.userId=response.id;
                    console.log($window.localStorage.userId);
                    $window.localStorage.userName=response.firstName+" "+response.middleName+" "+response.lastName;
                    $window.localStorage.position=response.position;
                    $state.go('app.dashboard');
                  }
                }, function() {
                  vm.authMsg = 'Server Request Error';
                });
            }
            else {
              // set as dirty if the user click directly to login so we show the validation messages
              /*jshint -W106*/
              vm.loginForm.account_email.$dirty = true;
              vm.loginForm.account_password.$dirty = true;
            }
          };
        }
    }
})();
