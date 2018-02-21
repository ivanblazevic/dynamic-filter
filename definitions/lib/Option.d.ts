import { OptionType } from './OptionType';
export interface Option {
    label: string;
    field: string;
    type: OptionType;
    options?: string[];
}
