interface Config {
    id: string; // used when saving data to local storage, set different id if there are multiple filters per page
    saveState: boolean; // save filter state to localStorage, filter will be in same state after page reload
    autoApply: boolean; // execute callback on each filter change
    callback: any; // callback to execute on autoApply or manual, as result returns key-array object
    errorCallback: any; // to handle error messages from controller
}
