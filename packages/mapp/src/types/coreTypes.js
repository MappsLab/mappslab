// @flow
/* eslint-disable no-use-before-define */

import type { MapsEventListener } from './mapTypes'

/**
 * Core Types
 */

export type MVCObject = {
	/**
		 * The MVCObject constructor is guaranteed to be an empty function, and so you may inherit from MVCObject
		 * by simply writing MySubclass.prototype = new google.maps.MVCObject();. Unless otherwise noted,
		this is not true of other classes in the API, and inheriting from other classes in the API is not supported.
		*/
	// constructor(): this,

	/**
	 * Adds the given listener function to the given event name. Returns an identifier for this listener
	 * that can be used with google.maps.event.removeListener.
	 */
	addListener(eventName: string, handler: (...args: any[]) => void): MapsEventListener,

	/**
	 * Binds a View to a Model.
	 */
	bindTo(key: string, target: MVCObject, targetKey?: string, noNotify?: boolean): void,
	changed(key: string): void,

	/**
	 * Gets a value.
	 */
	get(key: string): any,

	/**
	 * Notify all observers of a change on this property. This notifies both objects that are bound
	 * to the object's property as well as the object that it is bound to.
	 */
	notify(key: string): void,

	/**
	 * Sets a value.
	 */
	set(key: string, value: any): void,

	/**
	 * Sets a collection of key-value pairs.
	 */
	setValues(values: any): void,

	/**
	 * Removes a binding. Unbinding will set the unbound property to the current value.
	 * The object will not be notified, as the value has not changed.
	 */
	unbind(key: string): void,

	/**
	 * Removes all bindings.
	 */
	unbindAll(): void,
}

export type MVCArray<T> = MVCObject & {
	/**
	 * A mutable MVC Array.
	 */
	constructor(array?: T[]): void,

	/**
	 * Removes all elements from the array.
	 */
	clear(): void,

	/**
	 * Iterate over each element, calling the provided callback.
	 * The callback is called for each element like: callback(element, index).
	 */
	forEach(callback: (elem: T, i: number) => void): void,

	/**
	 * Returns a reference to the underlying Array.
	 * Warning: if the Array is mutated, no events will be fired by this object.
	 */
	getArray(): T[],

	/**
	 * Returns the element at the specified index.
	 */
	getAt(i: number): T,

	/**
	 * Returns the number of elements in this array.
	 */
	getLength(): number,

	/**
	 * Inserts an element at the specified index.
	 */
	insertAt(i: number, elem: T): void,

	/**
	 * Removes the last element of the array and returns that element.
	 */
	pop(): T,

	/**
	 * Adds one element to the end of the array and returns the new length of the array.
	 */
	push(elem: T): number,

	/**
	 * Removes an element from the specified index.
	 */
	removeAt(i: number): T,

	/**
	 * Sets an element at the specified index.
	 */
	setAt(i: number, elem: T): void,
}
