class Directive {
    constructor() {
        this.restrict = 'E';
        this.templateUrl = function (element, attrs) {
            return attrs.templateUrl;
        };
        this.scope = {
            options: '=',
            config: '=',
            onSelect: '&'
        };
    }
    link($scope, elm, attr, ngModel) {
        $scope.apply = function () {
            var result = $scope.filters.getResult();
            $scope.onSelect({ result: result });
        };
        $scope.filters = new Filters($scope.apply);
        if ($scope.config && $scope.config.saveState) {
            $scope.filters.loadState($scope.options);
            $scope.apply();
        }
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
        this.values = null;
        this.callback = callback;
    }
    addValue() {
        if (!this.canAddValue())
            return;
        this.values.push("");
    }
    canAddValue() {
        if (!this.values)
            return false;
        let lastValue = this.values[this.values.length - 1];
        return lastValue != "" && !this.isText();
    }
    onSelect(option) {
        this.option = option;
        this.values = [""];
    }
    isAutocomplete() {
        return OptionType[this.option.type] == OptionType.AUTOCOMPLETE.toString();
    }
    isOptions() {
        return OptionType[this.option.type] == OptionType.OPTIONS.toString();
    }
    isText() {
        return OptionType[this.option.type] == OptionType.TEXT.toString();
    }
    getValues(options) {
        var field = this.option.field;
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
        if (lastFilter && !lastFilter.option)
            return;
        this.push(new Filter(this.callback));
    }
    loadState(options) {
        var state = JSON.parse(localStorage.getItem('dynamicFilter'));
        var self = this;
        if (!state)
            return;
        state.forEach(function (s) {
            let searchOption = options.filter(function (o) {
                return o.field == s.option.field;
            });
            if (searchOption.length == 0)
                throw ("Saved state value not found in options array!");
            self.add();
            self[self.length - 1].onSelect(searchOption[0]);
            if (s.values) {
                s.values.forEach(function (v) {
                    self[self.length - 1].addValue();
                    self[self.length - 1].values[self[self.length - 1].values.length - 1] = v;
                });
            }
        });
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
        localStorage.setItem('dynamicFilter', JSON.stringify(this));
        return this.map(function (m) {
            var o = {};
            o[m.option.field] = m.values.map(function (v) { return v; });
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