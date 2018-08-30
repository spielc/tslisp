import { Cell } from "../src/tslisp";

describe("create cell", () => {
    it("should create single cell", () => {
        const cell: Cell<number> = {
            value: 0,
            next: undefined
        };
        expect(cell.value).toBe(0);
        expect(cell.next).toBeUndefined();
    });
    it("should create multiple cells", () => {
        const cell: Cell<number> = {
            value: 0,
            next: {
                value: 1,
                next: undefined
            }
        };
        expect(cell.next!.value).toBe(1);
        expect(cell.next!.next).toBeUndefined();
    });
});