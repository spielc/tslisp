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