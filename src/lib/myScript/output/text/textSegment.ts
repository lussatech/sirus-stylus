import { TextCandidate } from './textCandidate';
import { TextInkRange } from './textInkRange';

/**
 * Text segment parameter
 * 
 * @export
 * @interface TextSegmentParameter
 */
export interface TextSegmentParameter {
	candidates?: Array<TextCandidate>;
	inkRanges?: Array<TextInkRange | string> | string;
	selectedCandidateIdx?: number;
}


/**
 * Text segment
 * 
 * @export
 * @class TextSegment
 */
export class TextSegment {
	candidates: Array<TextCandidate> = [];
	inkRanges: Array<TextInkRange | string> | string = [];
	selectedCandidateIdx: number = 0;

	constructor(obj?: TextSegmentParameter) {
		this.selectedCandidateIdx = obj && obj.selectedCandidateIdx;
		if (obj.inkRanges) {
			if (!Array.isArray(obj.inkRanges)) {
				obj.inkRanges = obj.inkRanges.split(/[\s]+/);
			}
			this.inkRanges = obj.inkRanges.map(range => new TextInkRange(range));
		}
		this.candidates = obj && obj.candidates.map(candidate => new TextCandidate(candidate));
	}

	/**
	 * Get candidates
	 *
	 * @method getCandidates
	 * @returns {TextCandidate[]}
	 */
	getCandidates(): Array<TextCandidate> {
		return this.candidates;
	};

	/**
	 * Get selected candidate index
	 *
	 * @method getSelectedCandidateIdx
	 * @returns {Number}
	 */
	getSelectedCandidateIdx(): number {
		return this.selectedCandidateIdx;
	};

	/**
	 * Get selected candidate
	 *
	 * @method getSelectedCandidate
	 * @returns {TextCandidate}
	 */
	getSelectedCandidate(): TextCandidate {
		if ((this.getCandidates().length > 0) && (this.getSelectedCandidateIdx() !== undefined)) {
			return this.getCandidates()[this.getSelectedCandidateIdx()];
		} else {
			return undefined;
		}
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