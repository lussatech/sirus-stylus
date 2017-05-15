import { AbstractComponent } from './abstractComponent';
import { Rectangle } from '../../../common/generic/rectangle';

export interface CharacterInputComponentAlternateParameters {
	alternate?: string,
	probability?: number
}

export class CharacterInputComponentAlternate extends AbstractComponent {
	alternate: string;
	probability: number;

	constructor(obj?: CharacterInputComponentAlternateParameters) {
		super();
		this.type = 'inputCharacter';
		if (obj && obj.alternate) {
			this.alternate = obj.alternate;
		}
		if (obj && obj.probability) {
			this.probability = obj.probability;
		}
	}

	/**
	 * Get alternate
	 *
	 * @method getAlternate
	 * @returns {String}
	 */
	getAlternate(): string {
		return this.alternate;
	};

	/**
	 * Set alternate
	 *
	 * @method setAlternate
	 * @param {String} alternate
	 */
	setAlternate(alternate: string) {
		this.alternate = alternate;
	};

	/**
	 * Get probability
	 *
	 * @method getProbability
	 * @returns {Number}
	 */
	getProbability(): number {
		return this.probability;
	};

	/**
	 * Set probability
	 *
	 * @method setProbability
	 * @param {Number} probability
	 */
	setProbability(probability: number) {
		this.probability = probability;
	};

	/**
	 * Get input component bounding-box
	 *
	 * @method getBoundingBox
	 * @returns {Rectangle}
	 */
	getBoundingBox(): Rectangle {
		throw new Error('not implemented');
	};

	/**
	 * Set input component bounding-box
	 *
	 * @method setBoundingBox
	 * @param {Rectangle} boundingBox
	 */
	setBoundingBox(boundingBox: Rectangle) {
		throw new Error('not implemented');
	};
}