class Filter {

    values: XArray;
    option: Option;
    callback: any;

    constructor(callback: any) {
        this.values = new XArray();
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
        return OptionType[this.option.type] == optionType.toString();
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
