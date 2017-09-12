class Filter {

    values: any[];
    option: Option;
    callback: any;

    constructor(callback: any) {
        this.values = null;
        this.callback = callback;
    }

    private addValue(): void {
        if (!this.canAddValue()) return;
        this.values.push("");
    }

    /**
     * Cannot add value if previous value is not selected yet
     */
    private canAddValue(): boolean {
        if (!this.values) return false;
        let lastValue = this.values[this.values.length - 1];
        return lastValue != "" && !this.isText();
    }

    private onSelect(option: Option): void {
        this.option = option;
        this.values = [""];
    }

    private isAutocomplete(): boolean {
        return OptionType[this.option.type] == OptionType.AUTOCOMPLETE.toString();
    }

    private isOptions(): boolean {
        return OptionType[this.option.type] == OptionType.OPTIONS.toString();
    }

    private isText(): boolean {
        return OptionType[this.option.type] == OptionType.TEXT.toString();
    }

    private getValues(options: Option[]): string[] {
        var field = this.option.field;
        var option = options.filter(function(o) {
            return o.field == field;
        });
        // TODO throw error if no results
        return option[0].options;
    }

}
