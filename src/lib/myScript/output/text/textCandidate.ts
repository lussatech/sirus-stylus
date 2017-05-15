import { TextSegment } from './textSegment';

/**
 * Text candidate Parameter
 * 
 * @export
 * @interface TextCandidateParameter
 */
export interface TextCandidateParameter {
	flags?: Array<any>;
	children?: Array<TextSegment>;
	spellingDistortionRatio?: number;
	resemblanceScore?: number;
	normalizedScore?: number;
	label?: string;
}

/**
 * Text candidate
 * 
 * @export
 * @class TextCandidate
 */
export class TextCandidate {
	flags: Array<any> = [];
	children: Array<TextSegment> = [];
	spellingDistortionRatio: number;
	resemblanceScore: number;
	normalizedScore: number;
	label: string;

	constructor(obj?: TextCandidateParameter) {
		this.label = obj && obj.label;
		this.normalizedScore = obj && obj.normalizedScore || 0;
		this.spellingDistortionRatio = obj && obj.spellingDistortionRatio || 0;
		this.flags = (obj && obj.flags) ? obj.flags.map(flag => flag) : [];
		this.children = (obj && obj.children) ?
			obj.flags.map(children => new TextSegment(children)) : [];
	}

	/**
	 * Get label
	 *
	 * @method getLabel
	 * @returns {String}
	 */
	getLabel(): string {
		return this.label;
	};

	/**
	 * Get normalized score
	 *
	 * @method getNormalizedScore
	 * @returns {Number}
	 */
	getNormalizedScore(): number {
		return this.normalizedScore;
	};

	/**
	 * Get resemblance score
	 *
	 * @method getResemblanceScore
	 * @returns {Number}
	 */
	getResemblanceScore(): number {
		return this.resemblanceScore;
	};

	/**
	 * Get spelling distortion ratio
	 *
	 * @method getSpellingDistortionRatio
	 * @returns {Number}
	 */
	getSpellingDistortionRatio(): number {
		return this.spellingDistortionRatio;
	};

	/**
	 * Get flags
	 *
	 * @method getFlags
	 * @returns {Array}
	 */
	getFlags(): Array<any> {
		return this.flags;
	};

	/**
	 * Get children
	 *
	 * @method getChildren
	 * @returns {TextSegment[]}
	 */
	getChildren(): Array<TextSegment> {
		return this.children;
	};
}