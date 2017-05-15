/**
 * Abstract WebSocket recognition message
 * 
 * @export
 * @class AbstractWSMessage
 */
export abstract class AbstractWSMessage {
	type: string;
	/**
	 * Creates an instance of AbstractWSMessage.
	 * @param {any} [obj] 
	 * 
	 * @memberof AbstractWSMessage
	 */
	constructor(obj?) {
		this.type = obj && obj.type || '';
	}
	
	/**
	 * Get the message type
	 *
	 * @method getType
	 * @returns {String}
	 */
	getType(): string {
		return this.type;
	};
}