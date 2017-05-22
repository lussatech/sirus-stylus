import {
	RecognitionType,
	Protocol,
	Point,
} from './index';

import { PenParameters } from './common/penParameters';

import { TextParameter } from './input/text/textParameter';
import { AbstractComponent } from './input/generic/components/abstractComponent';
import { StrokeComponent } from './input/generic/components/strokeComponent';

import { AbstractRecognizer } from './recognition/abstractRecognizer';
import { AbstractWSRecognizer } from './recognition/abstractWSRecognizer';
import { TextRecognizer } from './recognition/textRecognizer';
import { TextWSRecognizer } from './recognition/textWSRecognizer';

import { InkGrabber } from './rendering/inkGrabber';
import { AbstractRenderer } from './rendering/abstractRenderer';
import { TextRenderer } from './rendering/textRenderer';
import { ImageRenderer } from './rendering/imageRenderer';

import * as Q from 'q';

const captureCanvasStyles = {
	position: 'absolute',
	height: '100%',
	width: '100%',
	'z-index': 1,
	top: 0,
	right: 0,
	'touch-action': 'none'
};

const renderingCanvasStyles = {
	position: 'absolute',
	height: '100%',
	width: '100%',
	'z-index': 1,
	top: 0,
	right: 0,
	'touch-action': 'none'
};

export interface InkPaperOptions {
	applicationKey: string;
	hmacKey: string;
	host?: string;
	type?: string;
	protocol?: string;
	ssl?: boolean;
	width?: number;
	height?: number;
	timeout?: number;
	typeset?: boolean;
	components?: AbstractComponent[];
	textParameters?: TextParameter;
	penParameters?: PenParameters;
	precision?: number
}

export interface InkChangeData {
	canUndo: boolean;
	undoLength: number;
	canRedo: boolean;
	redoLength: number;
}

/**
 * Paper to make writing
 * 
 * @export
 * @class InkPaper
 */
export class InkPaper {

	private options: InkPaperOptions;

	private _element: HTMLElement;
	private _instanceId: string;
	private _timerId: number;
	private _initialized: boolean = false;
	private _lastSentHTMLElementIndex: number = 0;
	private _components: AbstractComponent[] = [];
	private _redoComponents: AbstractComponent[] = [];

	// Capture
	private _captureCanvas: HTMLCanvasElement;
	private _inkGrabber: InkGrabber;

	// Rendering
	private _renderingCanvas: HTMLCanvasElement;
	private _selectedRenderer: AbstractRenderer;
	private _textRenderer: TextRenderer;

	// Recognition
	private _selectedRecognizer: AbstractRecognizer | AbstractWSRecognizer;
	private _selectedRESTRecognizer: AbstractRecognizer;
	private _selectedWSRecognizer: AbstractWSRecognizer;
	private _textRecognizer: TextRecognizer;
	private _textWSRecognizer: TextWSRecognizer;

	private isStarted: boolean = false;
	private timeout: number;
	private applicationKey: string;
	private hmacKey: string;

	private changeCallback: (data?: InkChangeData) => any | void;
	private resultCallback: (data?, error?) => any | void;
	private updatedModel;

	private _lastSentComponentIndex: number = 0;

	canvasRatio: number;

	/**
	 * Creates an instance of InkPaper.
	 * @param {HTMLElement} element 
	 * @param {InkPaperOptions} [options] 
	 * @param {((data?, error?) => any | void)} [callback] 
	 * 
	 * @memberof InkPaper
	 */
	constructor(
		element: HTMLElement,
		options?: InkPaperOptions,
		callback?: (data?, error?) => any | void
	) {

		// default options
		this.options = <InkPaperOptions>Object.assign({
			type: RecognitionType.TEXT,
			protocol: Protocol.REST,
			ssl: true,
			width: 400,
			height: 300,
			timeout: 2000,
			typeset: false,
			components: [],
			textParameters: new TextParameter(),
		}, <Object>options);

		this._element = element;
		this.resultCallback = callback;

		// Capture
		let tempCanvas = InkPaper.createCanvas(element, 'ms-temp-canvas');
		this.canvasRatio = InkPaper.getCanvasRatio(tempCanvas);
		element.removeChild(tempCanvas); //this.canvasRatio = 1;

		this._captureCanvas = InkPaper.createCanvas(element, 'ms-capture-canvas', 
			captureCanvasStyles);

		this._inkGrabber = new InkGrabber(this._captureCanvas.getContext('2d'));

		// Rendering
		this._renderingCanvas = InkPaper.createCanvas(element, 'ms-rendering-canvas', 
			renderingCanvasStyles);
		this._textRenderer = new TextRenderer(this._renderingCanvas.getContext('2d'));

		// Recognition
		this._textRecognizer = new TextRecognizer();
		this._textWSRecognizer = new TextWSRecognizer(this._handleMessage.bind(this));

		this._attachListeners(element);

		// Recognition type
		this.setType(this.options.type);

		this.setHost(this.options.host);
		this.setSSL(this.options.ssl);

		this.setTextParameters(this.options.textParameters);
		this.setProtocol(this.options.protocol);
		this.setTimeout(this.options.timeout);
		this.setApplicationKey(this.options.applicationKey);
		this.setHmacKey(this.options.hmacKey);

		this.setPenParameters(this.options.penParameters);

		this.setPrecision(this.options.precision);
		this.setTypeset(this.options.typeset);
		this.setComponents(this.options.components);

		this.setWidth(this.options.width);
		this.setHeight(this.options.height);
	}

	/**
	 * Set the width
	 *
	 * @method setWidth
	 * @param {Number} width
	 */
	setWidth(width: number) {
		if (width > 0) {
			this._captureCanvas.width = width * this.canvasRatio;
			this._captureCanvas.style.width = width + 'px';
			this._captureCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);

			this._renderingCanvas.width = width * this.canvasRatio;
			this._renderingCanvas.style.width = width + 'px';
			this._renderingCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);
		}
		this._initRenderingCanvas();
	};

	/**
	 * Set the height
	 *
	 * @method setHeight
	 * @param {Number} height
	 */
	setHeight(height: number) {
		if (height > 0) {
			this._captureCanvas.height = height * this.canvasRatio;
			this._captureCanvas.style.height = height + 'px';
			this._captureCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);

			this._renderingCanvas.height = height * this.canvasRatio;
			this._renderingCanvas.style.height = height + 'px';

			this._renderingCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);
		}
		this._initRenderingCanvas();
	};

	/**
	 * Set the network protocol (REST or WebSocket)
	 *
	 * @param {'REST'|'WebSocket'} protocol
	 */
	setProtocol(protocol: string) {
		switch (protocol) {
			case Protocol.REST:
				this._selectedRecognizer = this._selectedRESTRecognizer;
				break;
			case Protocol.WS:
				this.setTimeout(-1); // FIXME hack to avoid border issues
				this._selectedRecognizer = this._selectedWSRecognizer;
				break;
			default:
				throw new Error('Unknown protocol: ' + protocol);
		}
		this._instanceId = undefined;
		this._initialized = false;
		this._lastSentComponentIndex = 0;
	};

	/**
	 * Get the network protocol (REST or WebSocket)
	 *
	 * @returns {'REST'|'WebSocket'}
	 */
	getProtocol(): string {
		if (this._selectedRecognizer instanceof AbstractWSRecognizer) {
			return Protocol.WS;
		} else {
			return Protocol.REST;
		}
	};

	/**
	 * Set recognition type
	 *
	 * @method setType
	 * @param {'TEXT'|'MATH'|'SHAPE'|'MUSIC'|'ANALYZER'} type
	 */
	setType(type: string) {
		switch (type) {
			case RecognitionType.TEXT:
				this._selectedRenderer = this._textRenderer;
				this._selectedRESTRecognizer = this._textRecognizer;
				this._selectedWSRecognizer = this._textWSRecognizer;
				break;
			default:
				throw new Error('Unknown type: ' + type);
		}
		this._instanceId = undefined;
		this._initialized = false;
		this._lastSentComponentIndex = 0;
	};

	/**
	 * Get recognition type
	 *
	 * @method getType
	 * @returns {'TEXT'|'MATH'|'SHAPE'|'MUSIC'|'ANALYZER'} type
	 */
	getType(): string {
		if (this._selectedRenderer instanceof TextRenderer) {
			return RecognitionType.TEXT;
		}
		throw new Error('Unknown type');
	};

	/**
	 * Get the recognition timeout
	 *
	 * @method getTimeout
	 * @returns {Number}
	 */
	getTimeout(): number {
		return this.timeout;
	};

	/**
	 * Set the recognition timeout
	 *
	 * @method setTimeout
	 * @param {Number} timeout
	 */
	setTimeout(timeout: number) {
		this.timeout = timeout;
	};

	/**
	 * Set the recognition precision
	 *
	 * @method setPrecision
	 * @param {Number} precision
	 */
	setPrecision(precision: number) {
		this._textRecognizer.setPrecision(precision);
		this._textWSRecognizer.setPrecision(precision);
	};

	/**
	 * Get the default components
	 *
	 * @method getComponents
	 * @return {Array} components
	 */
	getComponents(): AbstractComponent[] {
		return this.options.components;
	};

	/**
	 * Set the default components
	 *
	 * @method setComponents
	 * @param {Array} components
	 */
	setComponents(components: AbstractComponent[]) {
		this.options.components = components;
		this._initRenderingCanvas();
	};


	/**
	 * Get the application key
	 *
	 * @method getApplicationKey
	 * @returns {String}
	 */
	getApplicationKey(): string {
		return this.applicationKey;
	};

	/**
	 * Set the application key
	 *
	 * @method setApplicationKey
	 * @param {String} applicationKey
	 */
	setApplicationKey(applicationKey: string) {
		this.applicationKey = applicationKey;
	};

	/**
	 * Get the HMAC key
	 *
	 * @method getHmacKey
	 * @returns {String}
	 */
	getHmacKey(): string {
		return this.hmacKey;
	};

	/**
	 * Set the HMAC key
	 *
	 * @method setHmacKey
	 * @param {String} hmacKey
	 */
	setHmacKey(hmacKey: string) {
		this.hmacKey = hmacKey;
	};

	/**
	 * Set text recognition parameters
	 *
	 * @method setTextParameters
	 * @param {TextParameter} textParameters
	 */
	setTextParameters(textParameters: TextParameter) {
		if (textParameters) {
			if (this._selectedRecognizer instanceof AbstractWSRecognizer) {
				this.isStarted = false;
				this._selectedRecognizer.resetWSRecognition();
			}
			for (let i in textParameters) {
				if (textParameters[i] !== undefined) {
					this._textRecognizer.getParameters()[i] = textParameters[i]; // Override options
					this._textWSRecognizer.getParameters()[i] = textParameters[i]; // Override options
				}
			}
		}
	};

	/**
	 * Get text recognition parameters
	 *
	 * @method getTextParameters
	 * @returns {TextParameter} textParameters
	 */
	getTextParameters(): TextParameter {
		return <TextParameter>this._textRecognizer.getParameters();
	};

	/**
	 * Set pen parameters
	 *
	 * @method setPenParameters
	 * @param {PenParameters} penParameters
	 */
	setPenParameters(penParameters: PenParameters) {
		if (penParameters) {
			for (let i in penParameters) {
				if (penParameters[i] !== undefined) {
					this._selectedRenderer.getParameters()[i] = penParameters[i]; // Override options
				}
			}
			let params = this._selectedRenderer.getParameters();
			this._inkGrabber.setParameters(params); // Override options
			this._textRenderer.setParameters(params); // Override options
		}
	};

	/**
	 * Get pen parameters
	 *
	 * @method getPenParameters
	 * @returns {PenParameters} penParameters
	 */
	getPenParameters(): PenParameters {
		return this._selectedRenderer.getParameters();
	};

	/**
	 * Enable / disable typeset
	 *
	 * @method setTypeset
	 * @param {Boolean} typeset
	 */
	setTypeset(typeset: boolean) {
		this._textRenderer.setTypeset(typeset);
	};

	/**
	 * Get available languages
	 *
	 * @method getAvailableLanguages
	 * @param {String} [inputMode] input mode
	 */
	getAvailableLanguages(inputMode?: string) {
		return this._selectedRESTRecognizer.getAvailableLanguageList(
			this.getApplicationKey(),
			inputMode ? inputMode : (<TextParameter>this._textRecognizer.getParameters()).getInputMode()
		);
	};

	/**
	 * Get the renderer
	 *
	 * @method getRenderer
	 * @returns {AbstractRenderer}
	 */
	getRenderer(): AbstractRenderer {
		return this._selectedRenderer;
	};

	/**
	 * Get the ink capturer
	 *
	 * @method getInkGrabber
	 * @returns {InkGrabber}
	 */
	getInkGrabber(): InkGrabber {
		return this._inkGrabber;
	};

	/**
	 * Get the recognizer
	 *
	 * @method getRecognizer
	 * @returns {AbstractRecognizer}
	 */
	getRecognizer(): AbstractRecognizer {
		return <AbstractRecognizer>this._selectedRecognizer;
	};

	/**
	 * Set the change callback
	 *
	 * @method setChangeCallback
	 * @param {Function} callback callback function
	 * @param {Object} callback.data The inkPaper state
	 */
	setChangeCallback(changeCallback: (data?: InkChangeData) => any | void) {
		this.changeCallback = changeCallback;
	};

	/**
	 * Set the recognition result callback
	 *
	 * @method setResultCallback
	 * @param {Function} callback callback function
	 * @param {Object} callback.data The recognition result
	 */
	setResultCallback(callback: (data?, error?) => any | void) {
		this.resultCallback = callback;
	};

	/**
	 * Recognize
	 *
	 * @method recognize
	 * @returns {Promise}
	 */
	recognize(): Q.Promise<any> | void {
		let input = this.getComponents().concat(this._components);
		if (this._selectedRecognizer instanceof AbstractWSRecognizer) {
			if (this._initialized) {
				let lastInput = input.slice(this._lastSentComponentIndex);

				if (lastInput.length > 0) {
					this._lastSentComponentIndex = input.length;
					if (!this.isStarted) {
						this.isStarted = true;
						return (<AbstractWSRecognizer>this._selectedRecognizer)
							.startWSRecognition(lastInput);
					}
					return (<AbstractWSRecognizer>this._selectedRecognizer)
						.continueWSRecognition(lastInput, this._instanceId);
				}
				return this._renderResult();
			}
		} else {

			if (input.length > 0) {
				if (!this.isStarted) {
					return this._startRESTRecognition(input);
				}
				return this._continueRESTRecognition(input, this._instanceId);
			}
			return this._renderResult();
		}
	};

	private _startRESTRecognition(components: AbstractComponent[]): Q.Promise<any> {
		this._instanceId = undefined;
		return (<AbstractRecognizer>this._selectedRecognizer).doSimpleRecognition(
			this.getApplicationKey(),
			this._instanceId,
			components,
			this.getHmacKey()
		).then(data => {
			if (!this.isStarted) {
				this.isStarted = true;
				this._lastSentComponentIndex = components.length;
				this._instanceId = data.getInstanceId();
				return this._renderResult(data);
			}
		}).catch(error => this._onResult(undefined, error));
	};

	private _continueRESTRecognition(components: AbstractComponent[], instanceId: string): Q.Promise<any> {
		return (<AbstractRecognizer>this._selectedRecognizer).doSimpleRecognition(
			this.getApplicationKey(),
			instanceId,
			components,
			this.getHmacKey()
		).then(data => {
			this._lastSentComponentIndex = this._lastSentComponentIndex + components.length;
			return this._renderResult(data);
		}).catch(error => this._onResult(undefined, error));
	};

	private _clearRESTRecognition(instanceId: string) {
		this._onResult();
	};

	/**
	 * Return true if you can undo
	 *
	 * @method canUndo
	 * @returns {Boolean}
	 */
	canUndo(): boolean {
		return this._components.length > 0;
	};

	/**
	 * Undo
	 *
	 * @method undo
	 */
	undo() {
		if (this.canUndo()) {
			//Remove the scratched state for Math strokes
			this._components.forEach(stroke => {
				stroke.scratchedStroke = false;
			});
			//Remove the latsModel used for Shape
			this.updatedModel = undefined;

			this._redoComponents.push(this._components.pop());

			this._clearRESTRecognition(this._instanceId);

			this._initRenderingCanvas();
			this._onChange();

			this.isStarted = false;
			if (this._selectedRecognizer instanceof AbstractWSRecognizer) {
				this._selectedRecognizer.resetWSRecognition();
			} else {
				clearTimeout(this._timerId);
				if (this.getTimeout() > -1) {
					this._timerId = setTimeout(this.recognize.bind(this), this.getTimeout());
				} else {
					this._onResult();
				}
			}
		}
	};

	/**
	 * Return true if you can redo
	 *
	 * @method canRedo
	 * @returns {Boolean}
	 */
	canRedo(): boolean {
		return this._redoComponents.length > 0;
	};

	/**
	 * Redo
	 *
	 * @method redo
	 */
	redo() {
		if (this.canRedo()) {
			this._components.push(this._redoComponents.pop());

			this._clearRESTRecognition(this._instanceId);

			this._initRenderingCanvas();
			this._onChange();

			if (this._selectedRecognizer instanceof AbstractWSRecognizer) {
				this.recognize();
			} else {
				clearTimeout(this._timerId);
				this.isStarted = false;
				if (this.getTimeout() > -1) {
					this._timerId = setTimeout(this.recognize.bind(this), this.getTimeout());
				} else {
					this._onResult();
				}
			}
		}
	};

	/**
	 * Clear the ink paper
	 *
	 * @method clear
	 */
	clear() {
		this._components = [];
		this._redoComponents = [];
		this._initRenderingCanvas();
		this._clearRESTRecognition(this._instanceId);

		this._onChange();

		if (this._selectedRecognizer instanceof AbstractWSRecognizer) {
			this.isStarted = false;
			this._selectedRecognizer.resetWSRecognition();
		} else {
			clearTimeout(this._timerId);
			if (this.getTimeout() > -1) {
				this._timerId = setTimeout(this.recognize.bind(this), this.getTimeout());
			} else {
				this._onResult();
			}
		}
	};

	event = {
		addDomListener: (element, useCapture, myfunction) => {
			element.addEventListener(useCapture, myfunction);
		}
	};

	/**
	 *
	 * @private
	 * @method _down
	 * @param {Number} x X coordinate
	 * @param {Number} y Y coordinate
	 * @param {Date} [t] timeStamp
	 */
	private _down(x: number, y: number, t: Date | number) {
		clearTimeout(this._timerId);
		let sizeChanged = false;
		if (this._captureCanvas.clientHeight * this.canvasRatio !== this._captureCanvas.height) {
			this._captureCanvas.height = this._captureCanvas.clientHeight * this.canvasRatio;
			this._renderingCanvas.height = this._renderingCanvas.clientHeight * this.canvasRatio;
			sizeChanged = true;
		}

		if (this._captureCanvas.clientWidth * this.canvasRatio !== this._captureCanvas.width) {
			this._captureCanvas.width = this._captureCanvas.clientWidth * this.canvasRatio;
			this._renderingCanvas.width = this._renderingCanvas.clientWidth * this.canvasRatio;
			sizeChanged = true;
		}

		//Safari trash the canvas content when heigth or width are modified.
		if (sizeChanged) {

			this._captureCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);
			this._renderingCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);
			this._initRenderingCanvas();
		}

		if (this.canRedo()) {
			this._redoComponents = [];
			this._onChange();
		}

		this._inkGrabber.startCapture(x, y, t);
	};

	/**
	 *
	 * @private
	 * @method _move
	 * @param {Number} x X coordinate
	 * @param {Number} y Y coordinate
	 * @param {Date} [t] timeStamp
	 */
	private _move(x: number, y: number, t: Date | number) {
		this._inkGrabber.continueCapture(x, y, t);
	};

	/**
	 *
	 * @private
	 * @method _move
	 * @param {Number} x X coordinate
	 * @param {Number} y Y coordinate
	 * @param {Date} [t] timeStamp
	 */
	private _up(x: number, y: number, t: Date | number) {
		this._inkGrabber.endCapture(x, y, t);

		let stroke = this._inkGrabber.getStroke();

		this._inkGrabber.clear();
		this._selectedRenderer.drawComponent(stroke);

		this._components.push(stroke);
		this._onChange();

		if (this._selectedRecognizer instanceof AbstractWSRecognizer) {
			if (!this._selectedRecognizer.isOpen() && !this._selectedRecognizer.isConnecting()) {
				this._selectedRecognizer.open();
			} else {
				this.recognize();
			}
		} else {
			clearTimeout(this._timerId);
			if (this.getTimeout() > -1) {
				this._timerId = setTimeout(this.recognize.bind(this), this.getTimeout());
			}
		}
	};

	private _onResult(data?, err?) {
		if (this.resultCallback) {
			this.resultCallback(data, err);
		}
		if (err) {
			this._element.dispatchEvent(new CustomEvent('error', { detail: err }));
		} else {
			this._element.dispatchEvent(new CustomEvent('success', { detail: data }));
		}
	};

	private _onChange() {
		let data = <InkChangeData>{
			canUndo: this.canUndo(),
			undoLength: this._components.length,
			canRedo: this.canRedo(),
			redoLength: this._redoComponents.length
		};

		if (this.changeCallback) {
			this.changeCallback(data)
		}
		this._element.dispatchEvent(new CustomEvent('changed', { detail: data }));
	};

	private _renderResult(data?) {
		this.updatedModel = this._selectedRenderer.drawRecognitionResult(this.getComponents().concat(this._components), data ? data.getDocument() : undefined);
		this._onResult(data);
		return data;
	};

	/**
	 * Set recognition service url
	 *
	 * @param {String} host
	 */
	setHost(host: string) {
		this._textRecognizer.setHost(host);
		this._textWSRecognizer.setHost(host);
	};

	/**
	 * @private
	 */
	private setSSL(ssl) {
		this._textRecognizer.setSSL(ssl);
		this._textWSRecognizer.setSSL(ssl);
	};

	/**
	 * Tool to attach touch events
	 *
	 * @private
	 * @param {Element} element
	 */
	private _attachListeners(element: HTMLElement) {
		let self = this;
		let pointerId;

		//Desactivation of contextmenu to prevent safari to fire pointerdown only once
		element.addEventListener("contextmenu", function (e) {
			e.preventDefault();
			e.stopPropagation();
			return false;
		});

		element.addEventListener('pointerdown', function (e) {
			if (!pointerId) {
				pointerId = e.pointerId;
				e.preventDefault(); pointerId
				let coord = InkPaper.getCoordinates(e, element);
				self._down(coord.x, coord.y, coord.t);
			}
		}, false);

		element.addEventListener('pointermove', function (e) {
			if (pointerId === e.pointerId) {
				e.preventDefault();

				let coord = InkPaper.getCoordinates(e, element);
				self._move(coord.x, coord.y, coord.t);
			}
		}, false);

		element.addEventListener('pointerup', function (e) {
			if (pointerId === e.pointerId) {
				e.preventDefault();

				let coord = InkPaper.getCoordinates(e, element);
				self._up(coord.x, coord.y, coord.t);

				pointerId = undefined;
			}
		}, false);

		element.addEventListener('pointerleave', function (e) {
			if (pointerId === e.pointerId) {
				e.preventDefault();

				let point = self._inkGrabber.getStroke().getPointByIndex(self._inkGrabber.getStroke().getLastIndexPoint());
				self._up(point.x, point.y, point.t);
				pointerId = undefined;
			}
		}, false);

		element.addEventListener('pointerout', function (e) {
			if (pointerId === e.pointerId) {
				e.preventDefault();

				let point = self._inkGrabber.getStroke().getPointByIndex(self._inkGrabber.getStroke().getLastIndexPoint());
				self._up(point.x, point.y, point.t);
				pointerId = undefined;
			}
		}, false);
	};

	private _initRenderingCanvas() {
		this._selectedRenderer.clear();
		this._selectedRenderer.drawComponents(this.getComponents().concat(this._components));
	};

	/**
	 *
	 * @param message
	 * @param error
	 * @returns {boolean} false no immediate replay needed, true when the call need to be replay ASAP
	 * @private
	 */
	private _handleMessage(message, error?): boolean {
		let replayNeeded = false;
		if (error) {
			replayNeeded = true;
			this._instanceId = undefined;
			this.isStarted = false;
			this._lastSentComponentIndex = 0;
			this._onResult(undefined, error);
		}

		if (message) {
			switch (message.type) {
				case 'open':
					this._selectedWSRecognizer.initWSRecognition(this.getApplicationKey());
					break;
				case 'hmacChallenge':
					this._selectedWSRecognizer.takeUpHmacChallenge(this.getApplicationKey(), message.getChallenge(), this.getHmacKey());
					break;
				case 'init':
					this.isStarted = false;
					this._initialized = true;
					this._instanceId = undefined;
					this._lastSentComponentIndex = 0;
					this.recognize();
					break;
				case 'reset':
					this.isStarted = false;
					this._instanceId = undefined;
					this._lastSentComponentIndex = 0;
					this.recognize();
					break;
				case 'close':
					this._initialized = false;
					this._instanceId = undefined;
					this._lastSentComponentIndex = 0;
					break;
				default:
					this.isStarted = true;
					if (!this._instanceId) {
						this._instanceId = message.getInstanceId();
					}
					this._renderResult(message);
					break;
			}
		}
		return replayNeeded;
	};

	/**
	 * Return the stats allowing to monitor what ink size is send to the server.
	 * @returns Stats objects format {strokesCount : 0, pointsCount : 0, byteSize : 0, humanSize : 0, humanUnit : 'BYTE'} humanUnit could have the values BYTE, BYTES, KiB, MiB
	 */
	getStats(): Object {
		let stats = {
			strokesCount: 0,
			pointsCount: 0,
			byteSize: 0,
			humanSize: 0,
			humanUnit: 'BYTE'
		};

		if (this._components) {
			stats.strokesCount = this._components.length;
			let pointsCount = 0;
			for (let strokeNb = 0; strokeNb < this._components.length; strokeNb++) {
				pointsCount = pointsCount + (<StrokeComponent[]>this._components)[strokeNb].x.length;
			}
			stats.strokesCount = this._components.length;
			stats.pointsCount = pointsCount;
			//We start with 270 as it is the size in bytes. Make a real computation implies to recode a doRecogntion
			let byteSize = 270;
			byteSize = JSON.stringify(this._components).length;
			stats.byteSize = byteSize;
			if (byteSize < 270) {
				stats.humanUnit = 'BYTE';
				stats.byteSize = 0;
				stats.humanSize = 0;
			} else if (byteSize < 2048) {
				stats.humanUnit = 'BYTES';
				stats.humanSize = byteSize;
			} else if (byteSize < 1024 * 1024) {
				stats.humanUnit = 'KiB';
				stats.humanSize = parseFloat((byteSize / 1024).toFixed(2));
			} else {
				stats.humanUnit = 'MiB';
				stats.humanSize = parseFloat((byteSize / 1024 / 1024).toFixed(2));
			}
		}
		return stats;
	};

	/**
	 *
	 * @param marginX the horizontal margin to apply (by default 10)
	 * @param marginY the vertical margin to apply (by default 10)
	 * @returns {ImageData} Build an ImageData object with content shrink to border of strokes.
	 * @private
	 */
	private getInkAsImageData(marginX: number = 10, marginY: number = 10): ImageData {
		//Remove the scratched strokes
		let componentCopy = [];
		this._components.forEach(stroke => {
			if (stroke.scratchedStroke !== true) {
				componentCopy.push(stroke);
			}
		}
		);

		if (!marginX) {
			marginX = 10;
		}
		if (!marginY) {
			marginY = 10;
		}

		if (componentCopy && componentCopy.length > 0) {
			//Initializing min and max
			let minX = componentCopy[0].x[0];
			let maxX = componentCopy[0].x[0];
			let minY = componentCopy[0].y[0];
			let maxY = componentCopy[0].y[0];

			// Computing the min and max for x and y
			for (let strokeNb = 0; strokeNb < componentCopy.length; strokeNb++) {
				let pointCount = componentCopy[strokeNb].x.length;
				for (let pointNb = 0; pointNb < pointCount; pointNb++) {
					let currentX = componentCopy[strokeNb].x[pointNb];
					let currentY = componentCopy[strokeNb].y[pointNb];
					if (currentX < minX) {
						minX = currentX;
					}
					if (currentX > maxX) {
						maxX = currentX;
					}
					if (currentY < minY) {
						minY = currentY;
					}
					if (currentY > maxY) {
						maxY = currentY;
					}
				}
			}
			let nonDisplayCanvas = document.createElement('canvas');
			nonDisplayCanvas.width = (maxX) + (2 * marginX);
			nonDisplayCanvas.height = (maxY) + (2 * marginY)

			let ctx = nonDisplayCanvas.getContext("2d");

			let imageRendered = new ImageRenderer(ctx);
			imageRendered.drawComponents(componentCopy);

			// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
			return ctx.getImageData(minX - marginX, minY - marginY, (maxX - minX) + (2 * marginX), (maxY - minY) + (2 * marginY));
		}
	};

	/**
	 *
	 * @param marginX the horizontal margin to apply (by default 10)
	 * @param marginY the vertical margin to apply (by default 10)
	 * @returns {String} Build an String containg dataUrl with content shrink to border of strokes.
	 * @private
	 */
	private getInkAsPng(marginX: number = 10, marginY: number = 10): string {
		let imageRenderingCanvas = document.createElement('canvas');
		imageRenderingCanvas.style.display = 'none';

		let imageDataToRender = this.getInkAsImageData();
		imageRenderingCanvas.width = imageDataToRender.width;
		imageRenderingCanvas.style.width = imageDataToRender.width + 'px';
		imageRenderingCanvas.height = imageDataToRender.height;
		imageRenderingCanvas.style.height = imageDataToRender.height + 'px';
		let ctx = imageRenderingCanvas.getContext('2d');
		ctx.putImageData(imageDataToRender, 0, 0);
		return imageRenderingCanvas.toDataURL("image/png");
	};

	/**
	 * Tool to create canvas
	 *
	 * @private
	 * @param {Element} parent
	 * @param {String} id
	 * @returns {Element}
	 */
	static createCanvas(parent: HTMLElement, id: string, styles?: Object): HTMLCanvasElement {
		let count = document.querySelectorAll('canvas[id^=' + id + ']').length;
		let canvas = document.createElement('canvas');
		canvas.id = id + '-' + count;
		if(styles){
			for(let key in styles){
				if(styles.hasOwnProperty(key)){
					canvas.style[key] = styles[key];
				}
			}
		}
		parent.appendChild(canvas);
		return canvas;
	}

	/**
	 * Tool to get canvas ratio (retina display)
	 *
	 * @private
	 * @param {Element} canvas
	 * @returns {Number}
	 */
	static getCanvasRatio(canvas: HTMLCanvasElement): number {
		if (canvas) {
			let context = canvas.getContext('2d'),
				devicePixelRatio = window.devicePixelRatio || 1,
				backingStoreRatio = (<any>context).webkitBackingStorePixelRatio ||
					(<any>context).mozBackingStorePixelRatio ||
					(<any>context).msBackingStorePixelRatio ||
					(<any>context).oBackingStorePixelRatio ||
					(<any>context).backingStorePixelRatio || 1;
			return devicePixelRatio / backingStoreRatio;
		}
		return 1;
	}

	/**
	 * Tool to get proper coordinates
	 *
	 * @private
	 * @param {Event} e
	 * @param {Element} element
	 * @returns {Object}
	 */
	static getCoordinates(e, container: HTMLElement): Point {
		if (e instanceof TouchEvent) e = e.changedTouches[0];
		let rect = container.getBoundingClientRect();
		return <Point>{
			x: e.clientX - rect.left - container.clientLeft,
			y: e.clientY - rect.top - container.clientTop,
			t: e.timeStamp
		};
	}
}