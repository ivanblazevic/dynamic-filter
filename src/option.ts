enum OptionType {
    TEXT,
    AUTOCOMPLETE,
    OPTIONS
}

interface Option {
    label: string;
    field: string;
    type: OptionType;
    options: string[];
    params: any[];
}
