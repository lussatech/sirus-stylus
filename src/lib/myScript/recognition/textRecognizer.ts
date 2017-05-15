import { AbstractRecognizer } from './abstractRecognizer';
import { TextParameter } from '../input/text/textParameter';
import { AbstractComponent } from '../input/generic/components/abstractComponent';
import { TextInputUnit } from '../input/text/textInputUnit';
import { TextRecognitionInput } from '../input/text/textRecognitionInput';

export class TextRecognizer extends AbstractRecognizer {
	parameters: TextParameter;

	constructor(host?: string) {
		super(host);
		this.parameters = new TextParameter();
		this.parameters.setLanguage('en_US');
		this.parameters.setInputMode('CURSIVE');
	}

	/**
	 * Do text recognition
	 *
	 * @method doSimpleRecognition
	 * @param {String} applicationKey
	 * @param {String} instanceId
	 * @param {AbstractComponent[]|TextInputUnit[]} components
	 * @param {String} hmacKey
	 * @param {TextParameter} [parameters]
	 * @returns {Promise}
	 */
	doSimpleRecognition(applicationKey: string, instanceId: string, components: AbstractComponent[] | TextInputUnit[], hmacKey: string, parameters?: TextParameter) {
		let params = <TextParameter>this.getParameters();
		if (parameters) {
			params = parameters;
		}
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
		let input = new TextRecognitionInput();
		input.setParameters(params);
		input.setInputUnits(inputUnits);
		return AbstractRecognizer.prototype.doRestRecognition.call(this, input, applicationKey, hmacKey, instanceId); // super
	};

}