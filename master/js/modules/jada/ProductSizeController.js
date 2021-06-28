/**=========================================================
   * Module: modals.js Product Size controller
   * Provides a simple way to implement bootstrap modals from templates
   =========================================================*/
(function () {
  'use strict';

  angular
    .module('app.bootstrapui')
    .controller('ProductSizeController', ProductSizeController);

  ProductSizeController.$inject = ['$scope', '$rootScope', '$uibModal', 'ProductSizeService', '$stateParams', '$state', '$localStorage', 'SweetAlert'];

  function ProductSizeController($scope, $rootScope, $uibModal, ProductSizeService, $stateParams, $state, $localStorage, SweetAlert) {
    var vm = this;

    activate();

    ////////////////

    function activate() {

      var SuccessMsg;
      var errorMsg;

      $scope.prodsizes = ProductSizeService.query({
      });


      console.log($scope.prodsizes);
      $scope.loadProductSizes= function () {
        $scope.prodsizes = ProductSizeService.query({
        });

      }

      $rootScope.$on("CallLoadProductsizes", function () {
        $scope.loadProductSizes();
      });

      $scope.delete = function (prodsize) {
        SweetAlert.swal({
          title: 'Are you sure?',
          text: 'You are about to delete Product Size!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, delete it!',
          closeOnConfirm: false
        }, function (data) {
          if (data) {
            prodsize.$remove({
            }).then(function () {
              $scope.loadProductSizes();
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
          templateUrl: 'addProductSize.html',
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


      $scope.show = function (_prodsize) {
        // $scope.x = x;
        var prodsize = _prodsize;

        var modalInstance = $uibModal.open({
          templateUrl: 'editProductSize.html',
          controller: ModalInstanceCtrl,
          resolve: {
            prodsize: function () {
              return prodsize;
            }
          }
          // scope : $scope
        });
      };


      // Please note that $uibModalInstance represents a modal window (instance) dependency.
      // It is not the same as the $uibModal service used above.

      ModalOpenInstanceCtrl.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'ProductSizeService'];

      function ModalOpenInstanceCtrl($scope, $rootScope, $uibModalInstance, ProductSizeService) {


        $scope.ok = function () {
          $uibModalInstance.close('closed');

        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
        $scope.prodsize = new ProductSizeService();

        $scope.submitProdSiz = function (prodsizeform) {
          $scope.prodsize.$save({
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
              $rootScope.$emit("CallLoadProductsizes", {});
              $scope.sizReset(prodsizeform);
            },
            function () {
              $scope.SuccessMsg = false;
              $scope.errorMsg = 'Server Request Error';
            });

        };


        $scope.szReset = function (prodsizeform) {

          $scope.prodsizeform = {};
          $scope.prodsize = "";
          prodsizeform.$setPristine();
        };

        $scope.CloseProdSiz = function (prodsize) {
          var saveprodsize = new ProductSizeService(prodsize);
          saveprodsize.$save({
          }).then(function (data) {

              $rootScope.$emit("CallLoadProductsizes", {});
              $scope.ok();
            },
            function () {
              $scope.SuccessMsg = false;
              $scope.errorMsg = 'Server Request Error';
            });

        };

      }

      ModalInstanceCtrl.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'ProductSizeService', 'prodsize'];

      function ModalInstanceCtrl($scope, $rootScope, $uibModalInstance, ProductSizeService, prodsize) {
        var id = prodsize.id;
        console.log(id);

        $scope.prodsize = prodsize;
        console.log(prodsize);
        $scope.ok = function () {
          $uibModalInstance.close('closed');

        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

     $scope.updateProdSiz= function (prodsize) {


          prodsize.$update({
          }).then(function (data) {
            var response = angular.fromJson(data);
            console.log($scope.prodsize);
            // $scope.authMsg=response.Message;
            if (response.Status == "1") {
              $scope.errorMsg = false;
              $scope.SuccessMsg = response.Message;
              $scope.prodsize = ProductSizeService.get({
                id: id,
              });
            } else {

              $scope.SuccessMsg = false;
              $scope.errorMsg = response.Message;

            }
            $rootScope.$emit("CallLoadProductsizes", {});
          }, function () {
            $scope.SuccessMsg = false;
            $scope.errorMsg = 'Server Request Error';
          });

        };

      }
    }
  }

})();