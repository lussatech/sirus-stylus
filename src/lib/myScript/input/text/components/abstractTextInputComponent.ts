import { AbstractComponent } from '../../generic/components/abstractComponent';
import { Rectangle } from '../../../common/generic/rectangle';

/**
 * Abstract text input component
 * 
 * @export
 * @class AbstractTextInputComponent
 * @extends {AbstractComponent}
 */
export class AbstractTextInputComponent extends AbstractComponent {
	/**
	 * Creates an instance of AbstractTextInputComponent.
	 * @param {{ boundingBox?: Rectangle }} [obj] 
	 * 
	 * @memberof AbstractTextInputComponent
	 */
	constructor(obj?: { boundingBox?: Rectangle }) {
		super();
		this.boundingBox = (obj && obj.boundingBox) ?
			new Rectangle(obj.boundingBox) : undefined;
	}

	/**
	 * Get input component bounding-box
	 *
	 * @method getBoundingBox
	 * @returns {Rectangle}
	 */
	getBoundingBox(): Rectangle {
		return this.boundingBox;
	};

	/**
	 * Set input component bounding-box
	 *
	 * @method setBoundingBox
	 * @param {Rectangle} boundingBox
	 */
	setBoundingBox(boundingBox: Rectangle) {
		this.boundingBox = boundingBox;
	};

}