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

import { Cell, List } from "./cell";

/**
 * Type alias for an element which can be undefined
 */
type Optional<T> = T | undefined;

/**
 * Create a new cons-cell
 *
 * @param value the value of the cell
 * @param next the following cell (or null to signal the end of the list)
 */
export function cons<T>(value: T, next: List<T>): Cell<T> {
    return {
        value: value,
        next: next
    };
}

/**
 * Create a new list from the given array
 *
 * If the array fed into this function is empty undefined is returned
 *
 * @param param0 the array
 */
export function fromArray<T>([head, ...tail]: T[]): List<T> {
    if (head === undefined && tail.length === 0) {
        return undefined;
    }
    return cons(head, fromArray(tail));
}

/**
 * Transforms the given list into an array which holds the values of the list-entries
 *
 * @param list the list
 */
export function toArray<T>(list: List<T>): T[] {
    function toArrayAcc(acc: T[], list: List<T>): T[] {
        if (list === undefined) {
            return acc;
        } else {
            if (list && list.value !== undefined) {
                acc.push(list.value);
            }
            return toArrayAcc(acc, list.next);
        }
    }
    return toArrayAcc([], list);
}

/**
 * Calculate the length of a list
 *
 * @param list
 */
export function len<T>(list: List<T>): number {
    if (list) {
        return 1 + len(list.next);
    }
    return 0;
}

/**
 * Returns a reference to the first element in the list which satisfies the given boolean-predicate
 *
 * @param list the list
 * @param pred the predicate
 */
export function find<T>(list: List<T>, pred: (val: T) => boolean): List<T> {
    if (list) {
        if (pred(list.value)) {
            return list;
        }
        return find(list.next, pred);
    }
    return undefined;
}

/**
 * Return a new list which contains all elements of the given list that satisfy the given predicate
 *
 * @param list the list
 * @param pred the predicate
 */
export function filter<T>(list: List<T>, pred: (val: T) => boolean): List<T> {
    function filterAcc(acc: T[], list: List<T>, pred: (val:T) => boolean): List<T> {
        const elem = find(list, pred);
        if (elem) {
            acc.push(elem.value);
            return filterAcc(acc, elem.next, pred);
        }
        return fromArray(acc);
    }
    return filterAcc([], list, pred);
}

/**
 * Maps all elements of the list using the given mapping function and returns this as a new list
 *
 * @param list the list
 * @param mapFunc the mapping function
 */
export function map<T, U>(list: List<T>, mapFunc: (val: Optional<T>) => U): List<U> {
    if (list === undefined) {
        return undefined;
    }
    return cons(mapFunc(list.value), map(list.next, mapFunc));
}

/**
 * Append list2 to list1 and return the result as a new list
 * @param list1 the first list
 * @param list2 the second list
 */
export function append<T>(list1: List<T>, list2: List<T>): List<T> {
    if (list1) {
        return cons(list1.value, append(list1.next, list2));
    } else if (list2) {
        return cons(list2.value, append(list1, list2.next));
    }
    return undefined;
}

/**
 * Retrieve the n-th element of the list. If index < 0 or index >= list-length undefined is returned.
 * @param list the list
 * @param index the index of the element
 */
export function nth<T>(list: List<T>, index: number): List<T> {
    if (index < 0 || list === undefined) {
        return undefined;
    } else {
        if (index === 0) {
            return list;
        } else {
            return nth(list.next, index - 1);
        }
    }
}