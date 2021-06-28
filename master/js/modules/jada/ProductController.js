/**=========================================================
   * Module: modals.js Product controller
   * Provides a simple way to implement bootstrap modals from templates
   =========================================================*/
(function () {
  'use strict';

  angular
    .module('app.bootstrapui')
    .controller('ProductController', ProductController);

  ProductController.$inject = ['$scope', '$rootScope', '$uibModal', 'ProductService', 'ProductSizeService', 'ProductColorService', 'ProductCategoryService', 'ProductTypeService', '$stateParams', '$state', '$localStorage', 'SweetAlert'];

  function ProductController($scope, $rootScope, $uibModal, ProductService, ProductSizeService, ProductColorService, ProductCategoryService, ProductTypeService, $stateParams, $state, $localStorage, SweetAlert) {
    var vm = this;

    activate();

    ////////////////

    function activate() {

      var SuccessMsg;
      var errorMsg;

      $scope.products = ProductService.query({
      });

      $scope.categories = ProductCategoryService.query({
      });

      $scope.prodtypes = ProductTypeService.query({
      });

      $scope.prodcolors = ProductColorService.query({
      });

      $scope.prodsizes = ProductSizeService.query({
      });


      console.log($scope.products);
      $scope.loadProducts= function () {
        $scope.products = ProductService.query({
        });

      }

      $rootScope.$on("CallLoadProducts", function () {
        $scope.loadProducts();
      });

      $scope.delete = function (product) {
        SweetAlert.swal({
          title: 'Are you sure?',
          text: 'You are about to delete Product !',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, delete it!',
          closeOnConfirm: false
        }, function (data) {
          if (data) {
            product.$remove({
            }).then(function () {
              $scope.loadProducts();
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
          templateUrl: 'addProduct.html',
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


      $scope.show = function (_product) {
        // $scope.x = x;
        var product = _product;

        var modalInstance = $uibModal.open({
          templateUrl: 'editProduct.html',
          controller: ModalInstanceCtrl,
          resolve: {
            product: function () {
              return product;
            }
          }
          // scope : $scope
        });
      };


      // Please note that $uibModalInstance represents a modal window (instance) dependency.
      // It is not the same as the $uibModal service used above.

      ModalOpenInstanceCtrl.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'ProductService'];

      function ModalOpenInstanceCtrl($scope, $rootScope, $uibModalInstance, ProductService) {


        $scope.ok = function () {
          $uibModalInstance.close('closed');

        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
        $scope.product = new ProductService();

        $scope.submitProd = function (productform) {
          $scope.product.$save({
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
              $rootScope.$emit("CallLoadProducts", {});
              $scope.proReset(productform);
            },
            function () {
              $scope.SuccessMsg = false;
              $scope.errorMsg = 'Server Request Error';
            });

        };


        $scope.prReset = function (productform) {

          $scope.productform = {};
          $scope.product = "";
          productform.$setPristine();
        };

        $scope.CloseProd = function (product) {
          var saveproduct = new ProductService(product);
          saveproduct.$save({
          }).then(function (data) {

              $rootScope.$emit("CallLoadProducts", {});
              $scope.ok();
            },
            function () {
              $scope.SuccessMsg = false;
              $scope.errorMsg = 'Server Request Error';
            });

        };

      }

      ModalInstanceCtrl.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'ProductService', 'product'];

      function ModalInstanceCtrl($scope, $rootScope, $uibModalInstance, ProductService, product) {
        var id = product.id;
        console.log(id);

        $scope.product = product;
        console.log(product);
        $scope.ok = function () {
          $uibModalInstance.close('closed');

        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

     $scope.updateProd= function (product) {


          product.$update({
          }).then(function (data) {
            var response = angular.fromJson(data);
            console.log($scope.product);
            // $scope.authMsg=response.Message;
            if (response.Status == "1") {
              $scope.errorMsg = false;
              $scope.SuccessMsg = response.Message;
              $scope.product = ProductService.get({
                id: id,
              });
            } else {

              $scope.SuccessMsg = false;
              $scope.errorMsg = response.Message;

            }
            $rootScope.$emit("CallLoadProducts", {});
          }, function () {
            $scope.SuccessMsg = false;
            $scope.errorMsg = 'Server Request Error';
          });

        };

      }
    }
  }

})();