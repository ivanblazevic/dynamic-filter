class Filters extends Array {

    callback: any;

    constructor(callback: any) {
        super();
        this.callback = callback;
    }

    public add(): void {
        // Prevent adding filter if no previous selected
        let lastFilter = this[this.length - 1];
        if (lastFilter && !lastFilter.field) return;
        this.push(new Filter(this.callback));
    }

    public removeLast(): void {
        this.splice(-1, 1);
        this.callback();
    }

    public isFilterSelected(option): boolean {
        return this.some(function(f) {
            return f.field == option.field;
        });
    }

    public isValueSelected(value: string): boolean {
        return this.some(function(f) {
            return f.values && f.values.some && f.values.some(function(v) {
                return v.value == value;
            });
        });
    }

    public getResult(): any {
        return this.map(function(m) {
            var o = {};
            o[m.field] = m.values.map(function(v) { return v.value });
            return o;
        });
    }

}
