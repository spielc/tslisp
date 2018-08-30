/**
 * Type for a generic, immutable Cons-cell
 */
export type Cell<T> = {
    readonly value: T | undefined;
    readonly next: Cell<T> | undefined;
};

/**
 * Alias for a nullable cons-cell (necessary to be able to distinguish the end of a list)
 */
export type List<T> = Cell<T> | undefined;