
  (function() {
      'use strict';

      angular
          .module('app.jada')
          .factory('ProductTypeService', ProductTypeService);

      ProductTypeService.$inject = ['$resource','baseJadaERPURL'];
      function ProductTypeService($resource,baseJadaERPURL) {
       var data=$resource(baseJadaERPURL+'api/producttype/:id', {id: '@id'},
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