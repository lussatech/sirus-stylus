import { AbstractComponent } from '../generic/components/abstractComponent';
import { TextInkRange } from '../../output/text/textInkRange';

/**
 * Input unit used for text recognition
 * 
 * @export
 * @class TextInputUnit
 */
export class TextInputUnit {
	textInputType: string = 'MULTI_LINE_TEXT';
	components: AbstractComponent[] = [];

	constructor() { }

	/**
	* Get the input type
	*
	* @method getInputType
	* @returns {String}
	*/
	getInputType(): string {
		return this.textInputType;
	};

	/**
	 * Set the input type
	 *
	 * @method setInputType
	 * @returns {String} inputType
	 */
	setInputType(inputType: string) {
		this.textInputType = inputType;
	};

	/**
	 * Get components for this input unit
	 *
	 * @method getComponents
	 * @param {TextInkRange} [inkRange]
	 * @returns {AbstractComponent[]}
	 */
	getComponents(inkRange?: TextInkRange): AbstractComponent[] {
		if (inkRange && (inkRange instanceof TextInkRange)) {
			return this.components.slice(inkRange.getStartComponent(), inkRange.getEndComponent() + 1);
		}
		return this.components;
	};

	/**
	 * Set components for this input unit
	 *
	 * @method setComponents
	 * @param {AbstractComponent[]} components
	 */
	setComponents(components: AbstractComponent[]) {
		this.components = components;
	};
}