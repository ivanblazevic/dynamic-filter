class Filter {

    type: OptionType;
    field: string;
    values: any[];
    options: any[];
    params: any[];
    callback: any;

    constructor(callback: any) {
        this.field = null;
        this.values = null;
        this.callback = callback;
    }

    private addValue(): void {
        if (!this.canAddValue()) return;
        this.values.push(new Value(this.callback));
    }

    /**
     * Cannot add value if previous value is not selected yet
     */
    private canAddValue(): boolean {
        if (!this.values) return false;
        let lastValue = this.values[this.values.length - 1];
        return lastValue.value != null && OptionType[this.type] != OptionType.TEXT.toString();
    }

    private onSelect(option: Option): void {
        this.field = option.field;
        this.type = option.type;
        this.options = option.options;
        this.params = option.params;
        this.values = [new Value(this.callback)];
    }

    private getValues(options: Option[]): string[] {
        var field = this.field;
        var option = options.filter(function(o) {
            return o.field == field;
        });
        // TODO throw error if no results
        return option[0].options;
    }

}
