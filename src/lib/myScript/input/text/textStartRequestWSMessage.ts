import { AbstractStartRequestWSMessage } from '../generic/abstractStartRequestWSMessage';
import { TextParameter } from './textParameter';
import { TextInputUnit } from './textInputUnit';

/**
 * WebSocket start text recognition message
 * 
 * @export
 * @class TextStartRequestWSMessage
 * @extends {AbstractStartRequestWSMessage}
 */
export class TextStartRequestWSMessage extends AbstractStartRequestWSMessage {
	textParameter: TextParameter;
	inputUnits: Array<TextInputUnit>;

	/**
	 * Creates an instance of TextStartRequestWSMessage.
	 * @param {any} [obj] Recognition WebSocket message
	 * 
	 * @memberof TextStartRequestWSMessage
	 */
	constructor(obj?) {
		super(obj);
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