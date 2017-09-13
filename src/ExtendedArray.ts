export default class AXArray extends Array {

    last(): any {
        return this[this.length - 1];
    }
    
    removeLastItem(): void {
        this.splice(-1, 1);
    }

}
