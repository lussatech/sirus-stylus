import { AbstractComponent } from './abstractComponent';
import { CharacterInputComponentAlternate } from './characterInputComponentAlternate'
import { Rectangle } from '../../../common/generic/rectangle';

/**
 * CharacterInputComponentParameters
 * 
 * @export
 * @interface CharacterInputComponentParameters
 */
export interface CharacterInputComponentParameters {
	alternates?: Array<CharacterInputComponentAlternate>,
	boundingBox?: Rectangle
}

/**
 * Char input component
 * 
 * @export
 * @class CharacterInputComponent
 * @extends {AbstractComponent}
 */
export class CharacterInputComponent extends AbstractComponent {
	alternates: Array<CharacterInputComponentAlternate>;
	boundingBox: Rectangle;

	constructor(obj?: CharacterInputComponentParameters) {
		super();
		this.type = 'inputCharacter';
		if (obj && obj.alternates) {
			this.alternates = obj.alternates.map(
				alternate => new CharacterInputComponentAlternate(alternate));
		}
		if (obj && obj.boundingBox) {
			this.boundingBox = new Rectangle(obj.boundingBox);
		}
	}

	/**
	 * Get character input alternates
	 *
	 * @method getAlternates
	 * @returns {CharacterInputComponentAlternate[]}
	 */
	getAlternates(): Array<CharacterInputComponentAlternate> {
		return this.alternates;
	};

	/**
	 * Set character input alternates
	 *
	 * @method setAlternates
	 * @param {CharacterInputComponentAlternate[]} alternates
	 */
	setAlternates(alternates: Array<CharacterInputComponentAlternate>) {
		this.alternates = alternates;
	};

	/**
	 * Add a character input alternate
	 *
	 * @method addAlternate
	 * @param {CharacterInputComponentAlternate} alternate
	 */
	addAlternate(alternate: CharacterInputComponentAlternate) {
		this.alternates.push(alternate);
	};

	/**
	 * Get input component bounding-box
	 *
	 * @method getBoundingBox
	 * @returns {Rectangle}
	 */
	getBoundingBox(): Rectangle {
		return this.boundingBox;
	};

	/**
	 * Set input component bounding-box
	 *
	 * @method setBoundingBox
	 * @param {Rectangle} boundingBox
	 */
	setBoundingBox(boundingBox: Rectangle) {
		this.boundingBox = boundingBox;
	};
}