import { AbstractComponent } from './abstractComponent';
import { Rectangle } from '../../../common/generic/rectangle';
import { Point } from '../../../common/generic/point';

/**
 * StrokeComponentParameters
 * 
 * @export
 * @interface StrokeComponentParameters
 */
export interface StrokeComponentParameters {
	x?: number[],
	y?: number[],
	t?: number[],
	p?: number[],
	d?: number[],
	l?: number[],
	color?: string,
	alpha?: number,
	width?: number,
}

/**
 * Represent a simple StrokeComponent input component
 * 
 * @export
 * @class StrokeComponent
 * @extends {AbstractComponent}
 */
export class StrokeComponent extends AbstractComponent {
	x: number[];
	y: number[];
	t: number[] | Date[];
	p: number[];
	d: number[];
	l: number[];
	color: string;
	alpha: number;
	width: number;

	constructor(obj?: StrokeComponentParameters) {
		super();
		this.type = 'stroke';
		this.x = obj && obj.x || [];
		this.y = obj && obj.y || [];
		this.t = obj && obj.t || [];
		this.p = obj && obj.p || [];
		this.d = obj && obj.d || [];
		this.l = obj && obj.l || [];
		this.color = obj && obj.color || '#000';
		this.alpha = obj && obj.alpha || 1;
		this.width = obj && obj.width || 0;
	}

	/**
		 * @method toJSON
		 * @returns {Object}
		 */
	toJSON(): Object {
		return { type: this.type, x: this.x, y: this.y, t: this.t };
	};

	/**
	 * Get the list of x coordinates
	 *
	 * @method getX
	 * @returns {Number[]}
	 */
	getX(): number[] {
		return this.x;
	};

	/**
	 * Set the list of x coordinates
	 *
	 * @method setX
	 * @param {Number[]} x
	 */
	setX(x: number[]) {
		this.x = x;
	};

	/**
	 * Add a x to the list of x coordinates
	 *
	 * @method addX
	 * @param {Number} x
	 */
	addX(x: number) {
		this.x.push(x);
	};

	/**
	 * Get the list of y coordinates
	 *
	 * @method getY
	 * @returns {Number[]}
	 */
	getY(): number[] {
		return this.y;
	};

	/**
	 * Set the list of y coordinates
	 *
	 * @method setY
	 * @param {Number[]} y
	 */
	setY(y: number[]) {
		this.y = y;
	};

	/**
	 * Add a y to the list of y coordinates
	 *
	 * @method addY
	 * @param {Number} y
	 */
	addY(y: number) {
		this.y.push(y);
	};

	/**
	 * Get the list of timestamps
	 *
	 * @method getT
	 * @returns {Number[]}
	 */
	getT(): number[] | Date[] {
		return this.t;
	};

	/**
	 * Set the list of timestamps
	 *
	 * @method setT
	 * @param {Number[]} t
	 */
	setT(t: number[] | Date[]) {
		this.t = t;
	};

	/**
	 * Add a timestamp to the list
	 *
	 * @method addT
	 * @param {Number} t
	 */
	addT(t: number | Date) {
		(<any>this.t).push(t);
	};

	getLength(): number {
		return this.x.length;
	};

	/**
	 * Get the boundingBox
	 *
	 * @method getBoundingBox
	 * @returns {Rectangle}
	 */
	getBoundingBox(): Rectangle {
		let boundingBox = new Rectangle();
		boundingBox.setX(Math.min.apply(Math, this.getX()));
		boundingBox.setY(Math.min.apply(Math, this.getY()));
		boundingBox.setWidth(Math.max.apply(Math, this.getX()) - boundingBox.getX());
		boundingBox.setHeight(Math.max.apply(Math, this.getY()) - boundingBox.getY());
		return boundingBox;
	};

	/**
	 * Set input component bounding-box
	 *
	 * @method setBoundingBox
	 * @param {Rectangle} boundingBox
	 */
	setBoundingBox(boundingBox: Rectangle) {
		throw new Error('not implemented');
	};

	toFixed(precision) {
		if (precision !== undefined) {
			for (let i in this.x) {
				this.x[i] = parseFloat(this.x[i].toFixed(precision));
				this.y[i] = parseFloat(this.y[i].toFixed(precision));
			}
		}
	};

	getP(): number[] {
		return this.p;
	};

	setP(p: number[]) {
		this.p = p;
	};

	addP(p: number) {
		if ((p !== null) && (p !== undefined)) {
			this.p.push(p);
		}
	};

	getD(): number[] {
		return this.d;
	};

	setD(d: number[]) {
		this.d = d;
	};

	addD(d: number) {
		if ((d !== null) && (d !== undefined)) {
			this.d.push(d);
		}
	};

	getL(): number[] {
		return this.l;
	};

	setL(l: number[]) {
		this.l = l;
	};

	addL(l: number) {
		if ((l !== null) && (l !== undefined)) {
			this.l.push(l);
		}
	};

	getColor(): string {
		return this.color;
	};

	setColor(color: string) {
		this.color = color;
	};

	getWidth(): number {
		return this.width;
	};

	setWidth(width: number) {
		this.width = width;
	};

	addPoint(x: number, y: number, t: number | Date) {
		if (StrokeComponent._filterPointByAcquisitionDelta(x, y, this.getX(), this.getY(), this.getLastIndexPoint(), this.getWidth(), this.getLength())) {
			this.addX(x);
			this.addY(y);
			this.addT(t);
			this.addP(StrokeComponent._computePressure(x, y, this.getX(), this.getY(), this.getL(), this.getLastIndexPoint()));
			this.addD(StrokeComponent._computeDistance(x, y, this.getX(), this.getY(), this.getLastIndexPoint()));
			this.addL(StrokeComponent._computeLength(x, y, this.getX(), this.getY(), this.getL(), this.getLastIndexPoint()));
		}
	};

	getLastIndexPoint(): number {
		return this.x.length - 1;
	};

	getPointByIndex(index): Point {
		let point;
		if (index !== undefined && index >= 0 && index < this.getLength()) {
			point = {
				x: this.getX()[index],
				y: this.getY()[index],
				t: this.getT()[index],
				p: this.getP()[index],
				d: this.getD()[index],
				l: this.getL()[index]
			};
		}
		return point;
	};

	static _computeDistance(x, y, xArray, yArray, lastIndexPoint) {
		let distance = Math.sqrt(Math.pow((y - yArray[lastIndexPoint - 1]), 2) + Math.pow((x - xArray[lastIndexPoint - 1]), 2));

		if (isNaN(distance)) {
			distance = 0;
		}

		return distance;
	}

	static _computeLength(x, y, xArray, yArray, lArray, lastIndexPoint) {
		let length = lArray[lastIndexPoint - 1] + StrokeComponent._computeDistance(x, y, xArray, yArray, lastIndexPoint);

		if (isNaN(length)) {
			length = 0;
		}

		return length;
	}

	static _computePressure(x, y, xArray, yArray, lArray, lastIndexPoint) {
		let ratio = 1.0;
		let distance = StrokeComponent._computeDistance(x, y, xArray, yArray, lastIndexPoint);
		let length = StrokeComponent._computeLength(x, y, xArray, yArray, lArray, lastIndexPoint);

		if (length === 0) {
			ratio = 0.5;
		} else if (distance == length) {
			ratio = 1.0;
		} else if (distance < 10) {
			ratio = 0.2 + Math.pow(0.1 * distance, 0.4);
		} else if (distance > length - 10) {
			ratio = 0.2 + Math.pow(0.1 * (length - distance), 0.4);
		}
		let pressure = ratio * Math.max(0.1, 1.0 - 0.1 * Math.sqrt(distance));
		if (isNaN(pressure)) {
			pressure = 0.5;
		}
		return pressure;
	}

	static _filterPointByAcquisitionDelta(x, y, xArray, yArray, lastIndexPoint, width, length) {
		let delta = (2 + (width / 4));
		let ret = false;
		if (length === 0 || Math.abs(xArray[lastIndexPoint] - x) >= delta || Math.abs(yArray[lastIndexPoint] - y) >= delta) {
			ret = true;
		}
		return ret;
	}
}