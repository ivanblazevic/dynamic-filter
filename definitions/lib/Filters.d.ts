import ExtendedArray from "./ExtendedArray";
import { Option } from "./Option";
import { Config } from "./Config";
export interface FilterState {
    field: string;
    values: string[];
}
export declare class Filters extends ExtendedArray {
    private options;
    config: Config;
    applyButton: any;
    constructor(options: Option[], config: Config);
    private getID;
    private save;
    callback: (force?: boolean) => void;
    private setApplyEnabled;
    private setApplyDisabled;
    isApplyEnabled: () => any;
    add: () => void;
    private getOptionByField;
    loadState: () => void;
    removeLast: () => void;
    isFilterSelected: (option: Option) => boolean;
    getResult: () => any;
}
declare global  {
    interface Window {
        DynamicFilter: any;
    }
}
