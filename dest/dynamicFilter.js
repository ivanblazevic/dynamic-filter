"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
            }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
        }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
        s(r[o]);
    }return s;
})({ 1: [function (require, module, exports) {}, {}], 2: [function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });

        var AXArray = function (_Array) {
            _inherits(AXArray, _Array);

            function AXArray() {
                _classCallCheck(this, AXArray);

                var _this = _possibleConstructorReturn(this, (AXArray.__proto__ || Object.getPrototypeOf(AXArray)).apply(this, arguments));

                _this.last = function () {
                    return _this[_this.length - 1];
                };
                _this.removeLastItem = function () {
                    _this.splice(-1, 1);
                };
                return _this;
            }

            return AXArray;
        }(Array);

        exports.default = AXArray;
    }, {}], 3: [function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        var ExtendedArray_1 = require("./ExtendedArray");

        var Filter = function () {
            function Filter(ref) {
                _classCallCheck(this, Filter);

                this.callback = ref.callback;
                this.ref = ref;
            }

            _createClass(Filter, [{
                key: "addValue",
                value: function addValue() {
                    if (!this.canAddValue()) return;
                    this.values.push(""); // add empty value so array can be iterated in html
                }
                /**
                * Cannot add new value if previous value does not exist
                * or if type is text, text can only have one value
                */

            }, {
                key: "canAddValue",
                value: function canAddValue() {
                    return this.values && this.values.last() && !this.isText();
                }
            }, {
                key: "onSelect",
                value: function onSelect(option) {
                    this.values = new ExtendedArray_1.default();
                    this.option = option;
                    this.values.push("");
                    this.ref.setApplyEnabled();
                }
            }, {
                key: "checkOptionType",
                value: function checkOptionType(optionType) {
                    if (!this.option) return false;
                    return this.option.type == optionType;
                }
            }, {
                key: "isAutocomplete",
                value: function isAutocomplete() {
                    return this.checkOptionType("AUTOCOMPLETE" /* AUTOCOMPLETE */);
                }
            }, {
                key: "isOptions",
                value: function isOptions() {
                    return this.checkOptionType("OPTIONS" /* OPTIONS */);
                }
            }, {
                key: "isText",
                value: function isText() {
                    return this.checkOptionType("TEXT" /* TEXT */);
                }
            }]);

            return Filter;
        }();

        exports.default = Filter;
    }, { "./ExtendedArray": 2 }], 4: [function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        var ExtendedArray_1 = require("./ExtendedArray");
        var Filter_1 = require("./Filter");

        var Filters = function (_ExtendedArray_1$defa) {
            _inherits(Filters, _ExtendedArray_1$defa);

            function Filters(options, config) {
                _classCallCheck(this, Filters);

                var _this2 = _possibleConstructorReturn(this, (Filters.__proto__ || Object.getPrototypeOf(Filters)).call(this));

                _this2.options = options;
                _this2.config = config;
                _this2.getID = function () {
                    return _this2.config.id || "dynamicFilter";
                };
                _this2.saveState = function () {
                    // only neccessary stuff will be saved to local storage
                    var filterState = _this2.map(function (m) {
                        return {
                            option: m.option,
                            values: m.values
                        };
                    });
                    localStorage.setItem(_this2.getID(), JSON.stringify(filterState));
                };
                /**
                 * @force - boolean: used to override config.autoApply
                 */
                _this2.callback = function (force) {
                    if (!_this2.config) return;
                    if (_this2.saveState) _this2.saveState();
                    if (force || _this2.config.autoApply) _this2.config.callback(_this2.getResult());
                };
                _this2.setApplyEnabled = function () {
                    _this2.applyButton = true;
                };
                _this2.setApplyDisabled = function () {
                    _this2.applyButton = false;
                };
                _this2.isApplyEnabled = function () {
                    return _this2.applyButton;
                };
                _this2.add = function () {
                    // Prevent adding filter if no previous selected
                    var lastFilter = _this2.last();
                    if (lastFilter && !lastFilter.option) return;
                    _this2.setApplyDisabled();
                    _this2.push(new Filter_1.default(_this2));
                };
                _this2.getOptionByField = function (options, field) {
                    var result = options.filter(function (o) {
                        return o.field == field;
                    });
                    if (result.length == 0) throw "Cached option field value " + field + " not found in options array!";
                    return result[0];
                };
                _this2.loadState = function () {
                    var state = JSON.parse(localStorage.getItem(_this2.getID()));
                    if (!state) return;
                    var self = _this2;
                    state.forEach(function (s) {
                        if (!s.values) return;
                        self.add();
                        var lastAddedFilter = self.last();
                        var option = self.getOptionByField(self.options, s.option.field);
                        lastAddedFilter.onSelect(option);
                        // add values
                        s.values.forEach(function (v) {
                            lastAddedFilter.addValue();
                            lastAddedFilter.values[lastAddedFilter.values.length - 1] = v;
                        });
                    });
                };
                _this2.removeLast = function () {
                    _this2.removeLastItem();
                    _this2.callback();
                    if (_this2.length == 0) _this2.applyButton = false;
                };
                _this2.isFilterSelected = function (option) {
                    return _this2.some(function (f) {
                        return f.option && f.option.field == option.field;
                    });
                };
                _this2.isValueSelected = function (value) {
                    return _this2.some(function (f) {
                        return f.values && f.values.some && f.values.some(function (v) {
                            return v == value;
                        });
                    });
                };
                _this2.getResult = function () {
                    var self = _this2;
                    return _this2.map(function (m) {
                        var o = {};
                        if (!m.option) {
                            if (self.config.errorCallback) self.config.errorCallback("Select option before getting result");
                            throw "Select option before getting result";
                        }
                        o[m.option.field] = m.values;
                        return o;
                    });
                };
                if (!options) throw "Options not passed to DynamicFilter constructor!";
                if (!config) throw "Callback not passed to DynamicFilter constructor!";
                // TODO: should be handled properly; constructor has been called when this.splice is executed?
                //if (!config || !options) return;
                if (config.autoApply == null) config.autoApply = true;
                _this2.config = config;
                if (_this2.config.saveState) {
                    _this2.loadState();
                    _this2.config.callback(_this2.getResult());
                }
                return _this2;
            }

            return Filters;
        }(ExtendedArray_1.default);

        exports.Filters = Filters;
        window.DynamicFilter = Filters;
    }, { "./ExtendedArray": 2, "./Filter": 3 }], 5: [function (require, module, exports) {
        arguments[4][1][0].apply(exports, arguments);
    }, { "dup": 1 }] }, {}, [1, 2, 3, 4, 5]);
//# sourceMappingURL=dynamicFilter.js.map
