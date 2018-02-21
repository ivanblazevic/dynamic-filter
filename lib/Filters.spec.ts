import { FilterState } from "./Filters";
import { Filters, Config, Option, OptionType } from "..";

describe("Filters", () => {

    let callback = function() {

    }

    let errorCallback = function() {

    }

    let config: Config = {
        id: 'dynamicFilter',
        saveState: false,
        autoApply: false,
        callback: callback,
        errorCallback: errorCallback
    }

    let options: Option[] = [
        {
            type: OptionType.OPTIONS,
            label: 'test label',
            field: 'test_field',
            options: ["test1", "test2"]
        },
        {
            type: OptionType.AUTOCOMPLETE,
            label: 'test autocmplete',
            field: 'test_autocomplete',
            options: ["test_autocomplete1"]
        }
    ];

    let dynamicFilter = new Filters(options, config);

    it("should init dynamic filter'", () => {
        localStorage.setItem("dynamicFilter", null);
        expect(dynamicFilter.getResult()).toEqual({});
    });

    it("should call error callback if apply button is pressed and option is not selected yet'", () => {
        dynamicFilter.add();
        var onSomethingHappenedSpy = spyOn(dynamicFilter.config, "errorCallback");
        dynamicFilter.callback(true);
        expect(dynamicFilter.config.errorCallback).toHaveBeenCalledWith({ code: 2, message: "Select option before getting result" });
    });

    it("after option is selected isApplyEnabled should return true", () => {
        let selectedOption = options[0];
        dynamicFilter[0].onSelect(selectedOption);
        expect(dynamicFilter.isApplyEnabled()).toBeTruthy();
        let result = dynamicFilter.getResult();
        expect(result).toEqual({"test_field":['']});
    });

    it("should check if first option is selected", () => {
        let selectedOption = options[0];
        expect(dynamicFilter.isFilterSelected(selectedOption)).toBeTruthy();
    });

    it("should selected value for first option", () => {
        dynamicFilter[0].values[0] = ["test1"];
        expect(dynamicFilter[0].canAddValue()).toBeTruthy();
        expect(dynamicFilter[0].isOptions()).toBeTruthy();
        expect(dynamicFilter[0].isValueSelected("test1")).toBeTruthy();
    });

    it("should add second value", () => {
        dynamicFilter[0].addValue();
        expect(dynamicFilter[0].values.length).toBe(2);
    });

    it("should select autocomplete option and first value", () => {
        dynamicFilter.add();
        let selectedOption = options[1];
        dynamicFilter[1].onSelect(selectedOption);
        expect(dynamicFilter.length).toBe(2);
        expect(dynamicFilter[1].isAutocomplete()).toBeTruthy();
    });

    it("should remove last filter selected", () => {
        dynamicFilter.removeLast()
        expect(dynamicFilter.length).toBe(1);
    });

    it("should check if lastState works properly", () => {

        let filterState: FilterState[] = [
            {
                field: 'test_field',
                values: ["test1"]
            }
        ]

        localStorage.setItem("dynamicFilter", JSON.stringify(filterState));

        config.saveState = true;
        let dynamicFilterSaveState = new Filters(options, config);

        expect(dynamicFilterSaveState.length).toBe(1);
        expect(dynamicFilterSaveState[0].option).toBe(options[0]);
    });

    it("should check if saveState works properly", () => {
        config.saveState = true;
        let dynamicFilterSaveState = new Filters(options, config);

        dynamicFilterSaveState.add();
        let selectedOption = options[1];
        dynamicFilterSaveState[1].onSelect(selectedOption);
        dynamicFilterSaveState[1].values[0] = "testX";
        dynamicFilterSaveState.callback();

        var state = JSON.parse(localStorage.getItem("dynamicFilter"));

        expect(state.length).toBe(2);
        expect(state[1]).toEqual({field:'test_autocomplete', values:["testX"]});
    });

});
