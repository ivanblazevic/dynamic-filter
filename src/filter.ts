class Filter {

    field: string;
    values: any[];
    callback: any;

    constructor(callback: any) {
        this.field = null;
        this.values = null;
        this.callback = callback;
    }

    private addValue() {
        if (!this.canAddValue()) return;
        this.values.push(new Value(this.callback));
    }

    /**
     * Cannot add value if previous value is not selected yet
     */
    private canAddValue() {
        if (!this.values) return false;
        let lastValue = this.values[this.values.length - 1];
        return lastValue.value != null;
    }

    private onSelect(option) {
        this.field = option.field;
        this.values = [new Value(this.callback)];
    }

    private getOptions(options: any[]) {
        var field = this.field;
        var option = options.filter(function(o) {
            return o.field == field;
        });
        // TODO throw error if no results
        return option[0].options;
    }

}
