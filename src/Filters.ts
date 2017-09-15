import ExtendedArray from "./ExtendedArray";
import Filter from "./Filter";

export class Filters extends ExtendedArray {

    applyButton: any;

    constructor(private options: Option[], private config: Config) {
        super();

        //if (!options) throw ("Options not passed to DynamicFilter constructor!");
        //if (!callback) throw ("Callback not passed to DynamicFilter constructor!");
        // TODO: should be handled properly; constructor has been called when this.splice is executed?
        if (!config || !options) return;

        if (config.autoApply == null) config.autoApply = true;
        this.config = config;

        if (this.config.saveState) {
            this.loadState();
            this.config.callback(this.getResult());
        }
    }

    private getID(): string {
        return this.config.id || "dynamicFilter";
    }

    private saveState(): void {
        // only neccessary stuff will be saved to local storage
        let filterState = this.map(function(m) {
            return {
                option: m.option,
                values: m.values
            }
        });
        localStorage.setItem(this.getID(), JSON.stringify(filterState));
    }

    /**
     * @force - boolean: used to override config.autoApply
     */
    public callback(force?: boolean): void {
        if (!this.config) return;
        if (this.saveState) this.saveState();
        if (force || this.config.autoApply) this.config.callback(this.getResult());
    }

    private setApplyEnabled = () => {
        this.applyButton = true;
    }

    private setApplyDisabled = () => {
        this.applyButton = false;
    }

    public isApplyEnabled = () => {
        return this.applyButton;
    }

    public add = (): void => {
        // Prevent adding filter if no previous selected
        let lastFilter = this.last();
        if (lastFilter && !lastFilter.option) return;
        this.setApplyDisabled();
        this.push(new Filter(this));
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

        state.forEach(function (s: Filter) {
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
        if (this.length == 0) this.applyButton = false;
    }

    public isFilterSelected(option: Option): boolean {
        return this.some(function(f) {
            return f.option && f.option.field == option.field;
        });
    }

    public isValueSelected(value: string): boolean {
        return this.some(function(f) {
            return f.values && f.values.some && f.values.some(function(v: string) {
                return v == value;
            });
        });
    }

    public getResult = (): any => {
        let self = this;
        return this.map(function(m) {
            var o: any = {};
            if (!m.option) {
                if (self.config.errorCallback) self.config.errorCallback("Select option before getting result");
                throw ("Select option before getting result");
            }
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
