import { AbstractRecoResponseWSMessage } from '../generic/abstractRecoResponseWSMessage';
import { TextDocument } from './textDocument';

/**
 * WebSocket recognition text result message
 * 
 * @export
 * @class TextResponseWSMessage
 * @extends {AbstractRecoResponseWSMessage}
 */
export class TextResponseWSMessage extends AbstractRecoResponseWSMessage {
	constructor(obj?) {
		super(obj);
		this.result = (obj && obj.result) ? new TextDocument(obj.result) : undefined;
	}
}