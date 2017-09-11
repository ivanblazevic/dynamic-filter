class Value {

    value: string;
    skipApply: boolean;
    callback: any;

    constructor(callback: any) {
        this.callback = callback;
        this.value = null;
        this.skipApply = false;
    }

    private onSelect(value: string) {
        this.value = value;
        if (!this.skipApply) this.callback();
    }

}
