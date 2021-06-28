
  (function() {
      'use strict';

      angular
          .module('app.jada')
          .factory('ProductService', ProductService);

      ProductService.$inject = ['$resource','baseJadaERPURL'];
      function ProductService($resource,baseJadaERPURL) {
       var data=$resource(baseJadaERPURL+'api/product/:id', {id: '@id'},
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