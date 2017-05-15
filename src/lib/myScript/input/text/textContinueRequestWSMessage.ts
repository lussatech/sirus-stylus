import { AbstractContinueRequestWSMessage } from '../generic/abstractContinueRequestWSMessage';
import { TextInputUnit } from './textInputUnit';

/**
 * WebSocket continue text recognition message
 * 
 * @export
 * @class TextContinueRequestWSMessage
 * @extends {AbstractContinueRequestWSMessage}
 */
export class TextContinueRequestWSMessage extends AbstractContinueRequestWSMessage {
	inputUnits: Array<TextInputUnit>;

	constructor(obj?) {
		super(obj);
	}

	/**
	 * Get input units
	 *
	 * @method getInputUnits
	 * @returns {TextInputUnit[]}
	 */
	getInputUnits(): Array<TextInputUnit> {
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