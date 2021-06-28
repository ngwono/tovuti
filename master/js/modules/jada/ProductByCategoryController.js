/**=========================================================
   * Module: modals.js Product By Category controller
   * Provides a simple way to implement bootstrap modals from templates
   =========================================================*/
(function () {
  'use strict';

  angular
    .module('app.bootstrapui')
    .controller('ProductByCategoryController', ProductByCategoryController);

  ProductByCategoryController.$inject = ['$http', 'baseJadaERPURL', '$scope', '$compile', '$rootScope', '$uibModal', 'ProductService', 'ProductSizeService', 'ProductColorService', 'ProductCategoryService', 'ProductTypeService', '$stateParams', '$state', '$localStorage', 'SweetAlert'];

  function ProductByCategoryController($http, baseJadaERPURL, $scope, $compile, $rootScope, $uibModal, ProductService, ProductSizeService, ProductColorService, ProductCategoryService, ProductTypeService, $stateParams, $state, $localStorage, SweetAlert) {
    var vm = this;

    activate();

    ////////////////

    function activate() {

      var SuccessMsg;
      var errorMsg;

      $scope.categories = ProductCategoryService.query({
      });

      $scope.catSearch = function(product){
          ProductService.query({id:product.category}).$promise.then(function(resData){
                $scope.prodData=resData;
                $scope.products=$scope.prodData;

              });

      }

      $scope.home = function(){
        $state.go("page.management-menu");
      } 


    }
  }

})();