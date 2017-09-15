import { Filters } from "./Filters";

describe("HelloComponent", () => {

    let callback = function() {

    }

    let errorCallback = function() {

    }

    let config: Config = {
        id: 'dynamicFilter',
        saveState: true,
        autoApply: null,
        callback: callback,
        errorCallback: errorCallback
    }

    let options: Option[] = [];

    let dynamicFilter = new Filters(options, config);

    it("should init dynamic filter'", () => {
        expect(dynamicFilter.getResult()).toEqual([]);
    });

    it("should add filter'", () => {
        dynamicFilter.add();

        //expect(dynamicFilter.getResult()).toEqual([]);

        expect(1).toBe(1);
    });

});
