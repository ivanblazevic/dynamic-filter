class Directive implements ng.IDirective {

    restrict = 'E';

    templateUrl = function(element, attrs) {
        return attrs.templateUrl;
    }

    scope = {
        options: '=',
        onSelect: '&'
    }

    constructor() {

    }

    link($scope: DynamicFilterScope, elm: JQuery, attr: ng.IAttributes, ngModel: ng.INgModelController): void {

        $scope.filters = [];

        $scope.addFilter = function() {
            // Prevent adding filter if no previous selected
            let lastFilter = $scope.filters[$scope.filters.length - 1];
            if (lastFilter && !lastFilter.field) return;
            $scope.filters.push(new Filter($scope.apply));
        }

        $scope.removeFilter = function() {
            $scope.filters.splice($scope.filters.length - 1, 1);
            $scope.apply();
        }

        /**
         * Apply filter
         */
        $scope.apply = function() {
            var result = $scope.filters.map(function(m) {
                var o = {};
                o[m.field] = m.values.map(function(v) { return v.value });
                return o;
            });
            $scope.onSelect({ result: result });
        }

    }

    validate() {
        console.log(this); // this points to MyDirective instance instead of Window
    }

    static instance(): ng.IDirective {
        return new Directive();
    }
}

angular.module('ngDynamicFilter', []).directive('dynamicFilter', Directive.instance);
