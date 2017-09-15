import { Filters } from "./Filters";

describe("Filters", () => {

    let callback = function() {

    }

    let errorCallback = function() {

    }

    let config: Config = {
        id: 'dynamicFilter',
        saveState: true,
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
        }
    ];

    let dynamicFilter = new Filters(options, config);

    it("should init dynamic filter'", () => {
        expect(dynamicFilter.getResult()).toEqual(undefined);
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


});
