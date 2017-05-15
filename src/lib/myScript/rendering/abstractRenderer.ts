import { AbstractComponent } from '../input/generic/components/AbstractComponent';
import { Rectangle } from '../common/generic/rectangle';
import { Point } from '../common/generic/point';
import { PenParameters } from '../common/penParameters';

import { StrokeComponent } from '../input/generic/components/strokeComponent';
import { CharacterInputComponent } from '../input/generic/components/characterInputComponent';

/**
 * Represent the Abstract Renderer. It's used to calculate the ink rendering in HTML5 canvas
 * 
 * @export
 * @abstract
 * @class AbstractRenderer
 */
export abstract class AbstractRenderer {
	penParameters = new PenParameters();
	showBoundingBoxes = false;
	typeset = true;

	constructor(public context: CanvasRenderingContext2D) {
	}

	/**
		* Get the context
		*
		* @returns {Object}
		*/
	getContext(): CanvasRenderingContext2D {
		return this.context;
	};

	/**
	 * This property is use to show or not show the bounding box
	 *
	 * @method getShowBoundingBoxes
	 * @returns {Boolean}
	 */
	getShowBoundingBoxes(): boolean {
		return this.showBoundingBoxes;
	};

	/**
	 * Set the show state of bounding box
	 *
	 * @method setShowBoundingBoxes
	 * @param {Boolean} showBoundingBoxes
	 */
	setShowBoundingBoxes(showBoundingBoxes: boolean) {
		this.showBoundingBoxes = showBoundingBoxes;
	};

	/**
	 * Get the default pen parameters
	 *
	 * @returns {PenParameters}
	 */
	getParameters(): PenParameters {
		return this.penParameters;
	};

	/**
	 * Set the default pen parameters
	 *
	 * @param {PenParameters} penParameters
	 */
	setParameters(penParameters: PenParameters) {
		this.penParameters = penParameters;
	};

	/**
	 * Is typesetting
	 *
	 * @returns {Boolean}
	 */
	isTypesetting(): boolean {
		return this.typeset;
	};

	/**
	 * Enable / disable typesetting
	 *
	 * @param {Boolean} typeset
	 */
	setTypeset(typeset: boolean) {
		this.typeset = typeset;
	};

	/**
	 * Clear the recognition context
	 *
	 * @method clear
	 */
	clear() {
		this.getContext().clearRect(0, 0, this.getContext().canvas.width, this.getContext().canvas.height);
	};

	/**
	 * Draw recognition result on HTML5 canvas.
	 *
	 * @method drawRecognitionResult
	 * @param {AbstractComponent[]} components
	 * @param {Object} recognitionResult
	 */
	abstract drawRecognitionResult(components: Array<AbstractComponent>, recognitionResult: Object);

	/**
	 * Draw input components
	 *
	 * @method drawComponents
	 * @param {AbstractComponent[]} components
	 */
	abstract drawComponents(components: Array<AbstractComponent>);

	/**
	 * Draw component
	 *
	 * @method drawComponent
	 * @param {AbstractComponent} component
	 */
	drawComponent(component: AbstractComponent) {
		if (component instanceof StrokeComponent) {
			this._drawStroke(<StrokeComponent>component,
				this.getContext(), this.getParameters());
		} else if (component instanceof CharacterInputComponent) {
			this._drawCharacter(<CharacterInputComponent>component,
				this.getContext(), this.getParameters());
		} else {
			throw new Error('Component not implemented: ' + component.getType());
		}
	};

	/**
	 * Draw stroke component
	 *
	 * @private
	 * @method _drawStroke
	 * @param {StrokeComponent} stroke
	 * @param {Object} context
	 * @param {PenParameters} parameters
	 */
	private _drawStroke(stroke?: StrokeComponent, context?: CanvasRenderingContext2D, parameters?: PenParameters) { // jshint ignore:line
		if (stroke && stroke.getLength() > 0) {
			AbstractRenderer._renderStroke(stroke, context);
		}
	};

	/**
	 * Draw character component
	 *
	 * @private
	 * @method _drawCharacter
	 * @param {CharacterInputComponent} character
	 * @param {Object} context
	 * @param {PenParameters} parameters
	 */
	private _drawCharacter(character, context, parameters) {
		throw new Error('not implemented');
	};

	/**
	 * Draw a rectangle on context
	 *
	 * @private
	 * @method _drawRectangle
	 * @param {Rectangle} rectangle
	 * @param {Object} context
	 * @param {PenParameters} parameters
	 */
	private _drawRectangle(rectangle: Rectangle, context: CanvasRenderingContext2D, parameters: PenParameters) {
		context.save();
		try {
			context.fillStyle = parameters.getRectColor();
			context.strokeStyle = parameters.getColor();
			context.lineWidth = 0.5 * parameters.getWidth();
			context.fillRect(rectangle.getX(), rectangle.getY(), rectangle.getWidth(), rectangle.getHeight());
		} finally {
			context.restore();
		}
	}

	static _computeLinksPoints(point: Point, angle: number, width: number): Point[] {
		let radius = point.p * width;
		return <Array<Point>>[
			{
				x: (point.x - Math.sin(angle) * radius),
				y: (point.y + Math.cos(angle) * radius)
			}, {
				x: (point.x + Math.sin(angle) * radius),
				y: (point.y - Math.cos(angle) * radius)
			}
		];
	}

	static _computeMiddlePoint(point1: Point, point2: Point): Point {
		return <Point>{
			x: ((point2.x + point1.x) / 2),
			y: ((point2.y + point1.y) / 2),
			p: ((point2.p + point1.p) / 2)
		};
	}

	static _computeAxeAngle(begin: Point, end: Point): number {
		return Math.atan2(end.y - begin.y, end.x - begin.x);
	}

	static _fill(context: CanvasRenderingContext2D, color: string) {
		if (color !== undefined) {
			context.fillStyle = color;
			context.fill();
		}
	}

	/**
	 *
	 * @param stroke
	 * @param context
	 * @param parameters
	 * @private
	 */
	static _renderStroke(stroke: StrokeComponent, context: CanvasRenderingContext2D) {
		context.beginPath();
		let length = stroke.getLength();
		let width = stroke.getWidth();
		let firstPoint = stroke.getPointByIndex(0);
		if (length < 3) {
			context.arc(firstPoint.x, firstPoint.y, width * 0.6, 0, Math.PI * 2, true);
		} else {
			context.arc(firstPoint.x, firstPoint.y, width * firstPoint.p, 0, Math.PI * 2, true);
			AbstractRenderer._renderLine(context, firstPoint, AbstractRenderer._computeMiddlePoint(firstPoint, stroke.getPointByIndex(1)), width);

			let nbquadratics = length - 2;
			for (let i = 0; i < nbquadratics; i++) {
				AbstractRenderer._renderQuadratic(context, AbstractRenderer._computeMiddlePoint(stroke.getPointByIndex(i), stroke.getPointByIndex(i + 1)), AbstractRenderer._computeMiddlePoint(stroke.getPointByIndex(i + 1), stroke.getPointByIndex(i + 2)), stroke.getPointByIndex(i + 1), width);
			}

			AbstractRenderer._renderLine(context, AbstractRenderer._computeMiddlePoint(stroke.getPointByIndex(length - 2), stroke.getPointByIndex(length - 1)), stroke.getPointByIndex(length - 1), width);

			AbstractRenderer._renderFinal(context, stroke.getPointByIndex(length - 2), stroke.getPointByIndex(length - 1), width);
		}
		context.closePath();
		AbstractRenderer._fill(context, stroke.getColor());
	}

	static _renderFinal(context: CanvasRenderingContext2D, begin: Point, end: Point, width: number) {
		let ARCSPLIT = 6;
		let angle = AbstractRenderer._computeAxeAngle(begin, end);
		let linkPoints = AbstractRenderer._computeLinksPoints(end, angle, width);
		context.moveTo(linkPoints[0].x, linkPoints[0].y);
		for (let i = 1; i <= ARCSPLIT; i++) {
			let newAngle = angle - i * Math.PI / ARCSPLIT;
			context.lineTo(end.x - end.p * width * Math.sin(newAngle), end.y + end.p * width * Math.cos(newAngle));
		}
	}

	static _renderLine(context: CanvasRenderingContext2D, begin: Point, end: Point, width) {
		let linkPoints1 = AbstractRenderer._computeLinksPoints(begin, AbstractRenderer._computeAxeAngle(begin, end), width);
		let linkPoints2 = AbstractRenderer._computeLinksPoints(end, AbstractRenderer._computeAxeAngle(begin, end), width);

		context.moveTo(linkPoints1[0].x, linkPoints1[0].y);
		context.lineTo(linkPoints2[0].x, linkPoints2[0].y);
		context.lineTo(linkPoints2[1].x, linkPoints2[1].y);
		context.lineTo(linkPoints1[1].x, linkPoints1[1].y);
	}

	static _renderQuadratic(context: CanvasRenderingContext2D, begin: Point, end: Point, ctrl: Point, width: number) {
		let linkPoints1 = AbstractRenderer._computeLinksPoints(begin, AbstractRenderer._computeAxeAngle(begin, ctrl), width);
		let linkPoints2 = AbstractRenderer._computeLinksPoints(end, AbstractRenderer._computeAxeAngle(ctrl, end), width);
		let linkPoints3 = AbstractRenderer._computeLinksPoints(ctrl, AbstractRenderer._computeAxeAngle(begin, end), width);

		context.moveTo(linkPoints1[0].x, linkPoints1[0].y);
		context.quadraticCurveTo(linkPoints3[0].x, linkPoints3[0].y, linkPoints2[0].x, linkPoints2[0].y);
		context.lineTo(linkPoints2[1].x, linkPoints2[1].y);
		context.quadraticCurveTo(linkPoints3[1].x, linkPoints3[1].y, linkPoints1[1].x, linkPoints1[1].y);
	}
}