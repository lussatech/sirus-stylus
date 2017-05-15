import { AbstractRecognitionData } from './abstractRecognitionData';
import { AbstractRecognitionInput } from './abstractRecognitionInput';

/**
 * List of languages recognition input
 * 
 * @export
 * @class RecognitionLanguagesData
 */
export class RecognitionLanguagesData extends AbstractRecognitionData {
	inputMode: string;
	constructor() {
		super();
	}

	/**
	 * Get the recognition input mode
	 *
	 * @method getInputMode
	 * @returns {String} inputMode
	 */
	getInputMode(): string {
		return this.inputMode;
	};

	/**
	 * Set the recognition input mode
	 *
	 * @method setInputMode
	 * @param {String} inputMode
	 */
	setInputMode(inputMode: string) {
		this.inputMode = inputMode;
	};

	/**
	 * Get recognition input
	 *
	 * @method getRecognitionInput
	 * @returns {AbstractRecognitionInput} input
	 */
	getRecognitionInput(): AbstractRecognitionInput {
		throw new Error('not implemented');
	};

	/**
	 * Set text input
	 *
	 * @method setRecognitionInput
	 * @param {AbstractRecognitionInput} input
	 */
	setRecognitionInput(input: AbstractRecognitionInput) { // jshint ignore:line
		throw new Error('not implemented');
	};
}