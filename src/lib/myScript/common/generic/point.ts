/**
 * PointParameters
 * 
 * @export
 * @interface PointParameters
 */
export interface PointParameters {
	x?: number;
	y?: number;
	t?: number | Date;
	p?: number;
	d?: number;
	l?: number;
}

/**
 * Point
 * 
 * @export
 * @class Point
 */
export class Point {
	x: number;
	y: number;
	t: number | Date;
	p: number;
	d: number;
	l: number;

	constructor(obj?: PointParameters) {
		this.x = obj && obj.x || 0;
		this.y = obj && obj.y || 0;
		this.t = obj && obj.t || 0;
		this.p = obj && obj.p || 0;
		this.d = obj && obj.d || 0;
		this.l = obj && obj.l || 0;
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

	getT(): number | Date {
		return this.t;
	};

	setT(t: number | Date) {
		this.t = t;
	};

	getP(): number {
		return this.p;
	};
	
	setP(p: number) {
		this.p = p;
	};

	getD(): number {
		return this.d;
	};
	
	setD(d: number) {
		this.d = d;
	};

	getL(): number {
		return this.l;
	};
	
	setL(l: number) {
		this.l = l;
	};
}