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
export function find<T>(list: List<T>, pred: (val: Optional<T>) => boolean): List<T> {
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
export function filter<T>(list: List<T>, pred: (val: Optional<T>) => boolean): List<T> {
    function filterAcc(acc: Optional<T>[], list: List<T>, pred: (val: Optional<T>) => boolean): List<T> {
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