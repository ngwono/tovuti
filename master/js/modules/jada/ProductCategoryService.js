
  (function() {
      'use strict';

      angular
          .module('app.jada')
          .factory('ProductCategoryService', ProductCategoryService);

      ProductCategoryService.$inject = ['$resource','baseJadaERPURL'];
      function ProductCategoryService($resource,baseJadaERPURL) {
       var data=$resource(baseJadaERPURL+'api/productcategory/:id', {id: '@id'},
      { 'get':    {method:'GET', isArray:false},
    'save':   {method:'POST'},
    'query':  {method:'GET', isArray:true},
    'update': { method:'PUT' },
    'remove': {method:'DELETE'},
    'delete': {method:'DELETE'} 
  });
       return data
            
         
      }

  })();