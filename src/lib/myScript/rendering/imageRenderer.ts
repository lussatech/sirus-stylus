import { AbstractRenderer } from './abstractRenderer';
import { AbstractComponent } from '../input/generic/components/abstractComponent';

/**
 * Represent the Image Renderer. It's used to calculate the Image ink rendering in HTML5 canvas
 * 
 * @export
 * @class ImageRenderer
 * @extends {AbstractRenderer}
 */
export class ImageRenderer extends AbstractRenderer {
	constructor(context: CanvasRenderingContext2D) {
		super(context);
	}

	/**
	 * Draw components
	 *
	 * @method drawComponents
	 * @param {AbstractComponent[]} components
	 */
	drawComponents(components) {
		for (let i in components) {
			let component = components[i];
			if (component instanceof AbstractComponent) {
				super.drawComponent(components);
			} else {
				throw new Error('not implemented');
			}
		}
	};

	/**
	 * Draw recognition result on HTML5 canvas.
	 * 
	 * @param {Array<AbstractComponent>} components 
	 * @param {Object} recognitionResult 
	 * 
	 * @memberof ImageRenderer
	 */
	drawRecognitionResult(components: Array<AbstractComponent>, recognitionResult: Object) {
		throw new Error('not implemented');
	}
}