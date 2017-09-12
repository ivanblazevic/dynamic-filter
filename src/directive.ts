class Directive implements ng.IDirective {

    restrict = 'E';

    templateUrl = function(element, attrs) {
        return attrs.templateUrl;
    }

    scope = {
        options: '=',
        config: '=',
        onSelect: '&'
    }

    constructor() {

    }

    link($scope: DynamicFilterScope, elm: JQuery, attr: ng.IAttributes, ngModel: ng.INgModelController): void {

        $scope.apply = function() {
            var result = $scope.filters.getResult();
            $scope.onSelect({ result: result });
        }

        $scope.filters = new Filters($scope.apply);

        if ($scope.config && $scope.config.saveState) {
            $scope.filters.loadState($scope.options);
            $scope.apply();
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
