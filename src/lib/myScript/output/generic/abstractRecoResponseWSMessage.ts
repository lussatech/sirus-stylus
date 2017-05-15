import { AbstractWSMessage } from '../../common/abstractWSMessage';
import { TextDocument } from '../text/textDocument';

export class AbstractRecoResponseWSMessage extends AbstractWSMessage {
	instanceId: string;
	result: TextDocument;

	constructor(obj?) {
		super(obj);
		this.instanceId = obj && obj.instanceId || undefined;
	}

	/**
	* Get instance id
	*
	* @method getInstanceId
	* @returns {String}
	*/
	getInstanceId() {
		return this.instanceId;
	};

	/**
	 * Get document
	 *
	 * @method getDocument
	 * @returns {TextDocument|ShapeDocument|MathDocument|MusicDocument|AnalyzerDocument}
	 */
	getDocument(): TextDocument {
		return this.result;
	};
}