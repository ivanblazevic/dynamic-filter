class Directive {
    constructor() {
        this.restrict = 'E';
        this.templateUrl = function (element, attrs) {
            return attrs.templateUrl;
        };
        this.scope = {
            options: '=',
            onSelect: '&'
        };
    }
    link($scope, elm, attr, ngModel) {
        $scope.filters = [];
        $scope.addFilter = function () {
            let lastFilter = $scope.filters[$scope.filters.length - 1];
            if (lastFilter && !lastFilter.field)
                return;
            $scope.filters.push(new Filter($scope.apply));
        };
        $scope.removeFilter = function () {
            $scope.filters.splice($scope.filters.length - 1, 1);
            $scope.apply();
        };
        $scope.apply = function () {
            var result = $scope.filters.map(function (m) {
                var o = {};
                o[m.field] = m.values.map(function (v) { return v.value; });
                return o;
            });
            $scope.onSelect({ result: result });
        };
    }
    validate() {
        console.log(this);
    }
    static instance() {
        return new Directive();
    }
}
angular.module('ngDynamicFilter', []).directive('dynamicFilter', Directive.instance);
class Filter {
    constructor(callback) {
        this.field = null;
        this.values = null;
        this.callback = callback;
    }
    addValue() {
        if (!this.canAddValue())
            return;
        this.values.push(new Value(this.callback));
    }
    canAddValue() {
        if (!this.values)
            return false;
        let lastValue = this.values[this.values.length - 1];
        return lastValue.value != null;
    }
    onSelect(option) {
        this.field = option.field;
        this.values = [new Value(this.callback)];
    }
    getOptions(options) {
        var field = this.field;
        var option = options.filter(function (o) {
            return o.field == field;
        });
        return option[0].options;
    }
}
class Value {
    constructor(callback) {
        this.callback = callback;
        this.value = null;
        this.skipApply = false;
    }
    onSelect(value) {
        this.value = value;
        if (!this.skipApply)
            this.callback();
    }
}
//# sourceMappingURL=concat.js.map