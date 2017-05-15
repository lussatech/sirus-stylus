import { AbstractRecognitionData } from '../generic/abstractRecognitionData';
import { TextRecognitionInput } from './textRecognitionInput';

/**
 * Recognition data for text input
 * 
 * @export
 * @class TextRecognitionData
 * @extends {AbstractRecognitionData}
 */
export class TextRecognitionData extends AbstractRecognitionData {
	textInput: TextRecognitionInput;

	/**
	 * Creates an instance of TextRecognitionData.
	 * 
	 * @memberof TextRecognitionData
	 */
	constructor() {
		super();
	}

	/**
	 * Get text input
	 *
	 * @method getRecognitionInput
	 * @returns {TextRecognitionInput} input
	 */
	getRecognitionInput(): TextRecognitionInput {
		return this.textInput;
	};

	/**
	 * Set text input
	 *
	 * @method setRecognitionInput
	 * @param {TextRecognitionInput} input
	 */
	setRecognitionInput(input: TextRecognitionInput) {
		this.textInput = input;
	};
}