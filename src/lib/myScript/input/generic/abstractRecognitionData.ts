import { AbstractRecognitionInput} from './abstractRecognitionInput';

/**
 * Abstract input recognition data
 * 
 * @export
 * @abstract
 * @class AbstractRecognitionData
 */
export abstract class AbstractRecognitionData {
	applicationKey: string;
	instanceId: string;
	hmac: string;

	constructor() { }

	/**
	 * Get the application key
	 *
	 * @method getApplicationKey
	 * @returns {String}
	 */
	getApplicationKey() {
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
	 * Get the instanceId
	 *
	 * @method getInstanceId
	 * @returns {String}
	 */
	getInstanceId(): string {
		return this.instanceId;
	};

	/**
	 * Set the instanceId
	 *
	 * @method setInstanceId
	 * @param {String} instanceId
	 */
	setInstanceId(instanceId: string) {
		this.instanceId = instanceId;
	};

	/**
	 * @returns {string}
	 */
	getHmac(): string {
		return this.hmac;
	};

	/**
	 * @param {string} hmac
	 */
	setHmac(hmac: string) {
		this.hmac = hmac;
	};

	/**
	 * Get recognition input
	 *
	 * @method getRecognitionInput
	 * @returns {AbstractRecognitionInput} input
	 */
	abstract getRecognitionInput(): AbstractRecognitionInput;

	/**
	 * Set text input
	 *
	 * @method setRecognitionInput
	 * @param {AbstractRecognitionInput} input
	 */
	abstract setRecognitionInput(input: AbstractRecognitionInput);

}