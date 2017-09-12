class Value {

    value: string;
    skipApply: boolean;
    callback: any;

    constructor(callback: any) {
        this.callback = callback;
        this.value = null;
        this.skipApply = false;
    }

    public onSelect(value: string): void {
        this.value = value;
        if (!this.skipApply) this.callback();
    }

}
