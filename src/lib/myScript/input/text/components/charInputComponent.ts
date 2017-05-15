import { AbstractTextInputComponent } from './abstractTextInputComponent';
import { Rectangle } from '../../../common/generic/rectangle';

/**
 * String input component
 * 
 * @export
 * @class CharInputComponent
 * @extends {AbstractTextInputComponent}
 */
export class CharInputComponent extends AbstractTextInputComponent {
	character: string;

	/**
	 * Creates an instance of CharInputComponent.
	 * @param {{ character?: string, boundingBox?: Rectangle }} [obj] 
	 * 
	 * @memberof CharInputComponent
	 */
	constructor(obj?: { character?: string, boundingBox?: Rectangle }) {
		super(obj);
		this.type = 'char';
		this.character = obj && obj.character || '';
	}

	/**
	 * Get label
	 *
	 * @method getLabel
	 * @returns {String}
	 */
	getLabel(): string {
		return this.character;
	};

	/**
	 * Set label
	 *
	 * @method setLabel
	 * @param {String} label
	 */
	setLabel(label: string) {
		this.character = label;
	};

}