/**
 * Network interface
 * 
 * @export
 * @class NetworkWSInterface
 */
export class NetworkWSInterface {
	private _url: string;
	private _callback: Function;
	private _socket: WebSocket;

	constructor() {	}

	setUrl(url: string) {
		if ((url !== undefined) && (url !== this._url)) {
			this.close();
			this._url = url;
		}
	};

	getUrl(): string {
		return this._url;
	};

	setCallback(callback: Function) {
		if (callback !== undefined) {
			this.close();
			this._callback = callback;
		}
	};

	getCallback(): Function {
		return this._callback;
	};

	getState(): number {
		return NetworkWSInterface._getWebSocketState(this._socket);
	};

	isClosed(): boolean {
		return this.getState() === 3;
	};

	isClosing(): boolean {
		return this.getState() === 2;
	};

	isOpen(): boolean {
		return this.getState() === 1;
	};

	isConnecting(): boolean {
		return this.getState() === 0;
	};

	open() {
		if (this.getUrl() && this.getCallback() && ((this.getState() < 0) || this.isClosed())) {
			this._socket = NetworkWSInterface._openWebSocket(this.getUrl(), this.getCallback());
		}
	};

	close(code?: number, reason?: string) {
		if (this.getState() < 2) {
			NetworkWSInterface._closeWebSocket(this._socket, code, reason);
		}
	};

	send(request: Object | string) {
		let state = NetworkWSInterface._getWebSocketState(this._socket);
		if (state === 1) {
			NetworkWSInterface._sendMessage(this._socket, request);
		} else {
			this.open();
		}
	};

	/**
	 *
	 * @param url
	 * @param callback
	 * @returns {WebSocket}
	 * @private
	 */
	private static _openWebSocket(url: string, callback: Function): WebSocket {
		function onOpen(e) {
			callback(e);
		}
		function onClose(e) {
			callback(e);
		}
		function onError(e) {
			callback(e);
		}
		function onMessage(e) {
			callback({
				type: e.type,
				data: JSON.parse(e.data)
			});
		}

		let socket = new WebSocket(url);
		socket.onopen = onOpen;
		socket.onclose = onClose;
		socket.onerror = onError;
		socket.onmessage = onMessage;
		return socket;
	};

	/**
	 *
	 * @param socket
	 * @param code
	 * @param reason
	 * @private
	 */
	private static _closeWebSocket(socket: WebSocket, code?:number, reason?: string) {
		if (socket) {
			socket.close(code, reason);
		}
	};

	/**
	 *
	 * @param socket
	 * @returns {*}
	 * @private
	 */
	private static _getWebSocketState(socket: WebSocket): number {
		if (socket) {
			return socket.readyState;
		}
		return -1;
	};

	/**
	 *
	 * @param socket
	 * @param message
	 * @private
	 */
	private static _sendMessage(socket: WebSocket, message: Object | string) {
		if (socket) {
			socket.send(JSON.stringify(message));
		}
	};
}
