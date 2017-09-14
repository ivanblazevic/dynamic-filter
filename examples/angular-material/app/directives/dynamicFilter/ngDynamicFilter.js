angular.module('ngDynamicFilter', []).directive('dynamicFilter', function() {
    return {
        restrict: 'E',
        templateUrl: function(element, attrs) {
            return attrs.templateUrl;
        },
        scope: {
            options: '=',
            config: '=',
            onSelect: '&'
        },
        link: function($scope, $element, $attrs) {

            $scope.apply = function() {
                var result = $scope.filters.getResult();
                $scope.onSelect({ result: result });
            }

            $scope.filters = new DynamicFilter($scope.options, $scope.apply);

            if ($scope.config && $scope.config.saveState) {
                $scope.filters.loadState();
            }

        }
   }
});
