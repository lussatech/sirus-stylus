import { TextSegment } from './textSegment';
import { TextTagItem } from './textTagItem';
import { TextInkRange } from './textInkRange';

/**
 * Text document Parameter
 * 
 * @export
 * @interface TextDocumentParameter
 */
export interface TextDocumentParameter {
	tagItems?: Array<TextTagItem>;
	wordSegments?: Array<TextSegment>;
	charSegments?: Array<TextSegment>;
	textSegmentResult?: TextSegment;
	wordCandidates?: Array<TextSegment>;
	charCandidates?: Array<TextSegment>;
}

/**
 * Text document
 * 
 * @export
 * @class TextDocument
 */
export class TextDocument {
	tagItems: Array<TextTagItem>;
	wordSegments: Array<TextSegment>;
	charSegments: Array<TextSegment>;
	textSegmentResult: TextSegment;

	/**
	 * Creates an instance of TextDocument.
	 * @param {TextDocumentParameter} [obj] 
	 * 
	 * @memberof TextDocument
	 */
	constructor(obj?: TextDocumentParameter) {
		this.textSegmentResult = (obj && obj.textSegmentResult) ?
			new TextSegment(obj.textSegmentResult) : undefined;
		this.tagItems = (obj && obj.tagItems) ?
			obj.tagItems.map(tagItem => new TextTagItem(tagItem)) : [];
		this.charSegments = (obj && obj.charSegments) ?
			obj.charSegments.map(charSegment => new TextSegment(charSegment)) :
			obj.charCandidates ?
				obj.charCandidates.map(charSegment => new TextSegment(charSegment)) : [];
		this.wordSegments = (obj && obj.wordSegments) ?
			obj.wordSegments.map(wordSegment => new TextSegment(wordSegment)) :
			obj.wordCandidates ?
				obj.wordCandidates.map(wordSegment => new TextSegment(wordSegment)) : [];
	}

	/**
	 * Get tag items
	 *
	 * @method getTagItems
	 * @returns {TextTagItem[]}
	 */
	getTagItems(): Array<TextTagItem> {
		return this.tagItems;
	};

	/**
	 * Get word segments
	 *
	 * @method getWordSegments
	 * @returns {TextSegment[]}
	 */
	getWordSegments(): Array<TextSegment> {
		return this.wordSegments;
	};

	/**
	 * Get word segment
	 *
	 * @method getWordSegment
	 * @param {TextInkRange[]} inkRanges
	 * @returns {TextSegment}
	 */
	getWordSegment(inkRanges: Array<TextInkRange>): TextSegment {
		for (let i = 0; i < this.getWordSegments().length; i++) {
			if (JSON.stringify(this.getWordSegments()[i].getInkRanges()) === JSON.stringify(inkRanges)) {
				return this.getWordSegments()[i];
			}
		}
		return undefined;
	};

	/**
	 * Get char segments
	 *
	 * @method getCharSegments
	 * @returns {TextSegment[]}
	 */
	getCharSegments(): Array<TextSegment> {
		return this.charSegments;
	};

	/**
	 * Get char segment
	 *
	 * @method getCharSegment
	 * @param {TextInkRange[]} inkRanges
	 * @returns {TextSegment}
	 */
	getCharSegment(inkRanges: Array<TextInkRange>): TextSegment {
		for (let i = 0; i < this.getCharSegments().length; i++) {
			if (JSON.stringify(this.getCharSegments()[i].getInkRanges()) === JSON.stringify(inkRanges)) {
				return this.getCharSegments()[i];
			}
		}
		return undefined;
	};

	/**
	 * Get text segment
	 *
	 * @method getTextSegment
	 * @returns {TextSegment}
	 */
	getTextSegment(): TextSegment {
		return this.textSegmentResult;
	};

	/**
	 * Has scratch-out results
	 *
	 * @method hasScratchOutResults
	 * @returns {Boolean}
	 */
	hasScratchOutResults(): boolean {
		return false;
	};

}