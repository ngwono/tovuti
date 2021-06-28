
  (function() {
      'use strict';

      angular
          .module('app.jada')
          .factory('ProductSizeService', ProductSizeService);

      ProductSizeService.$inject = ['$resource','baseJadaERPURL'];
      function ProductSizeService($resource,baseJadaERPURL) {
       var data=$resource(baseJadaERPURL+'api/productsize/:id', {id: '@id'},
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