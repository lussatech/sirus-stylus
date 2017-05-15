import { TextDocument } from '../text/textDocument';

export interface AbstractResultParameter {
	instanceId?: string;
	result?: TextDocument
}

/**
 * Abstract result
 * 
 * @export
 * @class AbstractResult
 */
export class AbstractResult {
	instanceId: string;
	result: TextDocument;

	constructor(obj?: AbstractResultParameter) {
		this.instanceId = obj && obj.instanceId;
	}

	/**
	 * Get instance id
	 *
	 * @method getInstanceId
	 * @returns {String}
	 */
	getInstanceId(): string {
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