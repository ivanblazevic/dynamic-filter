var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Directive = (function () {
    function Directive() {
        this.restrict = 'E';
        this.templateUrl = function (element, attrs) {
            return attrs.templateUrl;
        };
        this.scope = {
            options: '=',
            onSelect: '&'
        };
    }
    Directive.prototype.link = function ($scope, elm, attr, ngModel) {
        $scope.apply = function () {
            var result = $scope.filters.getResult();
            $scope.onSelect({ result: result });
        };
        $scope.filters = new Filters($scope.apply);
    };
    Directive.prototype.validate = function () {
        console.log(this);
    };
    Directive.instance = function () {
        return new Directive();
    };
    return Directive;
}());
angular.module('ngDynamicFilter', []).directive('dynamicFilter', Directive.instance);
var Filter = (function () {
    function Filter(callback) {
        this.field = null;
        this.values = null;
        this.callback = callback;
    }
    Filter.prototype.addValue = function () {
        if (!this.canAddValue())
            return;
        this.values.push(new Value(this.callback));
    };
    Filter.prototype.canAddValue = function () {
        if (!this.values)
            return false;
        var lastValue = this.values[this.values.length - 1];
        return lastValue.value != null && OptionType[this.type] != OptionType.TEXT.toString();
    };
    Filter.prototype.onSelect = function (option) {
        this.field = option.field;
        this.type = option.type;
        this.options = option.options;
        this.params = option.params;
        this.values = [new Value(this.callback)];
    };
    Filter.prototype.getValues = function (options) {
        var field = this.field;
        var option = options.filter(function (o) {
            return o.field == field;
        });
        return option[0].options;
    };
    return Filter;
}());
var Filters = (function (_super) {
    __extends(Filters, _super);
    function Filters(callback) {
        var _this = _super.call(this) || this;
        _this.callback = callback;
        return _this;
    }
    Filters.prototype.add = function () {
        var lastFilter = this[this.length - 1];
        if (lastFilter && !lastFilter.field)
            return;
        this.push(new Filter(this.callback));
    };
    Filters.prototype.removeLast = function () {
        this.splice(-1, 1);
        this.callback();
    };
    Filters.prototype.isFilterSelected = function (option) {
        return this.some(function (f) {
            return f.field == option.field;
        });
    };
    Filters.prototype.isValueSelected = function (value) {
        return this.some(function (f) {
            return f.values && f.values.some && f.values.some(function (v) {
                return v.value == value;
            });
        });
    };
    Filters.prototype.getResult = function () {
        return this.map(function (m) {
            var o = {};
            o[m.field] = m.values.map(function (v) { return v.value; });
            return o;
        });
    };
    return Filters;
}(Array));
var OptionType;
(function (OptionType) {
    OptionType[OptionType["TEXT"] = 0] = "TEXT";
    OptionType[OptionType["AUTOCOMPLETE"] = 1] = "AUTOCOMPLETE";
    OptionType[OptionType["OPTIONS"] = 2] = "OPTIONS";
})(OptionType || (OptionType = {}));
var Value = (function () {
    function Value(callback) {
        this.callback = callback;
        this.value = null;
        this.skipApply = false;
    }
    Value.prototype.onSelect = function (value) {
        this.value = value;
        if (!this.skipApply)
            this.callback();
    };
    return Value;
}());
//# sourceMappingURL=concat.js.map