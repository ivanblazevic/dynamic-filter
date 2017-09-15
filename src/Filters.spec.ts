
import { Filters } from "./Filters";

describe("HelloComponent", () => {

    let callback = function() {

    }

    let config: Config = {
        id: 'dynamicFilter',
        saveState: true,
        autoApply: false,
        callback: callback
    }

    let dynamicFilter = new Filters(null, null);

    it("should init dynamic filter'", () => {
        expect(dynamicFilter.getResult()).toEqual([]);
    });

    it("should add filter'", () => {
        dynamicFilter.add();

    
        expect(dynamicFilter.getResult()).toEqual([]);
    });

});
