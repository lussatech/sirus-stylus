import { AbstractWSMessage } from '../../common/abstractWSMessage';

/**
 * WebSocket recognition hmac challenge message
 * 
 * @export
 * @class ResetRequestWSMessage
 * @extends {AbstractWSMessage}
 */
export class ResetRequestWSMessage extends AbstractWSMessage {

	/**
	 * Creates an instance of ResetRequestWSMessage.
	 * @param {Object} [obj] Recognition WebSocket message
	 * 
	 * @memberof ResetRequestWSMessage
	 */
	constructor(obj?) {
		super(obj);
		this.type = 'reset';
	}
}