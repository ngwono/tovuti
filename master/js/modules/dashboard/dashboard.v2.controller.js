(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardV2Controller', DashboardV2Controller);

    DashboardV2Controller.$inject = ['$rootScope', '$scope', '$state', 'Colors'];
    function DashboardV2Controller($rootScope, $scope, $state, Colors) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          // Change layout mode
          if( $state.includes('app-h') ) {
            // Setup layout horizontal for demo
            $rootScope.app.layout.horizontal = true;
            $scope.$on('$destroy', function(){
                $rootScope.app.layout.horizontal = false;
            });
          }
          else {
            if(!$rootScope.app.layout.isCollapsedText)
                $rootScope.app.layout.isCollapsed = true;
          }

          // BAR STACKED
          // -----------------------------------
          vm.barStackedOptions = {
              series: {
                  stack: true,
                  bars: {
                      align: 'center',
                      lineWidth: 0,
                      show: true,
                      barWidth: 0.6,
                      fill: 0.9
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#fcfcfc',
                  mode: 'categories'
              },
              yaxis: {
                  min: 0,
                  max: 200, // optional: use it for a clear represetation
                  position: ($rootScope.app.layout.isRTL ? 'right' : 'left'),
                  tickColor: '#eee'
              },
              shadowSize: 0
          };

          // SPLINE
          // -----------------------------------

          vm.splineOptions = {
              series: {
                  lines: {
                      show: false
                  },
                  points: {
                      show: true,
                      radius: 4
                  },
                  splines: {
                      show: true,
                      tension: 0.4,
                      lineWidth: 1,
                      fill: 0.5
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#fcfcfc',
                  mode: 'categories'
              },
              yaxis: {
                  min: 0,
                  max: 150, // optional: use it for a clear represetation
                  tickColor: '#eee',
                  position: ($rootScope.app.layout.isRTL ? 'right' : 'left'),
                  tickFormatter: function (v) {
                      return v/* + ' visitors'*/;
                  }
              },
              shadowSize: 0
          };

          // EASYPIE
          // -----------------------------------
          

          vm.easyPiePercent1 = 60;
          vm.easyPiePercent2 = 30;
          vm.easyPiePercent3 = 50;
          vm.easyPiePercent4 = 75;

          vm.pieOptions1 = {
              animate: {
                  duration: 800,
                  enabled: true
              },
              barColor: Colors.byName('info'),
              trackColor: '#edf2f6',
              scaleColor: false,
              lineWidth: 2,
              lineCap: 'round',
              size: 130
          };
          vm.pieOptions2 = {
              animate: {
                  duration: 800,
                  enabled: true
              },
              barColor: Colors.byName('pink'),
              trackColor: '#edf2f6',
              scaleColor: false,
              lineWidth: 2,
              lineCap: 'round',
              size: 130
          };
          vm.pieOptions3 = {
              animate: {
                  duration: 800,
                  enabled: true
              },
              barColor: Colors.byName('purple'),
              trackColor: '#edf2f6',
              scaleColor: false,
              lineWidth: 2,
              lineCap: 'round',
              size: 130
          };
          vm.pieOptions4 = {
              animate: {
                  duration: 800,
                  enabled: true
              },
              barColor: Colors.byName('warning'),
              trackColor: '#edf2f6',
              scaleColor: false,
              lineWidth: 2,
              lineCap: 'round',
              size: 130
          };
        }
    }
})();