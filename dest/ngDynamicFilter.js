(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AXArray extends Array {
    last() {
        return this[this.length - 1];
    }
    removeLastItem() {
        this.splice(-1, 1);
    }
}
exports.default = AXArray;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExtendedArray_1 = require("./ExtendedArray");
//import Option from "./Option";
//import OptionType from "./Option";
class Filter {
    constructor(callback) {
        this.values = new ExtendedArray_1.default();
        this.callback = callback;
    }
    addValue() {
        if (!this.canAddValue())
            return;
        this.values.push(""); // add empty value so array can be iterated in html
    }
    /**
    * Cannot add new value if previous value does not exist
    * or if type is text, text can only have one value
    */
    canAddValue() {
        return this.values.last() && !this.isText();
    }
    onSelect(option) {
        this.option = option;
        this.values.push("");
    }
    checkOptionType(optionType) {
        if (!this.option)
            return false;
        return this.option.type == optionType;
    }
    isAutocomplete() {
        return this.checkOptionType("AUTOCOMPLETE" /* AUTOCOMPLETE */);
    }
    isOptions() {
        return this.checkOptionType("OPTIONS" /* OPTIONS */);
    }
    isText() {
        return this.checkOptionType("TEXT" /* TEXT */);
    }
}
exports.default = Filter;

},{"./ExtendedArray":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExtendedArray_1 = require("./ExtendedArray");
const Filter_1 = require("./Filter");
class Filters extends ExtendedArray_1.default {
    constructor(callback) {
        super();
        this.callback = callback;
    }
    add() {
        // Prevent adding filter if no previous selected
        let lastFilter = this.last();
        if (lastFilter && !lastFilter.option)
            return;
        this.push(new Filter_1.default(this.callback));
    }
    getOptionByField(options, field) {
        let result = options.filter(function (o) {
            return o.field == field;
        });
        if (result.length == 0)
            throw ("Saved state value not found in options array!");
        return result[0];
    }
    loadState(options) {
        var state = JSON.parse(localStorage.getItem('dynamicFilter'));
        if (!state)
            return;
        var self = this;
        state.forEach(function (s) {
            if (!s.values)
                return;
            self.add();
            let lastAddedFilter = self.last();
            let option = self.getOptionByField(options, s.option.field);
            lastAddedFilter.onSelect(option);
            // add values
            s.values.forEach(function (v) {
                lastAddedFilter.addValue();
                lastAddedFilter.values[lastAddedFilter.values.length - 1] = v;
            });
        });
    }
    removeLast() {
        this.removeLastItem();
        this.callback();
    }
    isFilterSelected(option) {
        return this.some(function (f) {
            return f.option && f.option.field == option.field;
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
            o[m.option.field] = m.values;
            return o;
        });
    }
}
exports.Filters = Filters;
window.DynamicFilter = Filters;

},{"./ExtendedArray":1,"./Filter":2}]},{},[3]);
