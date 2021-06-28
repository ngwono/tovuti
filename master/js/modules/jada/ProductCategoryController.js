/**=========================================================
   * Module: modals.js Product Category controller
   * Provides a simple way to implement bootstrap modals from templates
   =========================================================*/
(function () {
  'use strict';

  angular
    .module('app.bootstrapui')
    .controller('ProductCategoryController', ProductCategoryController);

  ProductCategoryController.$inject = ['$scope', '$rootScope', '$uibModal', 'ProductCategoryService', '$stateParams', '$state', '$localStorage', 'SweetAlert'];

  function ProductCategoryController($scope, $rootScope, $uibModal, ProductCategoryService, $stateParams, $state, $localStorage, SweetAlert) {
    var vm = this;

    activate();

    ////////////////

    function activate() {

      var SuccessMsg;
      var errorMsg;

      $scope.categories = ProductCategoryService.query({
      });


      console.log($scope.categories);
      $scope.loadCategories = function () {
        $scope.categories = ProductCategoryService.query({
        });

      }

      $rootScope.$on("CallLoadCategories", function () {
        $scope.loadCategories();
      });

      $scope.delete = function (category) {
        SweetAlert.swal({
          title: 'Are you sure?',
          text: 'You are about to delete Product Category!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, delete it!',
          closeOnConfirm: false
        }, function (data) {
          if (data) {
            category.$remove({
            }).then(function () {
              $scope.loadCategories();
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
          templateUrl: 'addProductCategory.html',
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


      $scope.show = function (_category) {
        // $scope.x = x;
        var category = _category;

        var modalInstance = $uibModal.open({
          templateUrl: 'editProductCategory.html',
          controller: ModalInstanceCtrl,
          resolve: {
            category: function () {
              return category;
            }
          }
          // scope : $scope
        });
      };


      // Please note that $uibModalInstance represents a modal window (instance) dependency.
      // It is not the same as the $uibModal service used above.

      ModalOpenInstanceCtrl.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'ProductCategoryService'];

      function ModalOpenInstanceCtrl($scope, $rootScope, $uibModalInstance, ProductCategoryService) {


        $scope.ok = function () {
          $uibModalInstance.close('closed');

        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
        $scope.category = new ProductCategoryService();

        $scope.submitProdCat = function (categoryform) {
          $scope.category.$save({
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
              $rootScope.$emit("CallLoadCategories", {});
              $scope.prodReset(categoryform);
            },
            function () {
              $scope.SuccessMsg = false;
              $scope.errorMsg = 'Server Request Error';
            });

        };


        $scope.catReset = function (categoryform) {

          $scope.categoryform = {};
          $scope.category = "";
          categoryform.$setPristine();
        };

        $scope.CloseProdCat = function (category) {
          var savecategory = new ProductCategoryService(category);
          savecategory.$save({
          }).then(function (data) {

              $rootScope.$emit("CallLoadCategories", {});
              $scope.ok();
            },
            function () {
              $scope.SuccessMsg = false;
              $scope.errorMsg = 'Server Request Error';
            });

        };

      }

      ModalInstanceCtrl.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'ProductCategoryService', 'category'];

      function ModalInstanceCtrl($scope, $rootScope, $uibModalInstance, ProductCategoryService, category) {
        var id = category.id;
        console.log(id);

        $scope.category = category;
        console.log(category);
        $scope.ok = function () {
          $uibModalInstance.close('closed');

        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

     $scope.updateProdCat = function (category) {


          category.$update({
          }).then(function (data) {
            var response = angular.fromJson(data);
            console.log($scope.category);
            // $scope.authMsg=response.Message;
            if (response.Status == "1") {
              $scope.errorMsg = false;
              $scope.SuccessMsg = response.Message;
              $scope.category = ProductCategoryService.get({
                id: id,
              });
            } else {

              $scope.SuccessMsg = false;
              $scope.errorMsg = response.Message;

            }
            $rootScope.$emit("CallLoadCategories", {});
          }, function () {
            $scope.SuccessMsg = false;
            $scope.errorMsg = 'Server Request Error';
          });

        };

      }
    }
  }

})();