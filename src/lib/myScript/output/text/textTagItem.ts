import { TextInkRange } from './textInkRange';

export interface TextTagItemParameter {
	inkRanges?: Array<TextInkRange | string> | string;
	tagType?: string;
}

export class TextTagItem {
	inkRanges: Array<TextInkRange> = [];
	tagType: string;

	constructor(obj?: TextTagItemParameter) {
		this.tagType = obj && obj.tagType;
		if (obj && obj.inkRanges) {
			let ranges = obj.inkRanges;
			if (!Array.isArray(ranges)) {
				ranges = ranges.split(/[\s]+/);
			}
			this.inkRanges = ranges.map(range => new TextInkRange(range));
		}
	}

	/**
	 * Get tag type
	 *
	 * @method getTagType
	 * @returns {String}
	 */
	getTagType(): string {
		return this.tagType;
	};

	/**
	 * Get ink ranges
	 *
	 * @method getInkRanges
	 * @returns {TextInkRange[]}
	 */
	getInkRanges(): Array<TextInkRange | string> | string {
		return this.inkRanges;
	};
}