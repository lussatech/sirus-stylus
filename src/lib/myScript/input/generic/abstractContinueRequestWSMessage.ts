import { AbstractWSMessage } from '../../common/abstractWSMessage';

/**
 * WebSocket continue math recognition message
 * 
 * @export
 * @class AbstractContinueRequestWSMessage
 * @extends {AbstractWSMessage}
 */
export class AbstractContinueRequestWSMessage extends AbstractWSMessage {
	instanceId: string;

	/**
	 * Creates an instance of AbstractContinueRequestWSMessage.
	 * @param {Object} [obj] Recognition WebSocket message
	 * 
	 * @memberof AbstractContinueRequestWSMessage
	 */
	constructor(obj?: Object) {
		super(obj);
		this.type = 'continue';
	}

	/**
	 * Get instanceId
	 *
	 * @method getInstanceId
	 * @returns {String}
	 */
	getInstanceId(): string {
		return this.instanceId;
	};

	/**
	 * Set instanceId
	 *
	 * @method setInstanceId
	 * @param {String} instanceId
	 */
	setInstanceId(instanceId: string) {
		this.instanceId = instanceId;
	};

}