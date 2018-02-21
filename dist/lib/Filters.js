"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var ExtendedArray_1 = require("./ExtendedArray");
var Filter_1 = require("./Filter");
var Filters = (function (_super) {
    __extends(Filters, _super);
    function Filters(options, config) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.config = config;
        _this.getID = function () {
            return _this.config.id || "dynamicFilter";
        };
        _this.save = function () {
            var filterState = _this.map(function (m) {
                return {
                    field: m.option.field,
                    values: m.values
                };
            });
            localStorage.setItem(_this.getID(), JSON.stringify(filterState));
        };
        _this.callback = function (force) {
            if (!_this.config)
                return;
            if (_this.config.saveState)
                _this.save();
            if (force || _this.config.autoApply)
                _this.config.callback(_this.getResult());
        };
        _this.setApplyEnabled = function () {
            _this.applyButton = true;
        };
        _this.setApplyDisabled = function () {
            _this.applyButton = false;
        };
        _this.isApplyEnabled = function () {
            return _this.applyButton;
        };
        _this.add = function () {
            var lastFilter = _this.last();
            if (lastFilter && !lastFilter.option)
                return;
            _this.setApplyDisabled();
            _this.push(new Filter_1.default(_this));
        };
        _this.getOptionByField = function (options, field) {
            var result = options.filter(function (o) {
                return o.field == field;
            });
            if (result.length == 0)
                throw ("Cached option field value " + field + " not found in options array!");
            return result[0];
        };
        _this.loadState = function () {
            var state = JSON.parse(localStorage.getItem(_this.getID()));
            if (!state)
                return;
            var self = _this;
            state.forEach(function (s) {
                if (!s.values)
                    return;
                self.add();
                var lastAddedFilter = self.last();
                var option = self.getOptionByField(self.options, s.field);
                lastAddedFilter.onSelect(option);
                s.values.forEach(function (v) {
                    lastAddedFilter.addValue();
                    lastAddedFilter.values[lastAddedFilter.values.length - 1] = v;
                });
            });
        };
        _this.removeLast = function () {
            _this.removeLastItem();
            _this.callback();
            if (_this.length == 0)
                _this.applyButton = false;
        };
        _this.isFilterSelected = function (option) {
            return _this.some(function (f) {
                return f.option && f.option.field == option.field;
            });
        };
        _this.getResult = function () {
            var self = _this;
            var o = {};
            var result = _this.forEach(function (m) {
                if (!m.option) {
                    if (self.config.errorCallback)
                        self.config.errorCallback({ code: 2, message: "Select option before getting result" });
                    return;
                }
                o[m.option.field] = m.values.map(function (m) { return m; });
                return o;
            });
            return o;
        };
        if (!options)
            throw ("Options not passed to DynamicFilter constructor!");
        if (!config)
            throw ("Callback not passed to DynamicFilter constructor!");
        if (config.autoApply == null)
            config.autoApply = true;
        _this.config = config;
        if (_this.config.saveState) {
            _this.loadState();
            _this.config.callback(_this.getResult());
        }
        return _this;
    }
    return Filters;
}(ExtendedArray_1.default));
exports.Filters = Filters;
window.DynamicFilter = Filters;
