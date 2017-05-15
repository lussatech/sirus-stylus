import { AbstractWSMessage } from '../../common/abstractWSMessage';

/**
 * WebSocket recognition init message
 * 
 * @export
 * @class InitResponseWSMessage
 * @extends {AbstractWSMessage}
 */
export class InitResponseWSMessage extends AbstractWSMessage {
	constructor(obj?) {
		super(obj);
	}
}