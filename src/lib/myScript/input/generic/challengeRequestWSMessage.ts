import { AbstractWSMessage } from '../../common/abstractWSMessage';

/**
 * WebSocket recognition hmac challenge message
 * 
 * @export
 * @class ChallengeRequestWSMessage
 * @extends {AbstractWSMessage}
 */
export class ChallengeRequestWSMessage extends AbstractWSMessage {
	challenge: string;
	applicationKey: string;
	hmac: string;

	/**
	 * Creates an instance of ChallengeRequestWSMessage.
	 * @param {Object} [obj] Recognition WebSocket message
	 * 
	 * @memberof ChallengeRequestWSMessage
	 */
	constructor(obj?) {
		super(obj);
		this.type = 'hmac';
	}

	/**
		* Get the challenge
		*
		* @method getChallenge
		* @returns {String}
		*/
	getChallenge(): string {
		return this.challenge;
	};

	/**
	 * Set the challenge
	 *
	 * @method setChallenge
	 * @param {String} challenge
	 */
	setChallenge(challenge: string) {
		this.challenge = challenge;
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
	 * Get HMAC signature
	 *
	 * @method getHmacSignature
	 * @returns {String}
	 */
	getHmacSignature(): string {
		return this.hmac;
	};

	/**
	 * Set HMAC signature
	 *
	 * @method setHmacSignature
	 * @param {String} hmac
	 */
	setHmacSignature(hmac: string) {
		this.hmac = hmac;
	};
}