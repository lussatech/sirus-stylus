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

@Component({
	selector: 'sirus-stylus',
	templateUrl: './stylus.html',
	styleUrls: [ './stylus.component.scss' ]
})
export class StylusComponent implements OnInit, AfterViewInit, Input, Output {
	private _paper: InkPaper;
	private _options: InkPaperOptions;

	@Input() pen: PenParametersInput;
	@Input() width: number = 400;
	@Input() height: number = 300;
	@Input() timeout: number = 25;
	@Input() language: string = 'en_US';

	@Output() onResult = new EventEmitter<string>();
	@Output() onInkChange = new EventEmitter<InkChangeData>();
	@Output() onError = new EventEmitter<string | Error>();

	@ViewChild('inkPaper') container: ElementRef;

	constructor(private stylusService: StylusService) { }

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

	clear() {
		this._paper.clear();
	}

	undo() {
		this._paper.undo();
	}

	redo() {
		this._paper.redo();
	}
}