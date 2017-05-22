import { AbstractRenderer } from './abstractRenderer';
import { StrokeComponent } from '../input/generic/components/strokeComponent';

export class InkGrabber extends AbstractRenderer {
	stroke: StrokeComponent;
	writing: boolean = false;

	constructor(context: CanvasRenderingContext2D) {
		super(context);
	}

	/**
	 * Is Writing a stroke
	 *
	 * @method isWriting
	 * @returns {Boolean}
	 */
	isWriting(): boolean {
		return this.writing;
	};

	/**
	 * Get the last wrote stroke
	 *
	 * @method getStroke
	 * @returns {StrokeComponent}
	 */
	getStroke(): StrokeComponent {
		return this.stroke;
	};

	startCapture(x: number, y: number, t: Date | number) {
		if (!this.writing) {
			this.writing = true;
			this.stroke = new StrokeComponent();
			this.stroke.setColor(this.penParameters.getColor());
			this.stroke.setWidth(this.penParameters.getWidth());
			this.stroke.addPoint(x, y, t);
			this.clear();
			this.drawComponent(this.stroke);
		} else {
			throw new Error('StrokeComponent capture already running');
		}
	}

	continueCapture(x: number, y: number, t: Date | number) {
		if (this.writing) {
			this.stroke.addPoint(x, y, t);
			this.clear();
			this.drawComponent(this.stroke);
		} else {
			throw new Error('Missing startInkCapture');
		}
	}

	endCapture(x: number, y: number, t: Date | number) {
		if (this.writing) {
			this.stroke.addPoint(x, y, t);
			this.clear();
			this.drawComponent(this.stroke);
			this.writing = false;
		} else {
			throw new Error('Missing startInkCapture');
		}
	}

	drawRecognitionResult(components, recognitionResult) {
		throw new Error('not implemented');
	}

	drawComponents(components) {
		throw new Error('not implemented');
	}
}