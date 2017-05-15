/**
 * Text recognition properties obj parameters
 * 
 * @export
 * @interface TextPropertiesParameters
 */
export interface TextPropertiesParameters {
	textCandidateListSize?: number;
	wordCandidateListSize?: number;
	wordPredictionListSize?: number;
	wordCompletionListSize?: number;
	characterCandidateListSize?: number;
	discardCaseletiations?: boolean;
	discardAccentuationletiations?: boolean;
	disableSpatialOrdering?: boolean;
	glyphDistortion?: number;
	enableOutOfLexicon?: boolean;
	spellingDistortion?: number;
}

/**
 * Text recognition properties
 * 
 * @export
 * @class TextProperties
 */
export class TextProperties {
	textCandidateListSize: number;
	wordCandidateListSize: number;
	wordPredictionListSize: number;
	wordCompletionListSize: number;
	characterCandidateListSize: number;
	discardCaseletiations: boolean;
	discardAccentuationletiations: boolean;
	disableSpatialOrdering: boolean;
	glyphDistortion: number;
	enableOutOfLexicon: boolean;
	spellingDistortion: number;

	/**
	 * Creates an instance of TextProperties.
	 * @param {TextPropertiesParameters} [obj] 
	 * 
	 * @memberof TextProperties
	 */
	constructor(obj?: TextPropertiesParameters) {
		this.textCandidateListSize = obj && obj.textCandidateListSize || 0;
		this.wordCandidateListSize = obj && obj.wordCandidateListSize || 0;
		this.wordPredictionListSize = obj && obj.wordPredictionListSize || 0;
		this.wordCompletionListSize = obj && obj.wordCompletionListSize || 0;
		this.characterCandidateListSize = obj && obj.characterCandidateListSize || 0;
		this.discardCaseletiations = obj && obj.discardCaseletiations || false;
		this.discardAccentuationletiations = obj && obj.discardAccentuationletiations || false;
		this.disableSpatialOrdering = obj && obj.disableSpatialOrdering || false;
		this.glyphDistortion = obj && obj.glyphDistortion || 0;
		this.enableOutOfLexicon = obj && obj.enableOutOfLexicon || false;
		this.spellingDistortion = obj && obj.spellingDistortion || 0;
	}

	/**
	 * Get the number of text candidates requested
	 *
	 * @method getTextCandidateListSize
	 * @returns {Number}
	 */
	getTextCandidateListSize(): number {
		return this.textCandidateListSize;
	};

	/**
	 * Set the number of text candidates requested
	 *
	 * @method setTextCandidateListSize
	 * @param {Number} textCandidateListSize
	 */
	setTextCandidateListSize(textCandidateListSize: number) {
		this.textCandidateListSize = textCandidateListSize;
	};

	/**
	 * Get the number of word candidates requested
	 *
	 * @method getWordCandidateListSize
	 * @returns {Number}
	 */
	getWordCandidateListSize(): number {
		return this.wordCandidateListSize;
	};

	/**
	 * Set the number of word candidates requested
	 *
	 * @method setWordCandidateListSize
	 * @param {Number} wordCandidateListSize
	 */
	setWordCandidateListSize(wordCandidateListSize: number) {
		this.wordCandidateListSize = wordCandidateListSize;
	};

	/**
	 * Get the number of word prediction candidates requested
	 *
	 * @method getWordPredictionListSize
	 * @returns {Number}
	 */
	getWordPredictionListSize(): number {
		return this.wordPredictionListSize;
	};

	/**
	 * Set the number of word prediction candidates requested
	 *
	 * @method setWordPredictionListSize
	 * @param {Number} wordPredictionListSize
	 */
	setWordPredictionListSize(wordPredictionListSize: number) {
		this.wordPredictionListSize = wordPredictionListSize;
	};

	/**
	 * Get the number of word completion candidates requested
	 *
	 * @method getWordCompletionListSize
	 * @returns {Number}
	 */
	getWordCompletionListSize(): number {
		return this.wordCompletionListSize;
	};

	/**
	 * Set the number of word completion candidates requested
	 *
	 * @method setWordCompletionListSize
	 * @param {Number} wordCompletionListSize
	 */
	setWordCompletionListSize(wordCompletionListSize: number) {
		this.wordCompletionListSize = wordCompletionListSize;
	};

	/**
	 * Get the number of character candidates requested
	 *
	 * @method getCharacterCandidateListSize
	 * @returns {Number}
	 */
	getCharacterCandidateListSize(): number {
		return this.characterCandidateListSize;
	};

	/**
	 * Set the number of character candidates requested
	 *
	 * @method setCharacterCandidateListSize
	 * @param {Number} characterCandidateListSize
	 */
	setCharacterCandidateListSize(characterCandidateListSize: number) {
		this.characterCandidateListSize = characterCandidateListSize;
	};

	/**
	 * Get the discard case letiations
	 *
	 * @method getDiscardCaseletiations
	 * @returns {boolean}
	 */
	getDiscardCaseletiations(): boolean {
		return this.discardCaseletiations;
	};

	/**
	 * Set the discard case letiations
	 *
	 * @method setDiscardCaseletiations
	 * @param {boolean} discardCaseletiations
	 */
	setDiscardCaseletiations(discardCaseletiations: boolean) {
		this.discardCaseletiations = discardCaseletiations;
	};

	/**
	 * Get the discard accentuation letiations
	 *
	 * @method getDiscardAccentuationletiations
	 * @returns {boolean}
	 */
	getDiscardAccentuationletiations(): boolean {
		return this.discardAccentuationletiations;
	};

	/**
	 * Set the discard accentuation letiations
	 *
	 * @method setDiscardAccentuationletiations
	 * @param {boolean} discardAccentuationletiations
	 */
	setDiscardAccentuationletiations(discardAccentuationletiations: boolean) {
		this.discardAccentuationletiations = discardAccentuationletiations;
	};

	/**
	 * Get disable spatial ordering
	 *
	 * @method getDisableSpatialOrdering
	 * @returns {Boolean}
	 */
	getDisableSpatialOrdering(): boolean {
		return this.disableSpatialOrdering;
	};

	/**
	 * Set disable spatial ordering
	 *
	 * @method setDisableSpatialOrdering
	 * @param {Boolean} disableSpatialOrdering
	 */
	setDisableSpatialOrdering(disableSpatialOrdering: boolean) {
		this.disableSpatialOrdering = disableSpatialOrdering;
	};

	/**
	 * Get glyph distortion
	 *
	 * @method getGlyphDistortion
	 * @returns {Number}
	 */
	getGlyphDistortion(): number {
		return this.glyphDistortion;
	};

	/**
	 * Set glyph distortion
	 *
	 * @method setGlyphDistortion
	 * @param {Number} glyphDistortion
	 */
	setGlyphDistortion(glyphDistortion: number) {
		this.glyphDistortion = glyphDistortion;
	};

	/**
	 * Get enable out of lexicon
	 *
	 * @method getEnableOutOfLexicon
	 * @returns {Boolean}
	 */
	getEnableOutOfLexicon(): boolean {
		return this.enableOutOfLexicon;
	};

	/**
	 * Set enable out of lexicon
	 *
	 * @method setEnableOutOfLexicon
	 * @param {Boolean} enableOutOfLexicon
	 */
	setEnableOutOfLexicon(enableOutOfLexicon: boolean) {
		this.enableOutOfLexicon = enableOutOfLexicon;
	};

	/**
	 * Get spelling distortion
	 *
	 * @method getSpellingDistortion
	 * @returns {Number}
	 */
	getSpellingDistortion(): number {
		return this.spellingDistortion;
	};

	/**
	 * Set spelling distortion
	 *
	 * @method setSpellingDistortion
	 * @param {Number} spellingDistortion
	 */
	setSpellingDistortion(spellingDistortion: number) {
		this.spellingDistortion = spellingDistortion;
	};
}