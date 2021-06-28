/**=========================================================
   * Module: modals.js Product Color controller
   * Provides a simple way to implement bootstrap modals from templates
   =========================================================*/
(function () {
  'use strict';

  angular
    .module('app.bootstrapui')
    .controller('ProductColorController', ProductColorController);

  ProductColorController.$inject = ['$scope', '$rootScope', '$uibModal', 'ProductColorService', '$stateParams', '$state', '$localStorage', 'SweetAlert'];

  function ProductColorController($scope, $rootScope, $uibModal, ProductColorService, $stateParams, $state, $localStorage, SweetAlert) {
    var vm = this;

    activate();

    ////////////////

    function activate() {

      var SuccessMsg;
      var errorMsg;

      $scope.prodcolors = ProductColorService.query({
      });


      console.log($scope.prodcolors);
      $scope.loadProductColors= function () {
        $scope.prodcolors = ProductColorService.query({
        });

      }

      $rootScope.$on("CallLoadProductColors", function () {
        $scope.loadProductColors();
      });

      $scope.delete = function (prodcolor) {
        SweetAlert.swal({
          title: 'Are you sure?',
          text: 'You are about to delete Product Color!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, delete it!',
          closeOnConfirm: false
        }, function (data) {
          if (data) {
            prodcolor.$remove({
            }).then(function () {
              $scope.loadProductColors();
              SweetAlert.swal('Deleted!');
            }, function () {
              SweetAlert.swal('Something Went Wrong!');
            });


          }

        });


      }

      $scope.home = function(){
        $state.go("page.management-menu");
      } 


      $scope.open = function (size) {

        var modalInstance = $uibModal.open({
          templateUrl: 'addProductColor.html',
          controller: ModalOpenInstanceCtrl,
          size: size
        });


        var state = $('#modal-state');
        modalInstance.result.then(function () {
          state.text('Modal dismissed with OK status');
        }, function () {
          state.text('Modal dismissed with Cancel status');
        });
      };


      $scope.show = function (_prodcolor) {
        // $scope.x = x;
        var prodcolor = _prodcolor;

        var modalInstance = $uibModal.open({
          templateUrl: 'editProductColor.html',
          controller: ModalInstanceCtrl,
          resolve: {
            prodcolor: function () {
              return prodcolor;
            }
          }
          // scope : $scope
        });
      };


      // Please note that $uibModalInstance represents a modal window (instance) dependency.
      // It is not the same as the $uibModal service used above.

      ModalOpenInstanceCtrl.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'ProductColorService'];

      function ModalOpenInstanceCtrl($scope, $rootScope, $uibModalInstance, ProductColorService) {


        $scope.ok = function () {
          $uibModalInstance.close('closed');

        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
        $scope.prodcolor = new ProductColorService();

        $scope.submitProdCol = function (prodcolorform) {
          $scope.prodcolor.$save({
          }).then(function (data) {
              var response = angular.fromJson(data);

              if (response.Status == "1") {
                $scope.errorMsg = false;
                $scope.SuccessMsg = response.Message;
              } else {

                $scope.SuccessMsg = false;
                $scope.errorMsg = response.Message;
                // vm.auth=true;
              }
              $rootScope.$emit("CallLoadProductColors", {});
              $scope.prodReset(prodcolorform);
            },
            function () {
              $scope.SuccessMsg = false;
              $scope.errorMsg = 'Server Request Error';
            });

        };


        $scope.colReset = function (prodcolorform) {

          $scope.prodcolorform = {};
          $scope.prodcolor = "";
          prodcolorform.$setPristine();
        };

        $scope.CloseProdCol = function (prodcolor) {
          var saveprodcolor = new ProductColorService(prodcolor);
          saveprodcolor.$save({
          }).then(function (data) {

              $rootScope.$emit("CallLoadProductColors", {});
              $scope.ok();
            },
            function () {
              $scope.SuccessMsg = false;
              $scope.errorMsg = 'Server Request Error';
            });

        };

      }

      ModalInstanceCtrl.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'ProductColorService', 'prodcolor'];

      function ModalInstanceCtrl($scope, $rootScope, $uibModalInstance, ProductColorService, prodcolor) {
        var id = prodcolor.id;
        console.log(id);

        $scope.prodcolor = prodcolor;
        console.log(prodcolor);
        $scope.ok = function () {
          $uibModalInstance.close('closed');

        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

     $scope.updateProdCol= function (prodcolor) {


          prodcolor.$update({
          }).then(function (data) {
            var response = angular.fromJson(data);
            console.log($scope.prodcolor);
            // $scope.authMsg=response.Message;
            if (response.Status == "1") {
              $scope.errorMsg = false;
              $scope.SuccessMsg = response.Message;
              $scope.prodcolor = ProductColorService.get({
                id: id,
              });
            } else {

              $scope.SuccessMsg = false;
              $scope.errorMsg = response.Message;

            }
            $rootScope.$emit("CallLoadProductColors", {});
          }, function () {
            $scope.SuccessMsg = false;
            $scope.errorMsg = 'Server Request Error';
          });

        };

      }
    }
  }

})();