import { AbstractWSRecognizer } from './abstractWSRecognizer';

import { AbstractComponent } from '../input/generic/components/abstractComponent';

import { TextParameter } from '../input/text/textParameter';
import { TextInputUnit } from '../input/text/textInputUnit';
import { TextStartRequestWSMessage } from '../input/text/textStartRequestWSMessage';
import { TextContinueRequestWSMessage } from '../input/text/textContinueRequestWSMessage';

import { InitResponseWSMessage } from '../output/generic/initResponseWSMessage';
import { ResetResponseWSMessage } from '../output/generic/resetResponseWSMessage';
import { ErrorResponseWSMessage } from '../output/generic/errorResponseWSMessage';
import { ChallengeResponseWSMessage } from '../output/generic/challengeResponseWSMessage';
import { TextResponseWSMessage } from '../output/text/textResponseWSMessage';

/**
 * Text WebSocket recognizer interface
 * 
 * @export
 * @class TextWSRecognizer
 * @extends {AbstractWSRecognizer}
 */
export class TextWSRecognizer extends AbstractWSRecognizer {
	parameters: TextParameter;

	/**
	 * Creates an instance of TextWSRecognizer.
	 * @param {Function} callback The WebSocket response callback
	 * @param {string} [host] Recognition service host
	 * 
	 * @memberof TextWSRecognizer
	 */
	constructor(callback: Function, host: string = 'cloud.myscript.com') {
		super();
		this.parameters = new TextParameter();
		this.parameters.setLanguage('en_US');
		this.parameters.setInputMode('CURSIVE');
		this.setUrl(this.getProtocol() + host);
		this.setSSL(true);
		this.setCallback(callback);
	}

	/**
		* Get parameters
		*
		* @method getParameters
		* @returns {TextParameter}
		*/
	getParameters() {
		return this.parameters;
	};

	/**
	 * Set parameters
	 *
	 * @method setParameters
	 * @param {TextParameter} parameters
	 */
	setParameters(parameters) {
		this.parameters = parameters;
	};

	setUrl(url) {
		this._wsInterface.setUrl(url + '/api/v3.0/recognition/ws/text');
	};

	setCallback(callback) {
		if (callback !== undefined) {
			this._wsInterface.setCallback(function (message) {
				switch (message.type) {
					case 'open':
						callback(message);
						break;
					case 'close':
						callback(message);
						break;
					case 'error':
						callback(undefined, message);
						break;
					default:
						switch (message.data.type) {
							case 'init':
								message.data = new InitResponseWSMessage(message.data);
								callback(message.data);
								break;
							case 'reset':
								message.data = new ResetResponseWSMessage(message.data);
								callback(message.data);
								break;
							case 'error':
								message.data = new ErrorResponseWSMessage(message.data);
								callback(undefined, new Error(JSON.stringify(message.data.getError())));
								break;
							case 'hmacChallenge':
								message.data = new ChallengeResponseWSMessage(message.data);
								callback(message.data);
								break;
							default:
								message.data = new TextResponseWSMessage(message.data);
								callback(message.data);
								break;
						}
						break;
				}
			});
		}
	};

	/**
	 * Start the WebSocket session
	 *
	 * @method startWSRecognition
	 * @param {AbstractComponent[]|TextInputUnit[]} components
	 * @param {TextParameter} [parameters]
	 */
	startWSRecognition(components, parameters) {
		let message = new TextStartRequestWSMessage();
		let params = this.getParameters();
		if (parameters) {
			params = parameters;
		}
		let inputUnits = [];
		if (components && components.length > 0) {
			if (components[0] instanceof TextInputUnit) {
				inputUnits = components;
			} else {
				let unit = new TextInputUnit();
				unit.setComponents(components);
				inputUnits.push(unit);
			}
		}
		message.setParameters(params);
		message.setInputUnits(inputUnits);
		this.sendMessage(message);
	};

	/**
	 * Continue the recognition
	 *
	 * @method continueWSRecognition
	 * @param {AbstractComponent[]|TextInputUnit[]} components
	 * @param {String} instanceId
	 */
	continueWSRecognition(components: AbstractComponent[] | TextInputUnit[], instanceId: string) {
		let message = new TextContinueRequestWSMessage();
		let inputUnits = [];
		if (components && components.length > 0) {
			if (components[0] instanceof TextInputUnit) {
				inputUnits = components;
			} else {
				let unit = new TextInputUnit();
				unit.setComponents(<AbstractComponent[]>components);
				inputUnits.push(unit);
			}
		}
		message.setInputUnits(inputUnits);
		message.setInstanceId(instanceId);
		this.sendMessage(message);
	};
}