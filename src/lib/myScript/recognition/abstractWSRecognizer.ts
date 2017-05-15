import { NetworkWSInterface } from '../networking/networkWSInterface';
import { NetworkInterface } from '../networking/networkInterface';

import { AbstractParameter } from '../input/generic/abstractParameter';
import { InitRequestWSMessage } from '../input/generic/initRequestWSMessage';
import { ChallengeRequestWSMessage } from '../input/generic/challengeRequestWSMessage';
import { ResetRequestWSMessage } from '../input/generic/resetRequestWSMessage';
import { StrokeComponent } from '../input/generic/components/strokeComponent';

import CryptoJS from 'crypto-js';

export abstract class AbstractWSRecognizer {
	_wsInterface: NetworkWSInterface;
	_ssl: boolean;
	parameters: AbstractParameter;
	precision: number;

	constructor() {
		this._wsInterface = new NetworkWSInterface();
	}

	getProtocol(): string {
		return this._ssl ? 'wss://' : 'ws://';
	};

	getSSL(): boolean {
		return this._ssl;
	};

	setSSL(ssl: boolean) {
		this._ssl = ssl;
		this.setUrl(this.getProtocol() + this.getHost());
	};

	/**
	 * Get the recognition service host
	 *
	 * @method getHost
	 * @returns {string|String|*}
	 */
	getHost(): string | any {
		return NetworkInterface.parseURL(this.getUrl()).host;
	};

	/**
	 * Set the recognition service host
	 *
	 * @method setHost
	 * @param {String}
	 */
	setHost(host?: string) {
		if ((host !== undefined) && (host != this.getHost())) {
			this.setUrl(this.getProtocol() + host);
		}
	};

	setUrl(url: string) {
		throw new Error('not implemented');
	};

	getUrl(): string {
		return this._wsInterface.getUrl();
	};

	setCallback(callback: Function) { // jshint ignore:line
		throw new Error('not implemented');
	};

	/**
	 * Get parameters
	 *
	 * @method getParameters
	 * @returns {AbstractParameter}
	 */
	getParameters(): AbstractParameter {
		return this.parameters;
	};

	/**
	 * Set parameters
	 *
	 * @method setParameters
	 * @param {AbstractParameter} parameters
	 */
	setParameters(parameters: AbstractParameter) {
		this.parameters = parameters;
	};

	/**
	 * Get precision
	 *
	 * @method getPrecision
	 * @returns {Number}
	 */
	getPrecision(): number {
		return this.precision;
	};

	/**
	 * Set precision
	 *
	 * @method setPrecision
	 * @param {Number} precision
	 */
	setPrecision(precision: number) {
		this.precision = precision;
	};

	isClosed(): boolean {
		return this._wsInterface.isClosed();
	};

	isClosing(): boolean {
		return this._wsInterface.isClosing();
	};

	isOpen(): boolean {
		return this._wsInterface.isOpen();
	};

	isConnecting(): boolean {
		return this._wsInterface.isConnecting();
	};

	/**
	 * Open the socket
	 *
	 * @method open
	 */
	open() {
		this._wsInterface.open();
	};

	/**
	 * Close the socket
	 *
	 * @method close
	 */
	close() {
		this._wsInterface.close();
	};

	/**
	 * Send a message
	 *
	 * @method sendMessage
	 * @param {AbstractWSMessage} message
	 */
	sendMessage(message) {
		if (message.getComponents) {
			AbstractWSRecognizer._filterStrokes(message.getComponents(), this.getPrecision());
		} else if (message.getInputUnits) {
			for (let i in message.getInputUnits()) {
				AbstractWSRecognizer._filterStrokes(message.getInputUnits()[i].getComponents(), this.getPrecision());
			}
		}
		this._wsInterface.send(message);
	};

	/**
	 * Initialize the WebSocket
	 *
	 * @method initWSRecognition
	 * @param {String} applicationKey
	 */
	initWSRecognition(applicationKey: string) {
		let message = new InitRequestWSMessage();
		message.setApplicationKey(applicationKey);
		this.sendMessage(message);
	};

	/**
	 * Start the WebSocket session
	 * 
	 * @abstract
	 * @param {any} [components] 
	 * @param {any} [parameters] 
	 * 
	 * @memberof AbstractWSRecognizer
	 */
	abstract startWSRecognition(components, parameters?);

	/**
	 * Continue the recognition
	 * 
	 * @abstract
	 * @param {any} components 
	 * @param {string} instanceId 
	 * 
	 * @memberof AbstractWSRecognizer
	 */
	abstract continueWSRecognition(components, instanceId: string)

	/**
	 * Authenticate the WebSocket client end with a handshake of HMAC signature
	 *
	 * @method takeUpHmacChallenge
	 * @param {String} applicationKey
	 * @param {String} challenge
	 * @param {String} hmacKey
	 */
	takeUpHmacChallenge(applicationKey: string, challenge: string, hmacKey: string) {
		let message = new ChallengeRequestWSMessage();
		message.setApplicationKey(applicationKey);
		message.setChallenge(challenge);
		if (hmacKey) {
			message.setHmacSignature(AbstractWSRecognizer._computeHmac(challenge, applicationKey, hmacKey));
		}
		this.sendMessage(message);
	};

	/**
	 * Reset the WebSocket recognition session
	 *
	 * @method resetWSRecognition
	 */
	resetWSRecognition() {
		let message = new ResetRequestWSMessage();
		this.sendMessage(message);
	};

	/**
	 * Compute HMAC signature for server authentication
	 *
	 * @private
	 * @method _computeHmac
	 * @param {String} input
	 * @param {String} applicationKey
	 * @param {String} hmacKey
	 */
	static _computeHmac(input, applicationKey: string, hmacKey: string) {
		let jsonInput: string = (typeof input === 'object') ? JSON.stringify(input) : input;
		return CryptoJS.HmacSHA512(jsonInput, applicationKey + hmacKey)
			.toString();
	};

	static _filterStrokes(components, precision) {
		components.forEach(function (currentValue) {
			if (currentValue instanceof StrokeComponent) {
				currentValue.toFixed(precision);
			}
		});
	};

}