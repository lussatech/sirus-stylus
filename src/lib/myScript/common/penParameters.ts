/**
 * PenParametersInput
 * 
 * @export
 * @interface PenParametersInput
 */
export interface PenParametersInput {
	color?: string,
	rectColor?: string,
	font?: string,
	decoration?: string,
	width?: number,
	pressureType?: string,
	alpha?: string,
}

/**
 * Parameters used for both input and output canvas draw.
 * 
 * @export
 * @class PenParameters
 */
export class PenParameters {
	color: string;
	rectColor: string;
	font: string;
	decoration: string;
	width: number;
	pressureType: string;
	alpha: string;

	constructor(obj?: PenParametersInput) {
		this.color = obj && obj.color || '#1580CD';
		this.rectColor = obj && obj.rectColor || 'rgba(0, 0, 0, 0.2)';
		this.font = obj && obj.font || 'Times New Roman';
		this.decoration = obj && obj.decoration || 'normal';
		this.width = obj && obj.width || 3;
		this.pressureType = obj && obj.pressureType || 'SIMULATED';
		this.alpha = obj && obj.alpha || '1.0';
	}

	/**
	 * Get the color renderer parameter
	 *
	 * @method getColor
	 * @returns {String} The color of the ink
	 */
	getColor(): string{
		return this.color;
	};

	/**
	 * Set the color renderer parameter
	 *
	 * @method setColor
	 * @param {String} color
	 */
	setColor(color: string) {
		this.color = color;
	};

	/**
	 * Get the rect renderer parameter
	 *
	 * @method getRectColor
	 * @returns {String} the rectangle color
	 */
	getRectColor(): string{
		return this.rectColor;
	};

	/**
	 * Set the rect renderer parameter
	 *
	 * @method setRectColor
	 * @param {String} rectColor
	 */
	setRectColor(rectColor: string) {
		this.rectColor = rectColor;
	};

	/**
	 * Get the font renderer parameter
	 *
	 * @method getFont
	 * @returns {String} The font
	 */
	getFont(): string{
		return this.font;
	};

	/**
	 * Set the font renderer parameter
	 *
	 * @method setFont
	 * @param {String} font
	 */
	setFont(font: string) {
		this.font = font;
	};

	/**
	 * Get the decoration renderer parameter
	 *
	 * @method getDecoration
	 * @returns {String} The decoration
	 */
	getDecoration(): string{
		return this.decoration;
	};

	/**
	 * Set the decoration renderer parameter
	 *
	 * @method setDecoration
	 * @param {String} decoration
	 */
	setDecoration(decoration: string) {
		this.decoration = decoration;
	};

	/**
	 * Get the width renderer parameter
	 *
	 * @method getWidth
	 * @returns {Number} The ink width
	 */
	getWidth(): number{
		return this.width;
	};

	/**
	 * Set the width renderer parameter
	 *
	 * @method setWidth
	 * @param {Number} width
	 */
	setWidth(width: number) {
		this.width = width;
	};

}