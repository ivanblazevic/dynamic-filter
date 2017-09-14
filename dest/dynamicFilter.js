(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExtendedArray_1 = require("./ExtendedArray");
class Filter {
    constructor(callback, applyButton) {
        this.callback = callback;
        this.applyButton = applyButton;
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
        return this.values && this.values.last() && !this.isText();
    }
    onSelect(option) {
        this.values = new ExtendedArray_1.default();
        this.option = option;
        this.values.push("");
        this.applyButton.enabled = true;
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

},{"./ExtendedArray":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExtendedArray_1 = require("./ExtendedArray");
const Filter_1 = require("./Filter");
class Filters extends ExtendedArray_1.default {
    constructor(options, config) {
        super();
        //if (!options) throw ("Options not passed to DynamicFilter constructor!");
        //if (!callback) throw ("Callback not passed to DynamicFilter constructor!");
        // TODO: should be handled properly; constructor has been called when this.splice is executed?
        if (!config || !options)
            return;
        this.options = options;
        this.config = config;
        // this is passed as object because primitve does not hold reference
        this.applyButton = { enabled: false };
    }
    getID() {
        return this.config.id || "dynamicFilter";
    }
    /**
     * @force - boolean: used to override config.autoApply
     */
    callback(force) {
        if (!this.config)
            return;
        if (this.config.autoApply) {
            localStorage.setItem(this.getID(), JSON.stringify(this));
        }
        if (!force || this.config.autoApply)
            this.config.callback(this.getResult());
    }
    setApplyEnabled() {
        this.applyButton.enabled = true;
    }
    setApplyDisabled() {
        this.applyButton.enabled = false;
    }
    isApplyEnabled() {
        return this.applyButton.enabled;
    }
    add() {
        // Prevent adding filter if no previous selected
        let lastFilter = this.last();
        if (lastFilter && !lastFilter.option)
            return;
        this.setApplyDisabled();
        this.push(new Filter_1.default(this.callback, this.applyButton));
    }
    getOptionByField(options, field) {
        let result = options.filter(function (o) {
            return o.field == field;
        });
        if (result.length == 0)
            throw ("Cached option field value " + field + " not found in options array!");
        return result[0];
    }
    loadState() {
        var state = JSON.parse(localStorage.getItem(this.getID()));
        if (!state)
            return;
        var self = this;
        state.forEach(function (s) {
            if (!s.values)
                return;
            self.add();
            let lastAddedFilter = self.last();
            let option = self.getOptionByField(self.options, s.option.field);
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
        if (this.length == 0)
            this.applyButton.enabled = false;
    }
    isFilterSelected(option) {
        return this.some(function (f) {
            return f.option && f.option.field == option.field;
        });
    }
    isValueSelected(value) {
        return this.some(function (f) {
            return f.values && f.values.some && f.values.some(function (v) {
                return v == value;
            });
        });
    }
    getResult() {
        return this.map(function (m) {
            var o = {};
            o[m.option.field] = m.values;
            return o;
        });
    }
}
exports.Filters = Filters;
window.DynamicFilter = Filters;
(module).exports = Filters;

},{"./ExtendedArray":2,"./Filter":3}],5:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}]},{},[1,2,3,4,5]);
