/**
 * Text ink ranges parameter
 * 
 * @export
 * @interface TextInkRangeParameter
 */
export interface TextInkRangeParameter {
	startUnit?: number;
	startComponent?: number;
	startPoint?: number;
	endUnit?: number;
	endComponent?: number;
	endPoint?: number;
}

/**
 * Text ink ranges
 * 
 * @export
 * @class TextInkRange
 */
export class TextInkRange {
	startUnit: number;
	startComponent: number;
	startPoint: number;
	endUnit: number;
	endComponent: number;
	endPoint: number;

	/**
	 * Creates an instance of TextInkRange.
	 * @param {(string | TextInkRangeParameter)} [obj] 
	 * 
	 * @memberof TextInkRange
	 */
	constructor(obj?: string | TextInkRangeParameter) {
		if (obj) {
			if (typeof obj === 'string') {
				let cpt = obj.split(/[:-]+/);
				this.startUnit = Number(cpt[0]);
				this.startComponent = Number(cpt[1]);
				this.startPoint = Number(cpt[2]);
				this.endUnit = Number(cpt[3]);
				this.endComponent = Number(cpt[4]);
				this.endPoint = Number(cpt[5]);
			} else {
				this.startUnit = obj.startUnit;
				this.startComponent = obj.startComponent;
				this.startPoint = obj.startPoint;
				this.endUnit = obj.endUnit;
				this.endComponent = obj.endComponent;
				this.endPoint = obj.endPoint;
			}
		}
	}

	/**
	 * Get start unit
	 *
	 * @method getStartUnit
	 * @returns {Number}
	 */
	getStartUnit(): number {
		return this.startUnit;
	};

	/**
	 * Get end unit
	 *
	 * @method getEndUnit
	 * @returns {Number}
	 */
	getEndUnit(): number {
		return this.endUnit;
	};

	/**
	 * Get start component
	 *
	 * @method getStartComponent
	 * @returns {Number}
	 */
	getStartComponent(): number {
		return this.startComponent;
	};

	/**
	 * Get end component
	 *
	 * @method getEndComponent
	 * @returns {Number}
	 */
	getEndComponent(): number {
		return this.endComponent;
	};

	/**
	 * Get start point
	 *
	 * @method getStartPoint
	 * @returns {Number}
	 */
	getStartPoint(): number {
		return this.startPoint;
	};

	/**
	 * Get end point
	 *
	 * @method getEndPoint
	 * @returns {Number}
	 */
	getEndPoint(): number {
		return this.endPoint;
	};

}