/**=========================================================
   * Module: modals.js Product Type controller
   * Provides a simple way to implement bootstrap modals from templates
   =========================================================*/
(function () {
  'use strict';

  angular
    .module('app.bootstrapui')
    .controller('ProductTypeController', ProductTypeController);

  ProductTypeController.$inject = ['$scope', '$rootScope', '$uibModal', 'ProductTypeService', '$stateParams', '$state', '$localStorage', 'SweetAlert'];

  function ProductTypeController($scope, $rootScope, $uibModal, ProductTypeService, $stateParams, $state, $localStorage, SweetAlert) {
    var vm = this;

    activate();

    ////////////////

    function activate() {

      var SuccessMsg;
      var errorMsg;

      $scope.prodtypes = ProductTypeService.query({
      });


      console.log($scope.prodtypes);
      $scope.loadProductTypes = function () {
        $scope.prodtypes = ProductTypeService.query({
        });

      }

      $rootScope.$on("CallLoadProductTypes", function () {
        $scope.loadProductTypes();
      });

      $scope.delete = function (prodtype) {
        SweetAlert.swal({
          title: 'Are you sure?',
          text: 'You are about to delete Product Type!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, delete it!',
          closeOnConfirm: false
        }, function (data) {
          if (data) {
            prodtype.$remove({
            }).then(function () {
              $scope.loadProductTypes();
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
          templateUrl: 'addProductType.html',
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


      $scope.show = function (_prodtype) {
        // $scope.x = x;
        var prodtype = _prodtype;

        var modalInstance = $uibModal.open({
          templateUrl: 'editProductType.html',
          controller: ModalInstanceCtrl,
          resolve: {
            prodtype: function () {
              return prodtype;
            }
          }
          // scope : $scope
        });
      };


      // Please note that $uibModalInstance represents a modal window (instance) dependency.
      // It is not the same as the $uibModal service used above.

      ModalOpenInstanceCtrl.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'ProductTypeService'];

      function ModalOpenInstanceCtrl($scope, $rootScope, $uibModalInstance, ProductTypeService) {


        $scope.ok = function () {
          $uibModalInstance.close('closed');

        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
        $scope.prodtype = new ProductTypeService();

        $scope.submitProdType = function (prodtypeform) {
          $scope.prodtype.$save({
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
              $rootScope.$emit("CallLoadProductTypes", {});
              $scope.prodReset(prodtypeform);
            },
            function () {
              $scope.SuccessMsg = false;
              $scope.errorMsg = 'Server Request Error';
            });

        };


        $scope.productReset = function (prodtypeform) {

          $scope.prodtypeform = {};
          $scope.prodtype = "";
          prodtypeform.$setPristine();
        };

        $scope.CloseProdType = function (prodtype) {
          var saveprodtype = new ProductTypeService(prodtype);
          saveprodtype.$save({
          }).then(function (data) {

              $rootScope.$emit("CallLoadProductTypes", {});
              $scope.ok();
            },
            function () {
              $scope.SuccessMsg = false;
              $scope.errorMsg = 'Server Request Error';
            });

        };

      }

      ModalInstanceCtrl.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'ProductTypeService', 'prodtype'];

      function ModalInstanceCtrl($scope, $rootScope, $uibModalInstance, ProductTypeService, prodtype) {
        var id = prodtype.id;
        console.log(id);

        $scope.prodtype = prodtype;
        console.log(prodtype);
        $scope.ok = function () {
          $uibModalInstance.close('closed');

        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

     $scope.updateProdType = function (prodtype) {


          prodtype.$update({
          }).then(function (data) {
            var response = angular.fromJson(data);
            console.log($scope.prodtype);
            // $scope.authMsg=response.Message;
            if (response.Status == "1") {
              $scope.errorMsg = false;
              $scope.SuccessMsg = response.Message;
              $scope.prodtype = ProductTypeService.get({
                id: id,
              });
            } else {

              $scope.SuccessMsg = false;
              $scope.errorMsg = response.Message;

            }
            $rootScope.$emit("CallLoadProductTypes", {});
          }, function () {
            $scope.SuccessMsg = false;
            $scope.errorMsg = 'Server Request Error';
          });

        };

      }
    }
  }

})();