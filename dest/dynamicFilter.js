(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AXArray extends Array {
    constructor() {
        super(...arguments);
        this.last = () => {
            return this[this.length - 1];
        };
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
    constructor(ref) {
        this.callback = ref.callback;
        this.ref = ref;
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
        this.ref.setApplyEnabled();
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
        this.options = options;
        this.config = config;
        this.getID = () => {
            return this.config.id || "dynamicFilter";
        };
        this.saveState = () => {
            // only neccessary stuff will be saved to local storage
            let filterState = this.map(function (m) {
                return {
                    option: m.option,
                    values: m.values
                };
            });
            localStorage.setItem(this.getID(), JSON.stringify(filterState));
        };
        /**
         * @force - boolean: used to override config.autoApply
         */
        this.callback = (force) => {
            if (!this.config)
                return;
            if (this.saveState)
                this.saveState();
            if (force || this.config.autoApply)
                this.config.callback(this.getResult());
        };
        this.setApplyEnabled = () => {
            this.applyButton = true;
        };
        this.setApplyDisabled = () => {
            this.applyButton = false;
        };
        this.isApplyEnabled = () => {
            return this.applyButton;
        };
        this.add = () => {
            // Prevent adding filter if no previous selected
            let lastFilter = this.last();
            if (lastFilter && !lastFilter.option)
                return;
            this.setApplyDisabled();
            this.push(new Filter_1.default(this));
        };
        this.getOptionByField = (options, field) => {
            let result = options.filter(function (o) {
                return o.field == field;
            });
            if (result.length == 0)
                throw ("Cached option field value " + field + " not found in options array!");
            return result[0];
        };
        this.loadState = () => {
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
        };
        this.removeLast = () => {
            this.removeLastItem();
            this.callback();
            if (this.length == 0)
                this.applyButton = false;
        };
        this.isFilterSelected = (option) => {
            return this.some(function (f) {
                return f.option && f.option.field == option.field;
            });
        };
        this.isValueSelected = (value) => {
            return this.some(function (f) {
                return f.values && f.values.some && f.values.some(function (v) {
                    return v == value;
                });
            });
        };
        this.getResult = () => {
            let self = this;
            return this.map(function (m) {
                var o = {};
                if (!m.option) {
                    if (self.config.errorCallback)
                        self.config.errorCallback("Select option before getting result");
                    throw ("Select option before getting result");
                }
                o[m.option.field] = m.values;
                return o;
            });
        };
        if (!options)
            throw ("Options not passed to DynamicFilter constructor!");
        if (!config)
            throw ("Callback not passed to DynamicFilter constructor!");
        // TODO: should be handled properly; constructor has been called when this.splice is executed?
        //if (!config || !options) return;
        if (config.autoApply == null)
            config.autoApply = true;
        this.config = config;
        if (this.config.saveState) {
            this.loadState();
            this.config.callback(this.getResult());
        }
    }
}
exports.Filters = Filters;
window.DynamicFilter = Filters;

},{"./ExtendedArray":2,"./Filter":3}],5:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}]},{},[1,2,3,4,5]);
