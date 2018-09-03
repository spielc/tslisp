/**
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version. This program is distributed in the hope that it will be
 * useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
 * Public License for more details. You should have received a copy of the GNU
 * Lesser General Public License along with this program. If not, see
 * <http://www.gnu.org/licenses/>
 */

import { cons, fromArray, List, toArray, len, find, filter, map, append, nth } from "../src/tslisp";

function checkList(maxValue: number, list: List<number>): void {
    let curVal = 0;
    while (list!.next !== undefined) {
        expect(list!.value).toBe(curVal++);
        list = list!.next;
    }
    if (list !== undefined) {
        expect(list.value).toBe(maxValue);
    }
}

describe("cons test", () => {
    it("should create single cell", () => {
        const cell = cons(0, undefined);
        checkList(0, cell);
    });
    it("should create multiple cells", () => {
        const list = cons(0, cons(1, cons(2, undefined)));
        checkList(2, list);
    });
});

describe("fromArray test", () => {
    it("from empty array", () => {
        const list = fromArray([]);
        expect(list).toBeUndefined();
    });
    it("from regular array", () => {
        const list = fromArray([0, 1, 2]);
        checkList(2, list);
    });
    it("from array containing null", () => {
        // tslint:disable-next-line
        const list = fromArray([null]);
        expect(list).not.toBeUndefined();
        if (list) {
            expect(list.value).toBeNull();
            expect(list.next).toBeUndefined();
        }
    });
});

describe("toArray test", () => {
    it("from empty array", () => {
        const orig: any[] = [];
        const list = fromArray(orig);
        const other = toArray(list);
        expect(other).toEqual(orig);
    });
    it("from regular array", () => {
        const orig = [0, 1, 2];
        const list = fromArray(orig);
        const other = toArray(list);
        expect(other).toEqual(orig);
    });
});

describe("len test", () => {
    it("from empty list", () => {
        expect(len(fromArray([]))).toBe(0);
    });
    it("from regular array", () => {
        expect(len(fromArray([0, 1, 2]))).toBe(3);
    });
    it("from array containing null", () => {
        // tslint:disable-next-line
        expect(len(fromArray([null]))).toBe(1);
    });
});

describe("find test", () => {
    it("in empty list", () => {
        const elem = find(fromArray([]), (elem) => elem !== null);
        expect(elem).toBeUndefined();
    });
    it("from regular array", () => {
        const elem = find(fromArray([0, 1, 2]), (elem) => ((elem !== undefined) && (elem % 2 === 1)));
        expect(elem).not.toBeUndefined();
        expect(elem!.value).toBe(1);
    });
    it("from array containing null", () => {
        // tslint:disable-next-line
        const elem = find(fromArray([null]), (elem) => elem === null);
        expect(elem).not.toBeUndefined();
        expect(elem!.value).toBeNull();
    });
});

describe("filter test", () => {
    it("in empty list", () => {
        const filtered = filter(fromArray([]), (elem) => elem === null);
        expect(filtered).toBeUndefined();
    });
    it("from regular array", () => {
        const filtered = filter(fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), (elem) => ((elem !== undefined) && (elem % 2 === 1)));
        expect(filtered).not.toBeUndefined();
        expect(filtered!.value).toBe(1);
        expect(filtered!.next!.value).toBe(3);
        expect(len(filtered)).toBe(5);
    });
    it("from array containing null", () => {
        // tslint:disable-next-line
        const filtered = filter(fromArray([null]), (elem) => elem === null);
        expect(filtered).not.toBeUndefined();
        expect(filtered!.value).toBeNull();
        expect(len(filtered)).toBe(1);
    });
});

describe("map test", () => {
    it("empty array", () => {
        const mapped = map(fromArray([]), (val) => val);
        expect(mapped).toBeUndefined();
    });
    it("from regular array", () => {
        const mapped = map(fromArray([1, 2, 3]), (val) => {
            if (val !== undefined) {
                return 2 * val;
            } else {
                return 0;
            }
        });
        let blub = mapped;
        let sum = 0;
        while (blub !== undefined) {
            sum += (blub.value) ? blub.value : 0;
            blub = blub.next;
        }
        expect(sum).toBe(12);
    });
    it("from regular array with null-value", () => {
        // tslint:disable-next-line
        const mapped = map(fromArray([1, 2, null, 3]), (val) => {
            if (val !== undefined && val !== null) {
                return 2 * val;
            } else {
                return 0;
            }
        });
        let tmp = mapped;
        let sum = 0;
        while (tmp !== undefined) {
            sum += (tmp.value) ? tmp.value : 0;
            tmp = tmp.next;
        }
        expect(sum).toBe(12);
    });
    it("from regular array with more complex type", () => {
        type Person = {
            name: string;
            age: number;
        };
        const persons: Person[] = [
            {
                name: "Jane Doe",
                age: 56
            },
            {
                name: "John Doe",
                age: 34
            }
        ];
        const ages = map(fromArray(persons), (person) => (person) ? person.age : 0);
        let it = ages;
        let sum = 0;
        let count = 0;
        while (it !== undefined) {
            sum += (it.value) ? it.value : 0;
            it = it.next;
            count++;
        }
        const avg = (count > 0) ? sum / count : 0;
        expect(avg).toBe(45);
    });
});

describe("append test", () => {
    it("append empty list to empty list", () => {
        const res = append(fromArray([]), fromArray([]));
        expect(res).toBeUndefined();
    });
    it("append empty list to regular list", () => {
        const res = append(fromArray([0, 1, 2]), fromArray([]));
        checkList(2, res);
        expect(len(res)).toBe(3);
    });
    it("append regular list to empty list", () => {
        const res = append(fromArray([]), fromArray([0, 1, 2]));
        checkList(2, res);
        expect(len(res)).toBe(3);
    });
    it("append regular list to empty list", () => {
        const res = append(fromArray([0, 1, 2]), fromArray([0, 1, 2]));
        expect(len(res)).toBe(6);
    });
    it("check immutability", () => {
        const list1 = fromArray([0, 1, 2]);
        const list2 = fromArray([0, 1, 2]);
        const res = append(list1, list2);
        const filtered = filter(list1, (val) => val === 0);
        expect(len(filtered)).toBe(1);
        expect(len(list1)).toBe(3);
        expect(len(list2)).toBe(3);
    });
});

describe("nth test", () => {
    it("empty list and negative index", () => {
        expect(nth(fromArray([]), -1)).toBeUndefined();
    });
    it("empty list and zero index", () => {
        expect(nth(fromArray([]), 0)).toBeUndefined();
    });
    it("empty list and positive index", () => {
        expect(nth(fromArray([]), 3)).toBeUndefined();
    });
    it("non-empty list and negative index", () => {
        expect(nth(fromArray([0, 1, 2]), -1)).toBeUndefined();
    });
    it("non-empty list and zero index", () => {
        const res = nth(fromArray([0, 1, 2]), 0);
        expect(res).not.toBeUndefined();
        expect(res!.value).toBe(0);
    });
    it("non-empty list and valid index", () => {
        const res = nth(fromArray([0, 1, 2]), 1);
        expect(res).not.toBeUndefined();
        expect(res!.value).toBe(1);
    });
    it("non-empty list and out-of-bounds index", () => {
        expect(nth(fromArray([0, 1, 2]), 10)).toBeUndefined();
    });
});
