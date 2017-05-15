import { AbstractWSMessage } from '../../common/abstractWSMessage';

/**
 * WebSocket recognition error message
 * 
 * @export
 * @class ErrorResponseWSMessage
 * @extends {AbstractWSMessage}
 */
export class ErrorResponseWSMessage extends AbstractWSMessage {
	error: string;

	constructor(obj?) {
		super(obj);
		this.error = obj && obj.error || undefined;
	}

	/**
	 * Get the error
	 *
	 * @method getError
	 * @returns {String}
	 */
	getError(): string {
		return this.error;
	};
}