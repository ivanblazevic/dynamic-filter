import ExtendedArray from "./ExtendedArray";
import Filter from "./Filter";

export class Filters extends ExtendedArray {

    options: Option[];
    config: Config;
    applyButton: any;

    constructor(options: Option[], config: Config) {
        super();

        //if (!options) throw ("Options not passed to DynamicFilter constructor!");
        //if (!callback) throw ("Callback not passed to DynamicFilter constructor!");
        // TODO: should be handled properly; constructor has been called when this.splice is executed?
        if (!config || !options) return;

        this.options = options;
        this.config = config;
        // this is passed as object because primitve does not hold reference
        this.applyButton = { enabled: false };
    }

    private getID(): string {
        return this.config.id || "dynamicFilter";
    }

    /**
     * @force - boolean: used to override config.autoApply
     */
    public callback(force?: boolean): void {
        if (!this.config) return;
        if (this.config.autoApply) {
            localStorage.setItem(this.getID(), JSON.stringify(this));
        }
        if (!force || this.config.autoApply) this.config.callback(this.getResult());
    }

    private setApplyEnabled() {
        this.applyButton.enabled = true;
    }

    private setApplyDisabled() {
        this.applyButton.enabled = false;
    }

    public isApplyEnabled() {
        return this.applyButton.enabled;
    }

    public add(): void {
        // Prevent adding filter if no previous selected
        let lastFilter = this.last();
        if (lastFilter && !lastFilter.option) return;
        this.setApplyDisabled();
        this.push(new Filter(this.callback, this.applyButton));
    }

    private getOptionByField(options: Option[], field: string): Option {
        let result = options.filter(function(o) {
            return o.field == field;
        });

        if (result.length == 0) throw("Cached option field value " + field + " not found in options array!");

        return result[0];
    }

    public loadState(): void {
        var state = JSON.parse(localStorage.getItem(this.getID()));
        if (!state) return;

        var self = this;

        state.forEach(function (s) {
            if (!s.values) return;

            self.add();
            let lastAddedFilter = self.last();
            let option = self.getOptionByField(self.options, s.option.field);
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
        if (this.length == 0) this.applyButton.enabled = false;
    }

    public isFilterSelected(option): boolean {
        return this.some(function(f) {
            return f.option && f.option.field == option.field;
        });
    }

    public isValueSelected(value: string): boolean {
        return this.some(function(f) {
            return f.values && f.values.some && f.values.some(function(v) {
                return v == value;
            });
        });
    }

    private getResult(): any {
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

// for npmJS
declare var module: any;
(module).exports = Filters;
