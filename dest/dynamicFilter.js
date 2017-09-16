"use strict";

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

        var Filter = function Filter(ref) {
            var _this2 = this;

            _classCallCheck(this, Filter);

            this.addValue = function () {
                if (!_this2.canAddValue()) return;
                _this2.values.push(""); // add empty value so array can be iterated in html
            };
            /**
            * Cannot add new value if previous value does not exist
            * or if type is text, text can only have one value
            */
            this.canAddValue = function () {
                return _this2.values && _this2.values.last() && !_this2.isText();
            };
            this.onSelect = function (option) {
                _this2.values = new ExtendedArray_1.default();
                _this2.option = option;
                _this2.values.push("");
                _this2.filters.setApplyEnabled();
            };
            this.isValueSelected = function (value) {
                return _this2.values.some(function (v) {
                    return v == value;
                });
            };
            this.checkOptionType = function (optionType) {
                if (!_this2.option) return false;
                return _this2.option.type == optionType;
            };
            this.isAutocomplete = function () {
                return _this2.checkOptionType("AUTOCOMPLETE" /* AUTOCOMPLETE */);
            };
            this.isOptions = function () {
                return _this2.checkOptionType("OPTIONS" /* OPTIONS */);
            };
            this.isText = function () {
                return _this2.checkOptionType("TEXT" /* TEXT */);
            };
            this.callback = ref.callback;
            this.filters = ref;
        };

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

                var _this3 = _possibleConstructorReturn(this, (Filters.__proto__ || Object.getPrototypeOf(Filters)).call(this));

                _this3.options = options;
                _this3.config = config;
                _this3.getID = function () {
                    return _this3.config.id || "dynamicFilter";
                };
                _this3.save = function () {
                    // only neccessary stuff will be saved to local storage
                    var filterState = _this3.map(function (m) {
                        return {
                            field: m.option.field,
                            values: m.values
                        };
                    });
                    localStorage.setItem(_this3.getID(), JSON.stringify(filterState));
                };
                /**
                 * @force - boolean: used to override config.autoApply
                 */
                _this3.callback = function (force) {
                    if (!_this3.config) return;
                    if (_this3.config.saveState) _this3.save();
                    if (force || _this3.config.autoApply) _this3.config.callback(_this3.getResult());
                };
                _this3.setApplyEnabled = function () {
                    _this3.applyButton = true;
                };
                _this3.setApplyDisabled = function () {
                    _this3.applyButton = false;
                };
                _this3.isApplyEnabled = function () {
                    return _this3.applyButton;
                };
                _this3.add = function () {
                    // Prevent adding filter if no previous selected
                    var lastFilter = _this3.last();
                    if (lastFilter && !lastFilter.option) return;
                    _this3.setApplyDisabled();
                    _this3.push(new Filter_1.default(_this3));
                };
                _this3.getOptionByField = function (options, field) {
                    var result = options.filter(function (o) {
                        return o.field == field;
                    });
                    if (result.length == 0) throw "Cached option field value " + field + " not found in options array!";
                    return result[0];
                };
                _this3.loadState = function () {
                    var state = JSON.parse(localStorage.getItem(_this3.getID()));
                    if (!state) return;
                    var self = _this3;
                    state.forEach(function (s) {
                        if (!s.values) return;
                        self.add();
                        var lastAddedFilter = self.last();
                        var option = self.getOptionByField(self.options, s.field);
                        lastAddedFilter.onSelect(option);
                        // add values
                        s.values.forEach(function (v) {
                            lastAddedFilter.addValue();
                            lastAddedFilter.values[lastAddedFilter.values.length - 1] = v;
                        });
                    });
                };
                _this3.removeLast = function () {
                    _this3.removeLastItem();
                    _this3.callback();
                    if (_this3.length == 0) _this3.applyButton = false;
                };
                _this3.isFilterSelected = function (option) {
                    return _this3.some(function (f) {
                        return f.option && f.option.field == option.field;
                    });
                };
                _this3.getResult = function () {
                    var self = _this3;
                    var result = _this3.map(function (m) {
                        var o = {};
                        if (!m.option) {
                            if (self.config.errorCallback) self.config.errorCallback({ code: 2, message: "Select option before getting result" });
                            return;
                        }
                        // mapping to loose all functions and other unnesesasrry properties
                        o[m.option.field] = m.values.map(function (m) {
                            return m;
                        });
                        return o;
                    });
                    // with map there will always at least one result
                    return result[0];
                };
                if (!options) throw "Options not passed to DynamicFilter constructor!";
                if (!config) throw "Callback not passed to DynamicFilter constructor!";
                // TODO: should be handled properly; constructor has been called when this.splice is executed?
                //if (!config || !options) return;
                if (config.autoApply == null) config.autoApply = true;
                _this3.config = config;
                if (_this3.config.saveState) {
                    _this3.loadState();
                    _this3.config.callback(_this3.getResult());
                }
                return _this3;
            }

            return Filters;
        }(ExtendedArray_1.default);

        exports.Filters = Filters;
        window.DynamicFilter = Filters;
    }, { "./ExtendedArray": 2, "./Filter": 3 }], 5: [function (require, module, exports) {
        arguments[4][1][0].apply(exports, arguments);
    }, { "dup": 1 }] }, {}, [1, 2, 3, 4, 5]);
//# sourceMappingURL=dynamicFilter.js.map
