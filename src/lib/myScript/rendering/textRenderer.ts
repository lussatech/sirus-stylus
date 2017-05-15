import { AbstractRenderer } from './abstractRenderer';
import { AbstractComponent } from '../input/generic/components/abstractComponent';

import { PenParameters } from '../common/penParameters';
import { TextInputUnit } from '../input/text/textInputUnit';
import { AbstractTextInputComponent } from '../input/text/components/abstractTextInputComponent';
import { CharInputComponent } from '../input/text/components/charInputComponent';
import { StringInputComponent } from '../input/text/components/stringInputComponent';

import { TextDocument } from '../output/text/textDocument';


export class TextRenderer extends AbstractRenderer {
	constructor(context: CanvasRenderingContext2D) {
		super(context);
	}

	/**
	 * Draw text recognition result on HTML5 canvas. Scratch out results are use to redraw HTML5 Canvas
	 *
	 * @method drawRecognitionResult
	 * @param {AbstractComponent[]} components
	 * @param {TextDocument} recognitionResult
	 */
	drawRecognitionResult(components: AbstractComponent[], recognitionResult: TextDocument) {
		this.clear();
		this.drawComponents(components);
	};

	/**
	 * Draw components
	 *
	 * @method drawComponents
	 * @param {AbstractComponent[]} components
	 */
	drawComponents(components: AbstractComponent[]) {
		for (let i in components) {
			let component = components[i];
			if (component instanceof TextInputUnit) {
				this.drawComponents(component.getComponents());
			} else if (component instanceof AbstractTextInputComponent) {
				TextRenderer._drawTextComponent(component, this.getContext(), this.getParameters());
			} else if (component instanceof AbstractComponent) {
				AbstractRenderer.prototype.drawComponent.call(this, component); // super
			} else {
				throw new Error('not implemented');
			}
		}
	};

	/**
	 * Draw text component
	 *
	 * @private
	 * @method _drawTextComponent
	 * @param {AbstractTextInputComponent} component
	 * @param {Object} context
	 * @param {PenParameters} parameters
	 */
	static _drawTextComponent(component: AbstractTextInputComponent, context: CanvasRenderingContext2D, parameters: PenParameters) {
		if (component instanceof CharInputComponent) {
			TextRenderer._drawChar(component, context, parameters);
		} else if (component instanceof StringInputComponent) {
			TextRenderer._drawString(component, context, parameters);
		} else {
			throw new Error('Component not implemented: ' + component.getType());
		}
	};

	/**
	 * Draw char
	 *
	 * @private
	 * @method _drawChar
	 * @param {CharInputComponent} char
	 * @param {Object} context The canvas 2d context
	 * @param {PenParameters} parameters
	 */
	static _drawChar(char: CharInputComponent, context: CanvasRenderingContext2D, parameters: PenParameters) { // jshint ignore:line
		throw new Error('not implemented');
	};

	/**
	 * Draw string
	 *
	 * @private
	 * @method _drawString
	 * @param {StringInputComponent} string
	 * @param {Object} context The canvas 2d context
	 * @param {PenParameters} parameters
	 */
	static _drawString(string: StringInputComponent, context: CanvasRenderingContext2D, parameters: PenParameters) { // jshint ignore:line
		throw new Error('not implemented');
	};
}