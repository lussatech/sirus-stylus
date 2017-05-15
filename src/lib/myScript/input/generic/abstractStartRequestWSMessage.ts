import { AbstractWSMessage} from '../../common/abstractWSMessage';

/**
 * WebSocket start math recognition message
 * 
 * @export
 * @class AbstractStartRequestWSMessage
 * @extends {AbstractWSMessage}
 */
export class AbstractStartRequestWSMessage extends AbstractWSMessage {
	instanceId: string;

	/**
	 * Creates an instance of AbstractStartRequestWSMessage.
	 * @param {Object} [obj] Recognition WebSocket message 
	 * 
	 * @memberof AbstractStartRequestWSMessage
	 */
	constructor(obj?) {
		super(obj);
		this.type = 'start';
	}
}