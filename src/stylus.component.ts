import {
	Component,
	Input,
	Output,
	AfterViewInit,
	OnInit,
	ViewChild,
	ElementRef,
	EventEmitter
} from '@angular/core';

import {
	InkPaper,
	InkPaperOptions,
	RecognitionType,
	Protocol,
	PenParametersInput,
	InkChangeData
} from './lib/myScript/index';

import {
	StylusService
} from './stylus.service'

/**
 * Component to writing using stylus
 * this component will automatically translate user writing into text
 * 
 * @export
 * @class StylusComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
 * @implements {Input}
 * @implements {Output}
 * 
 * @example
 * <sirus-stylus
 * 	[pen]="pen"
 * 	width="300"
 * 	height="300"
 * 	timeout="20"
 * 	language="id_ID"
 * 	(onResult)="resultCallback($event)"
 * 	(onInkChange)="changeCallback($event)"
 * 	(onError)="errorCallback($event)">
 * </sirus-stylus>
 */
@Component({
	selector: 'sirus-stylus',
	templateUrl: './stylus.component.html',
	styleUrls: [ './stylus.component.scss' ]
})
export class StylusComponent implements OnInit, AfterViewInit, Input, Output {
	private _paper: InkPaper;
	private _options: InkPaperOptions;

	/**
	 * Pen Parameters
	 * 
	 * @type {PenParametersInput}
	 * @memberof StylusComponent
	 */
	@Input() pen: PenParametersInput;

	/**
	 * Width of the component
	 * 
	 * @type {number}
	 * @memberof StylusComponent
	 */
	@Input() width: number = 400;

	/**
	 * Height of the component
	 * 
	 * @type {number}
	 * @memberof StylusComponent
	 */
	@Input() height: number = 300;

	/**
	 * timeout in `ms` for stylus before making recognition attempt
	 * 
	 * @type {number}
	 * @memberof StylusComponent
	 */
	@Input() timeout: number = 25;

	/**
	 * languange to recognize
	 * 
	 * @type {string}
	 * @memberof StylusComponent
	 */
	@Input() language: string = 'en_US';

	/**
	 * callback when reconition result received
	 * 
	 * @type {EventEmitter<string>}
	 * @memberof StylusComponent
	 */
	@Output() onResult: EventEmitter<string> = new EventEmitter<string>();

	/**
	 * callback each time user making writing on stylus
	 * 
	 * @type {EventEmitter<InkChangeData>}
	 * @memberof StylusComponent
	 */
	@Output() onInkChange: EventEmitter<InkChangeData> = new EventEmitter<InkChangeData>();

	/**
	 * callback when error happen
	 * 
	 * @type {(EventEmitter<string | Error>)}
	 * @memberof StylusComponent
	 */
	@Output() onError: EventEmitter<string | Error> = new EventEmitter<string | Error>();

	@ViewChild('inkPaper') container: ElementRef;

	constructor(private stylusService: StylusService) { }

	/**
	 * Init options for stylus components
	 * 
	 * @memberof StylusComponent
	 */
	ngOnInit() {
		this._options = <InkPaperOptions>{
			host:  this.stylusService.host || "webdemoapi.myscript.com",
			applicationKey: this.stylusService.applicationKey,
			hmacKey: this.stylusService.hmacKey,
			type: RecognitionType.TEXT,
			protocol: Protocol.WS,
			width: this.width,
			height: this.height,
			timeout: this.timeout,
			textParameters: {
				language: this.language,
				resultDetail: 'TEXT',
				textProperties: {
					textCandidateListSize: 3
				}
			},
			penParameters: this.pen
		};
	}

	/**
	 * Create InkPaper for capture & rendering stylus ink
	 * Attarch `result`, `change` and `error` callback to it
	 * 
	 * @memberof StylusComponent
	 */
	ngAfterViewInit() {
		let element = this.container.nativeElement;
		element.style.height = this._options.height + 'px';
		element.style.width = this._options.width + 'px';

		this._paper = new InkPaper(element, this._options);

		this._paper.setResultCallback((data, error) => {
			if (error) return this.onError.emit(error);
			let text = '';
			if (data) {
				text = data.getDocument().getTextSegment()
					.getSelectedCandidate().getLabel() || '';
			}
			// send results
			this.onResult.emit(text);
		});

		// set change callback
		this._paper.setChangeCallback(change => {
			this.onInkChange.emit(change);
		});
	}

	/**
	 * Clear stylus
	 * 
	 * @memberof StylusComponent
	 */
	clear() {
		this._paper.clear();
	}

	/**
	 * Undo last edit on stylus
	 * 
	 * @memberof StylusComponent
	 */
	undo() {
		this._paper.undo();
	}

	/**
	 * Redo last undoing on stylus
	 * 
	 * @memberof StylusComponent
	 */
	redo() {
		this._paper.redo();
	}
}