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
        $scope.apply = function () {
            var result = $scope.filters.getResult();
            $scope.onSelect({ result: result });
        };
        $scope.filters = new Filters($scope.apply);
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
        return lastValue.value != null && OptionType[this.type] != OptionType.TEXT.toString();
    }
    onSelect(option) {
        this.field = option.field;
        this.type = option.type;
        this.options = option.options;
        this.params = option.params;
        this.values = [new Value(this.callback)];
    }
    getValues(options) {
        var field = this.field;
        var option = options.filter(function (o) {
            return o.field == field;
        });
        return option[0].options;
    }
}
class Filters extends Array {
    constructor(callback) {
        super();
        this.callback = callback;
    }
    add() {
        let lastFilter = this[this.length - 1];
        if (lastFilter && !lastFilter.field)
            return;
        this.push(new Filter(this.callback));
    }
    removeLast() {
        this.splice(-1, 1);
        this.callback();
    }
    isFilterSelected(option) {
        return this.some(function (f) {
            return f.field == option.field;
        });
    }
    isValueSelected(value) {
        return this.some(function (f) {
            return f.values && f.values.some && f.values.some(function (v) {
                return v.value == value;
            });
        });
    }
    getResult() {
        return this.map(function (m) {
            var o = {};
            o[m.field] = m.values.map(function (v) { return v.value; });
            return o;
        });
    }
}
var OptionType;
(function (OptionType) {
    OptionType[OptionType["TEXT"] = 0] = "TEXT";
    OptionType[OptionType["AUTOCOMPLETE"] = 1] = "AUTOCOMPLETE";
    OptionType[OptionType["OPTIONS"] = 2] = "OPTIONS";
})(OptionType || (OptionType = {}));
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