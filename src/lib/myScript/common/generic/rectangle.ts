import { Point } from './point';

/**
 * RectangleParameters
 * 
 * @export
 * @interface RectangleParameters
 */
export interface RectangleParameters {
	x: number,
	y: number,
	width: number,
	height: number,
}

/**
 * Rectangle
 * 
 * @export
 * @class Rectangle
 */
export class Rectangle {
	x: number;
	y: number;
	width: number;
	height: number;

	constructor(obj?: RectangleParameters) {
		this.x = obj && obj.x || 0;
		this.y = obj && obj.y || 0;
		this.width = obj && obj.width || 0;
		this.height = obj && obj.height || 0;
	}

	/**
	 * Get top-left x
	 *
	 * @method getX
	 * @returns {Number}
	 */
	getX(): number {
		return this.x;
	};

	/**
	 * Set top-left x
	 *
	 * @method setX
	 * @param {Number} x
	 */
	setX(x: number) {
		this.x = x;
	};

	/**
	 * Get top-left y
	 *
	 * @method getY
	 * @returns {Number}
	 */
	getY(): number {
		return this.y;
	};

	/**
	 * Set top-left y
	 *
	 * @method setY
	 * @param {Number} y
	 */
	setY(y: number) {
		this.y = y;
	};

	/**
	 * Get top-left point
	 *
	 * @method getTopLeftPoint
	 * @returns {Point}
	 */
	getTopLeftPoint(): Point {
		let point = new Point();
		point.setX(this.x);
		point.setY(this.y);
		return point;
	};

	/**
	 * Set top-left point
	 *
	 * @method setTopLeftPoint
	 * @param {Point} topLeftPoint
	 */
	setTopLeftPoint(topLeftPoint) {
		this.x = topLeftPoint.getX();
		this.y = topLeftPoint.getY();
	};

	/**
	 * Get width
	 *
	 * @method getWidth
	 * @returns {Number}
	 */
	getWidth() {
		return this.width;
	};

	/**
	 * Set width
	 *
	 * @method setWidth
	 * @param {Number} width
	 */
	setWidth(width) {
		this.width = width;
	};

	/**
	 * Get height
	 *
	 * @method getHeight
	 * @returns {Number}
	 */
	getHeight() {
		return this.height;
	};

	/**
	 * Set height
	 *
	 * @method setHeight
	 * @param {Number} height
	 */
	setHeight(height) {
		this.height = height;
	};
}