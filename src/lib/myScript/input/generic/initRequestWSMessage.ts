import { AbstractWSMessage } from '../../common/abstractWSMessage';

/**
 * WebSocket recognition hmac challenge message
 * 
 * @export
 * @class InitRequestWSMessage
 * @extends {AbstractWSMessage}
 */
export class InitRequestWSMessage extends AbstractWSMessage {
	applicationKey: string;

	/**
	 * Creates an instance of InitRequestWSMessage.
	 * @param {Object} [obj] Recognition WebSocket message
	 * 
	 * @memberof InitRequestWSMessage
	 */
	constructor(obj?) {
		super(obj);
		this.type = 'applicationKey';
	}

	/**
 * Get the application key
 *
 * @method getApplicationKey
 * @returns {String}
 */
	getApplicationKey(): string {
		return this.applicationKey;
	};

	/**
	 * Set the application key
	 *
	 * @method setApplicationKey
	 * @param {String} applicationKey
	 */
	setApplicationKey(applicationKey: string) {
		this.applicationKey = applicationKey;
	};
}