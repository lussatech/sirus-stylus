import { AbstractResult } from '../generic/abstractResult';
import { TextDocument } from './textDocument';

/**
 * Text result
 * 
 * @export
 * @class TextResult
 * @extends {AbstractResult}
 */
export class TextResult extends AbstractResult {
	constructor(obj?) {
		super(obj);
		this.result = (obj && obj.result) ?
			new TextDocument(obj.result) : undefined;
	}
}