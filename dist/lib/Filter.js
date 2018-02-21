"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExtendedArray_1 = require("./ExtendedArray");
var Filter = (function () {
    function Filter(ref) {
        var _this = this;
        this.addValue = function () {
            if (!_this.canAddValue())
                return;
            _this.values.push("");
        };
        this.canAddValue = function () {
            return _this.values && _this.values.last() && !_this.isText();
        };
        this.onSelect = function (option) {
            _this.values = new ExtendedArray_1.default();
            _this.option = option;
            _this.values.push("");
            _this.filters.setApplyEnabled();
        };
        this.isValueSelected = function (value) {
            return _this.values && _this.values.some(function (v) {
                return v == value;
            });
        };
        this.checkOptionType = function (optionType) {
            if (!_this.option)
                return false;
            return _this.option.type == optionType;
        };
        this.isAutocomplete = function () {
            return _this.checkOptionType("AUTOCOMPLETE");
        };
        this.isOptions = function () {
            return _this.checkOptionType("OPTIONS");
        };
        this.isText = function () {
            return _this.checkOptionType("TEXT");
        };
        this.callback = ref.callback;
        this.filters = ref;
    }
    return Filter;
}());
exports.default = Filter;
