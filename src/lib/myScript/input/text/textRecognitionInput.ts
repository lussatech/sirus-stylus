import { AbstractRecognitionInput } from '../generic/abstractRecognitionInput';
import { TextParameter } from './textParameter';
import { TextInputUnit } from './textInputUnit';
import { TextInkRange } from '../../output/text/textInkRange';

/**
 * Recognition input object for text recognition
 * 
 * @export
 * @class TextRecognitionInput
 * @extends {AbstractRecognitionInput}
 */
export class TextRecognitionInput extends AbstractRecognitionInput {
	textParameter: TextParameter;
	inputUnits: Array<TextInputUnit>;

	/**
	 * Creates an instance of TextRecognitionInput.
	 * 
	 * @memberof TextRecognitionInput
	 */
	constructor() {
		super();
	}

	/**
 * Get parameters
 *
 * @method getParameters
 * @returns {TextParameter}
 */
	getParameters(): TextParameter {
		return this.textParameter;
	};

	/**
	 * Set parameters
	 *
	 * @method setParameters
	 * @param {TextParameter} parameters
	 */
	setParameters(parameters: TextParameter) {
		this.textParameter = parameters;
	};

	/**
	 * Get input units
	 *
	 * @method getInputUnits
	 * @param {TextInkRange} [inkRange]
	 * @returns {TextInputUnit[]}
	 */
	getInputUnits(inkRange?: TextInkRange): Array<TextInputUnit> {
		if (inkRange && (inkRange instanceof TextInkRange)) {
			return this.inputUnits.slice(inkRange.getStartUnit(), inkRange.getEndUnit() + 1);
		}
		return this.inputUnits;
	};

	/**
	 * Set input units
	 *
	 * @method setInputUnits
	 * @param {TextInputUnit[]} inputUnits
	 */
	setInputUnits(inputUnits: Array<TextInputUnit>) {
		this.inputUnits = inputUnits;
	};
}