declare const enum OptionType {
    TEXT = 'TEXT',
    AUTOCOMPLETE = 'AUTOCOMPLETE',
    OPTIONS = 'OPTIONS'
}

 interface Option {
    label: string;
    field: string;
    type: OptionType;
    options: string[];
    params: any[];
}
