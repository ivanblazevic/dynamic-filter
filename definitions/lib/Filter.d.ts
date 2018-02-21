import ExtendedArray from "./ExtendedArray";
import { Option } from './Option';
export default class Filter {
    values: ExtendedArray;
    option: Option;
    callback: any;
    filters: any;
    constructor(ref: any);
    addValue: () => void;
    private canAddValue;
    private onSelect;
    isValueSelected: (value: string) => boolean;
    private checkOptionType;
    private isAutocomplete;
    private isOptions;
    private isText;
}
