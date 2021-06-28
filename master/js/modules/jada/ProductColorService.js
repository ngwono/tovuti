
  (function() {
      'use strict';

      angular
          .module('app.jada')
          .factory('ProductColorService', ProductColorService);

      ProductColorService.$inject = ['$resource','baseJadaERPURL'];
      function ProductColorService($resource,baseJadaERPURL) {
       var data=$resource(baseJadaERPURL+'api/productcolor/:id', {id: '@id'},
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