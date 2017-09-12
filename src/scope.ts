interface Config {
    saveState: boolean;
}

interface DynamicFilterScope extends ng.IScope {
    filters: Filters;
    options: Option[];
    config: Config;
    addFilter: any;
    removeFilter: any;
    isFilterSelected: any;
    isValueSelected: any;
    apply: any;
    onSelect: any;
}
