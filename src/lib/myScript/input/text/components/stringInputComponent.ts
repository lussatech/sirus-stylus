import { AbstractTextInputComponent } from './abstractTextInputComponent';
import { Rectangle } from '../../../common/generic/rectangle';

/**
 * String input component
 * 
 * @export
 * @class StringInputComponent
 * @extends {AbstractTextInputComponent}
 */
export class StringInputComponent extends AbstractTextInputComponent {
	string: string;

	/**
	 * Creates an instance of StringInputComponent.
	 * @param {{ string?: string, boundingBox?: Rectangle }} [obj] 
	 * 
	 * @memberof StringInputComponent
	 */
	constructor(obj?: { string?: string, boundingBox?: Rectangle }) {
		super(obj);
		this.type = 'string';
		this.string = obj && obj.string || '';
	}

	/**
	 * Get label
	 *
	 * @method getLabel
	 * @returns {String}
	 */
	getLabel(): string {
		return this.string;
	};

	/**
	 * Set label
	 *
	 * @method setLabel
	 * @param {String} label
	 */
	setLabel(label: string) {
		this.string = label;
	};

}