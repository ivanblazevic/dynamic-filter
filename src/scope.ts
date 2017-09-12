interface Config {
    saveState: boolean;
}

interface DynamicFilterScope extends ng.IScope {
    filters: Filters;
    options: Option[];
    config: Config;
    apply: any;
    onSelect: any;
}
