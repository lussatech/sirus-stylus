import { AbstractWSMessage} from '../../common/abstractWSMessage';

/**
 * WebSocket recognition reset message
 * 
 * @export
 * @class ResetResponseWSMessage
 * @extends {AbstractWSMessage}
 */
export class ResetResponseWSMessage extends AbstractWSMessage {
	constructor(obj?) {
		super(obj);
	}
}