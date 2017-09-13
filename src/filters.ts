import ExtendedArray from "./ExtendedArray";
import Filter from "./Filter";

export class Filters extends ExtendedArray {

    callback: any;

    constructor(callback: any) {
        super();
        this.callback = callback;
    }

    public add(): void {
        // Prevent adding filter if no previous selected
        let lastFilter = this.last();
        if (lastFilter && !lastFilter.option) return;
        this.push(new Filter(this.callback));
    }

    private getOptionByField(options: Option[], field: string): Option {
        let result = options.filter(function(o) {
            return o.field == field;
        });

        if (result.length == 0) throw("Saved state value not found in options array!");

        return result[0];
    }

    public loadState(options: Option[]): void {
        var state = JSON.parse(localStorage.getItem('dynamicFilter'));
        if (!state) return;

        var self = this;

        state.forEach(function (s) {
            if (!s.values) return;

            self.add();
            let lastAddedFilter = self.last();
            let option = self.getOptionByField(options, s.option.field);
            lastAddedFilter.onSelect(option);

            // add values
            s.values.forEach(function(v) {
                lastAddedFilter.addValue();
                lastAddedFilter.values[lastAddedFilter.values.length-1] = v;
            });

        });
    }

    public removeLast(): void {
        this.removeLastItem();
        this.callback();
    }

    public isFilterSelected(option): boolean {
        return this.some(function(f) {
            return f.option && f.option.field == option.field;
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
            o[m.option.field] = m.values;
            return o;
        });
    }

}

// add DynamicFilter to window object

declare global {
    interface Window { DynamicFilter: any; }
}

window.DynamicFilter = Filters;