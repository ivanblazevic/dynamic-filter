# Dynamic Filter

Dynamic filter generates JSON key-array object as result which later can be used for querying backend.

# Core Features!

  - Add custom design with custom directive templates
  - Full flexibility based on options configuration
  - Save filter state using local store
  - Core is made with TypeScript and has minimal code attached to angular directive - so it can be used with other JS frameworks

# Input Types

  - OPTIONS - Predefined string array to use in select dropdown
  - TEXT - just a regluar text input
  - AUTOCOMPLETE - pass function for quering backend/frontend

You can also:
  - ...

# API
### OPTION CONFIGURATION

Let's see a basic example of option configuration object:

- **type** - enum value
    - OPTIONS - predefined options, used for classic dropdown/select
    - AUTOCOMPLETE - used for typeaheads [Autocomplete](https://material.angularjs.org/latest/demo/autocomplete)
    - TEXT - basic text input
- **label** - custom label text will be displayed in main option selection
- **field** - this will be key of object which is generated as a result
    > Usually this is table field
- **options** - string array for selection
- **params** - (optional) pass array of custom objects here, e.g. in material design example we passed querySearch param which holds reference to querySearch function from controller. This param is later used in autocomplete dropdown, check here for more details: [Dynamic Filter with Angular Material](https://material.angularjs.org/latest/demo/autocomplete)


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
