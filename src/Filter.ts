import ExtendedArray from "./ExtendedArray";

export default class Filter {

    values: ExtendedArray;
    option: Option;
    callback: any;

    constructor(callback: any) {
        this.values = new ExtendedArray();
        this.callback = callback;
    }

    private addValue(): void {
        if (!this.canAddValue()) return;
        this.values.push(""); // add empty value so array can be iterated in html
    }

    /**
    * Cannot add new value if previous value does not exist
    * or if type is text, text can only have one value
    */
    private canAddValue(): boolean {
        return this.values.last() && !this.isText();
    }

    private onSelect(option: Option): void {
        this.option = option;
        this.values.push("");
    }

    private checkOptionType(optionType: OptionType): boolean {
        if (!this.option) return false;
        return this.option.type == optionType;
    }

    private isAutocomplete(): boolean {
        return this.checkOptionType(OptionType.AUTOCOMPLETE);
    }

    private isOptions(): boolean {
        return this.checkOptionType(OptionType.OPTIONS);
    }

    private isText(): boolean {
        return this.checkOptionType(OptionType.TEXT);
    }

}
