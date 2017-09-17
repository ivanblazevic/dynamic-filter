[![Build Status](https://travis-ci.org/ivanblazevic/dynamic-filter.svg?branch=master)](https://travis-ci.org/ivanblazevic/dynamic-filter) [![Coverage Status](https://coveralls.io/repos/github/ivanblazevic/dynamic-filter/badge.svg?branch=master)](https://coveralls.io/github/ivanblazevic/dynamic-filter?branch=master) [![devDependencies Status](https://david-dm.org/ivanblazevic/dynamic-filter/dev-status.svg)](https://david-dm.org/ivanblazevic/dynamic-filter?type=dev) [![Bower version](https://badge.fury.io/bo/dynamic-filter.svg)](https://badge.fury.io/bo/dynamic-filter) [![npm version](https://badge.fury.io/js/dynamic-filter.svg)](https://badge.fury.io/js/dynamic-filter)

# Dynamic Filter

Dynamic filter generates JSON key-array object as a result of user selection. This is generic library which can be implemented in any JS framework.
Checkout examples for major JS frameworks bellow:

### AngularJS EXAMPLE: [Dynamic Filter with AngularJS](https://ivanblazevic.github.io/angular-dynamic-filter/)
### Angular4 EXAMPLE: [Dynamic Filter with Angular4](https://ivanblazevic.github.io/angular-dynamic-filter/)
### ReactJS EXAMPLE: [Dynamic Filter with ReactJS](https://ivanblazevic.github.io/angular-dynamic-filter/)

# Features!

  - Ability to add custom design with custom directive templates
  - Full flexibility based on options configuration
  - Save filter state using browser's local storage
  - Fully created with TypeScript
  - Auto/manual mode for applying filter

# Input Types

  - OPTIONS - Predefined string array to use in select dropdown
  - TEXT - just a regular text input
  - AUTOCOMPLETE - typeahead, pass function for querying backend/frontend. Check  example Autocomplete](https://material.angularjs.org/latest/demo/autocomplete)

You can also:
  - pass errorCallback function if you want to receive errors from filter and handle in controller

# API

### CONFIG

- **id** - string - used when saving data to local storage, set different id if there are multiple filters per page to avoid interference - if not set it defaults to "dynamicFilter"
- **saveState** - boolean - save filter state to localStorage, filter will be in same state after page reload
- **autoApply** - boolean - execute callback on each filter change
- **callback** - function - callback to execute on autoApply or manual, as result returns key-array object
- **errorCallback** - function - receive filter error data as callback, ie. to handle error messages from controller

### OPTION

NOTE: This is example of one option object. DynamicFilter accepts array of this objects for initialization.
Let's see a basic example:

- **type** - enum - OPTIONS/TEXT/AUTOCOMPLETE *(Check input types details)*
- **label** - string - custom label text will be displayed in main option selection
- **field** - string - this will be key of object which is generated as a result *Usually this is table field from backend*
- **options** - string array for selection

Examples for all types:

#### OPTIONS
```
type: "OPTIONS",
label: "Material",
field: "material",
options: $scope.dataSource.map(function(m) { return m.name })
```
#### AUTOCOMPLETE
```
type: "AUTOCOMPLETE",
label: "Material",
field: "material",
params: {
     querySearch: $scope.querySearch
}
```
#### TEXT
```
type: "TEXT",
label: "Material",
field: "material"
```





License
----

The MIT License

Copyright (c) 2017 Ivan Blazevic

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
