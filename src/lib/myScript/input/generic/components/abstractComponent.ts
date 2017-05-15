import { Rectangle } from '../../../common/generic/rectangle';

/**
 * Represent an abstract input component
 * 
 * @abstract
 * @class AbstractComponent
 */
export abstract class AbstractComponent {
	type: string;
	boundingBox: Rectangle;
	scratchedStroke: boolean;

	constructor() { }
	/**
	 * Get the type of the input component
	 *
	 * @method getType
	 * @returns {String}
	 */
	getType(): string {
		return this.type;
	};

	/**
	 * Set the type of the input component
	 *
	 * @method setType
	 * @param {String} type
	 */
	setType(type: string) {
		this.type = type;
	};

	/**
	 * Get input component bounding-box
	 *
	 * @method getBoundingBox
	 * @returns {Rectangle}
	 */
	abstract getBoundingBox(): Rectangle;

	/**
	 * Set input component bounding-box
	 *
	 * @method setBoundingBox
	 * @param {Rectangle} boundingBox
	 */
	abstract setBoundingBox(boundingBox: Rectangle);
}