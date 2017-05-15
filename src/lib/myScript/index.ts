export const RecognitionType = {
	TEXT: 'TEXT',
	// MATH: 'MATH',
	// SHAPE: 'SHAPE',
	// MUSIC: 'MUSIC',
	// ANALYZER: 'ANALYZER'
}

export const InputMode = {
	CURSIVE: 'CURSIVE',
	ISOLATED: 'ISOLATED',
	SUPERIMPOSED: 'SUPERIMPOSED',
	VERTICAL: 'VERTICAL'
}

export const InputType = {
	CHAR: 'CHAR',
	WORD: 'WORD',
	SINGLE_LINE_TEXT: 'SINGLE_LINE_TEXT',
	MULTI_LINE_TEXT: 'MULTI_LINE_TEXT'
}

export const ResultDetail = {
	TEXT: 'TEXT',
	WORD: 'WORD',
	CHARACTER: 'CHARACTER'
}

export const ResultType = {
	// Math: {
	// 	LATEX: 'LATEX',
	// 	MATHML: 'MATHML',
	// 	SYMBOLTREE: 'SYMBOLTREE',
	// 	OFFICEOPENXMLMATH: 'OFFICEOPENXMLMATH'
	// },
	// Music: {
	// 	MUSICXML: 'MUSICXML',
	// 	SCORETREE: 'SCORETREE'
	// }
}

export const Protocol = {
	WS: 'WebSocket',
	REST: 'REST'
}

// ink paper
export { InkPaper, InkPaperOptions, InkChangeData } from './inkPaper';

// common
export { Point, PointParameters } from './common/generic/point';
export { Rectangle, RectangleParameters } from './common/generic/rectangle';
export { AbstractWSMessage } from './common/abstractWSMessage';
export { PenParameters, PenParametersInput } from './common/penParameters';

// input
export { AbstractComponent } from './input/generic/components/abstractComponent';
export {
	StrokeComponent,
	StrokeComponentParameters
} from './input/generic/components/strokeComponent';
export {
	CharacterInputComponent,
	CharacterInputComponentParameters
} from './input/generic/components/characterInputComponent';
export {
	CharacterInputComponentAlternate,
	CharacterInputComponentAlternateParameters
} from './input/generic/components/characterInputComponentAlternate';
export {
	AbstractContinueRequestWSMessage
} from './input/generic/abstractContinueRequestWSMessage';
export {
	AbstractParameter
} from './input/generic/abstractParameter';
export {
	AbstractRecognitionData
} from './input/generic/abstractRecognitionData';
export {
	AbstractRecognitionInput
} from './input/generic/abstractRecognitionInput';
export {
	AbstractStartRequestWSMessage
} from './input/generic/abstractStartRequestWSMessage';
export {
	ChallengeRequestWSMessage
} from './input/generic/challengeRequestWSMessage';
export {
	InitRequestWSMessage
} from './input/generic/initRequestWSMessage';
export {
	RecognitionLanguagesData
} from './input/generic/recognitionLanguagesData';

export { 
	AbstractTextInputComponent 
} from './input/text/components/abstractTextInputComponent';
export {
	CharInputComponent
} from './input/text/components/charInputComponent';
export {
	StringInputComponent
} from './input/text/components/stringInputComponent';

export {
	TextContinueRequestWSMessage
} from './input/text/textContinueRequestWSMessage';
export {
	TextInputUnit
} from './input/text/textInputUnit';
export {
	TextParameter,
	TextParameterInput
} from './input/text/textParameter';
export {
	TextProperties,
	TextPropertiesParameters
} from './input/text/textProperties';
export {
	TextRecognitionData
} from './input/text/textRecognitionData';
export {
	TextRecognitionInput
} from './input/text/textRecognitionInput';
export {
	TextStartRequestWSMessage
} from './input/text/textStartRequestWSMessage';

// output
export {
	AbstractRecoResponseWSMessage
} from './output/generic/abstractRecoResponseWSMessage';
export {
	AbstractResult
} from './output/generic/abstractResult';
export {
	ChallengeResponseWSMessage
} from './output/generic/challengeResponseWSMessage';
export {
	ErrorResponseWSMessage
} from './output/generic/errorResponseWSMessage';
export {
	InitResponseWSMessage
} from './output/generic/initResponseWSMessage';
export {
	ResetResponseWSMessage
} from './output/generic/resetResponseWSMessage';
export {
	TextCandidate,
	TextCandidateParameter
} from './output/text/textCandidate';
export {
	TextDocument,
	TextDocumentParameter
} from './output/text/textDocument';
export {
	TextInkRange,
	TextInkRangeParameter
} from './output/text/textInkRange';
export {
	TextResponseWSMessage
} from './output/text/textResponseWSMessage';
export {
	TextResult
} from './output/text/textResult';
export {
	TextSegment
} from './output/text/textSegment';
export {
	TextTagItem,
	TextTagItemParameter
} from './output/text/textTagItem';

// networking
export {
	NetworkInterface
} from './networking/networkInterface';
export {
	NetworkWSInterface
} from './networking/networkWSInterface';

// recognition
export {
	AbstractRecognizer
} from './recognition/abstractRecognizer';
export {
	AbstractWSRecognizer
} from './recognition/abstractWSRecognizer';
export {
	TextRecognizer
} from './recognition/textRecognizer';
export {
	TextWSRecognizer
} from './recognition/textWSRecognizer';

// rendering
export {
	AbstractRenderer
} from './rendering/abstractRenderer';
export {
	ImageRenderer
} from './rendering/imageRenderer';
export {
	InkGrabber
} from './rendering/inkGrabber';
export {
	TextRenderer
} from './rendering/textRenderer';