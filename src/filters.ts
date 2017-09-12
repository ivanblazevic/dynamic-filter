class Filters extends Array {

    callback: any;

    constructor(callback: any) {
        super();
        this.callback = callback;
    }

    public add(): void {
        // Prevent adding filter if no previous selected
        let lastFilter = this[this.length - 1];
        if (lastFilter && !lastFilter.option) return;
        this.push(new Filter(this.callback));
    }

    public loadState(options: Option[]): void {
        var state = JSON.parse(localStorage.getItem('dynamicFilter'));
        var self = this;

        if (!state) return;

        state.forEach(function (s) {
            let searchOption = options.filter(function(o) {
                return o.field == s.option.field;
            });
            if (searchOption.length == 0) throw("Saved state value not found in options array!");
            self.add();
            self[self.length-1].onSelect(searchOption[0]);
            // add values
            if (s.values) {
                s.values.forEach(function(v) {
                    self[self.length-1].addValue();
                    self[self.length-1].values[self[self.length-1].values.length-1] = v;
                });
            }
        });
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
        localStorage.setItem('dynamicFilter', JSON.stringify(this));
        return this.map(function(m) {
            var o = {};
            o[m.option.field] = m.values.map(function(v) { return v });
            return o;
        });
    }

}
