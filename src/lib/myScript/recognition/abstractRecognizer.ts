import { AbstractParameter } from '../input/generic/abstractParameter';
import { RecognitionLanguagesData } from '../input/generic/recognitionLanguagesData';
import { AbstractRecognitionInput } from '../input/generic/abstractRecognitionInput';
import { StrokeComponent } from '../input/generic/components/strokeComponent';
import { AbstractComponent } from '../input/generic/components/abstractComponent';

import { NetworkInterface } from '../networking/networkInterface';

import { TextRecognitionInput } from '../input/text/textRecognitionInput';
import { TextRecognitionData } from '../input/text/textRecognitionData';
import { TextResult } from '../output/text/textResult';

import Q from 'q';
import CryptoJS from 'crypto-js';

/**
 * Abstract recognizer interface
 * 
 * @export
 * @class AbstractRecognizer
 */
export abstract class AbstractRecognizer {
	_ssl: boolean;
	url: string;
	parameters: AbstractParameter;
	precision: number;

	/**
	 * Creates an instance of AbstractRecognizer.
	 * @param {string} [host='cloud.myscript.com'] 
	 * 
	 * @memberof AbstractRecognizer
	 */
	constructor(host: string = 'cloud.myscript.com') {
		this.setUrl(this.getProtocol() + host);
		this.setSSL(true);
	}

	getProtocol(): string {
		return this._ssl ? 'https://' : 'http://';
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
	setHost(host: string) {
		this.setUrl(this.getProtocol() + host);
	};

	/**
	 * Get the recognition service host
	 *
	 * @method getUrl
	 * @returns {String}
	 */
	getUrl(): string {
		return this.url;
	};

	/**
	 * Set the recognition service url
	 *
	 * @method setUrl
	 * @param {String}
	 */
	setUrl(url: string) {
		this.url = url;
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

	/**
	 * Get the recognition languages available for an application and a specific inputMode
	 *
	 * @method getAvailableLanguageList
	 * @param {String} applicationKey
	 * @param {String} inputMode
	 * @returns {Promise}
	 */
	getAvailableLanguageList(applicationKey: string, inputMode: string): Q.Promise<any> {
		let data = new RecognitionLanguagesData();
		data.setApplicationKey(applicationKey);
		data.setInputMode(inputMode);

		return NetworkInterface.get(this.getUrl() +
			'/api/v3.0/recognition/rest/text/languages.json', data)
			.then(response => response.result);
	};

	/**
	 * Do REST recognition
	 *
	 * @private
	 * @method doRestRecognition
	 * @param {AbstractRecognitionInput} input
	 * @param {String} applicationKey
	 * @param {String} hmacKey
	 * @param {String} instanceId
	 * @returns {Promise}
	 */
	doRestRecognition(input, applicationKey: string, hmacKey: string, instanceId: string) {
		if (input.getComponents) {
			AbstractRecognizer._filterStrokes(input.getComponents(), this.getPrecision());
		} else if (input.getInputUnits) {
			for (let i in input.getInputUnits()) {
				AbstractRecognizer._filterStrokes(input.getInputUnits()[i].getComponents(), this.getPrecision());
			}
		}

		if (input instanceof TextRecognitionInput) {
			return AbstractRecognizer._doTextRecognition(this.getUrl(), input, applicationKey, hmacKey, instanceId);
		} else {
			throw new Error('not implemented');
		}
	};

	/**
	 * Do simple recognition
	 * 
	 * @abstract
	 * @param {string} applicationKey 
	 * @param {string} instanceId 
	 * @param {AbstractComponent[]} components 
	 * @param {string} hmacKey 
	 * @param {any} [parameters] 
	 * 
	 * @memberof AbstractRecognizer
	 */
	abstract doSimpleRecognition(applicationKey: string, instanceId: string, components: AbstractComponent[], hmacKey: string, parameters?): Q.Promise<any>;

	/**
	 * Do text recognition
	 *
	 * @private
	 * @method _doTextRecognition
	 * @param {String} url
	 * @param {TextRecognitionInput} input
	 * @param {String} applicationKey
	 * @param {String} hmacKey
	 * @param {String} instanceId
	 * @returns {Promise}
	 */
	static _doTextRecognition(url: string, input: TextRecognitionInput, applicationKey: string, hmacKey: string, instanceId: string) {
		let data = new TextRecognitionData();
		AbstractRecognizer._fillData(data, input, instanceId, applicationKey, hmacKey);

		return NetworkInterface.post(url + '/api/v3.0/recognition/rest/text/doSimpleRecognition.json', data).then(
			function success(response) {
				return new TextResult(response);
			}
		);
	};

	/**
	 * Compute HMAC signature for server authentication
	 *
	 * @private
	 * @method _computeHmac
	 * @param {AbstractRecognitionInput} input
	 * @param {String} applicationKey
	 * @param {String} hmacKey
	 */
	static _computeHmac(input: AbstractRecognitionInput, applicationKey: string, hmacKey: string) {
		let jsonInput = (typeof input === 'object') ? JSON.stringify(input) : input;
		return CryptoJS.HmacSHA512(jsonInput, applicationKey + hmacKey).toString();
	};

	static _filterStrokes(components, precision) {
		components.forEach(function (currentValue) {
			if (currentValue instanceof StrokeComponent) {
				currentValue.toFixed(precision);
			}
		});
	};

	static _fillData(data, input: AbstractRecognitionInput, instanceId: string, applicationKey: string, hmacKey?: string) {
		data.setRecognitionInput(input);
		data.setApplicationKey(applicationKey);
		data.setInstanceId(instanceId);
		if (hmacKey) {
			data.setHmac(AbstractRecognizer._computeHmac(data.getRecognitionInput(), applicationKey, hmacKey));
		}
	};
}