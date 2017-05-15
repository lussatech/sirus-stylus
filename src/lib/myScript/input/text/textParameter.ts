import { AbstractParameter } from '../generic/abstractParameter';
import { TextProperties } from './textProperties';

/**
 * 
 * 
 * @export
 * @interface TextParameterInput
 */
export interface TextParameterInput {
	textProperties?: TextProperties;
	language?: string;
	textInputMode?: string;
	contentTypes?: Array<any>;
	subsetKnowledges?: Array<any>;
	userResources?: Array<any>;
	userLkWords?: Array<string>;
	resultDetail?: string;
}

/**
 * Parameters used for text recognition
 * 
 * @export
 * @class TextParameter
 * @extends {AbstractParameter}
 */
export class TextParameter extends AbstractParameter {
	textProperties: TextProperties;
	language: string;
	textInputMode: string;
	contentTypes: Array<any>;
	subsetKnowledges: Array<any>;
	userResources: Array<any>;
	userLkWords: Array<string>;
	resultDetail: string;

	/**
	 * Creates an instance of TextParameter.
	 * @param {TextParameterInput} [obj] 
	 * 
	 * @memberof TextParameter
	 */
	constructor(obj?: TextParameterInput) {
		super(obj);
		this.textProperties = (obj && obj.textProperties) ?
			new TextProperties(obj.textProperties) : new TextProperties();
		this.language = obj && obj.language || 'en_US';
		this.textInputMode = obj && obj.textInputMode || 'CURSIVE';
		this.subsetKnowledges = obj && obj.subsetKnowledges || [];
		this.userResources = obj && obj.userResources || [];
		this.userLkWords = obj && obj.userLkWords || [];
		this.resultDetail = obj && obj.resultDetail || 'TEXT';
	}

	/**
		* Get recognition language
		*
		* @method getLanguage
		* @returns {String}
		*/
	getLanguage(): string {
		return this.language;
	};

	/**
	 * Set recognition language
	 *
	 * @method getLanguage
	 * @param {String} language
	 */
	setLanguage(language: string) {
		this.language = language;
	};

	/**
	 * Get input mode
	 *
	 * @method getInputMode
	 * @returns {'CURSIVE'|'ISOLATED'|'SUPERIMPOSED'|'VERTICAL'}
	 */
	getInputMode(): string {
		return this.textInputMode;
	};

	/**
	 * Set input mode
	 *
	 * @method setInputMode
	 * @param {'CURSIVE'|'ISOLATED'|'SUPERIMPOSED'|'VERTICAL'} inputMode
	 */
	setInputMode(inputMode: string) {
		this.textInputMode = inputMode;
	};

	/**
	 * Get content types
	 *
	 * @method getContentTypes
	 * @returns {Array}
	 */
	getContentTypes(): Array<any> {
		return this.contentTypes;
	};

	/**
	 * Set content types
	 *
	 * @method setContentTypes
	 * @param {Array} contentTypes
	 */
	setContentTypes(contentTypes: Array<any>) {
		this.contentTypes = contentTypes;
	};

	/**
	 * Get SK
	 *
	 * @method getSubsetKnowledges
	 * @returns {Array}
	 */
	getSubsetKnowledges(): Array<any> {
		return this.subsetKnowledges;
	};

	/**
	 * Set SK
	 *
	 * @method setSubsetKnowledges
	 * @param {Array} subsetKnowledges
	 */
	setSubsetKnowledges(subsetKnowledges: Array<any>) {
		this.subsetKnowledges = subsetKnowledges;
	};

	/**
	 * Get user resources
	 *
	 * @method getUserResources
	 * @returns {Array}
	 */
	getUserResources(): Array<any> {
		return this.userResources;
	};

	/**
	 * Set user resources
	 *
	 * @method setUserResources
	 * @param {Array} userResources
	 */
	setUserResources(userResources: Array<any>) {
		this.userResources = userResources;
	};

	/**
	 * Get user LK words
	 *
	 * @method getUserLkWords
	 * @returns {Array}
	 */
	getUserLkWords(): Array<any> {
		return this.userLkWords;
	};

	/**
	 * Set user LK words
	 *
	 * @method setUserLkWords
	 * @param {Array} userLkWords
	 */
	setUserLkWords(userLkWords: Array<any>) {
		this.userLkWords = userLkWords;
	};

	/**
	 * Get result detail (e.g. TEXT, WORD ...)
	 *
	 * @method getResultDetail
	 * @returns {'TEXT'|'WORD'|'CHARACTER'}
	 */
	getResultDetail(): string {
		return this.resultDetail;
	};

	/**
	 * Set result detail (e.g. TEXT, WORD ...)
	 *
	 * @method setResultDetail
	 * @param {'TEXT'|'WORD'|'CHARACTER'} resultDetail
	 */
	setResultDetail(resultDetail: string) {
		this.resultDetail = resultDetail;
	};

	/**
	 * Get text properties
	 *
	 * @method getTextProperties
	 * @returns {TextProperties}
	 */
	getTextProperties(): TextProperties {
		return this.textProperties;
	};

	/**
	 * Set text properties
	 *
	 * @method setTextProperties
	 * @param {TextProperties} properties
	 */
	setTextProperties(textProperties: TextProperties) {
		this.textProperties = textProperties;
	};
}