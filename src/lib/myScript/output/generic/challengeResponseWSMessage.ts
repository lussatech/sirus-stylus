import { AbstractWSMessage } from '../../common/abstractWSMessage';

/**
 * WebSocket recognition hmac challenge message
 * 
 * @export
 * @class ChallengeResponseWSMessage
 * @extends {AbstractWSMessage}
 */
export class ChallengeResponseWSMessage extends AbstractWSMessage {
	challenge: string;

	constructor(obj?) {
		super(obj);
		this.challenge = obj && obj.challenge;
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
}