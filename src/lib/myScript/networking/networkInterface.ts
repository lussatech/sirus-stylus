import Q from 'q';

/**
 * Network interface
 * 
 * @export
 * @class NetworkInterface
 */
export class NetworkInterface {
	static parseURL(url) {
		let parser = document.createElement('a'),
			searchObject = {},
			queries, split, i;
		// Let the browser do the work
		parser.href = url;
		// Convert query string to object
		queries = parser.search.replace(/^\?/, '').split('&');
		for (i = 0; i < queries.length; i++) {
			split = queries[i].split('=');
			searchObject[split[0]] = split[1];
		}

		return {
			protocol: parser.protocol,
			host:     parser.host,
			hostname: parser.hostname,
			port:     parser.port,
			pathname: parser.pathname,
			search:   parser.search,
			hash:     parser.hash,
			searchObject
		};
	};

	/**
	 * Parse JSON String to Object
	 *
	 * @method parse
	 * @param {Object} req
	 * @returns {String}
	 */
	static parse(req: XMLHttpRequest): Object {
		let result: Object;
		try {
			result = JSON.parse(req.responseText);
		} catch (e) {
			result = req.responseText;
		}
		return result;
	};

	/**
	 * Transform object data request to a list of parameters
	 *
	 * @method transformRequest
	 * @param {Object} [obj]
	 * @returns {String}
	 */
	static transformRequest(obj?: Object) {
		let str = [];
		for (let p in obj) {
			if ((typeof obj[p] !== 'undefined') &&
				(typeof obj[p] !== 'function')) {
				str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
			}
		}
		return str.join('&');
	};

	/**
	 * Send request to the network and return a promise
	 *
	 * @method xhr
	 * @param {String} type
	 * @param {String} url
	 * @param {Object} data
	 * @returns {Promise}
	 */
	static xhr(type: string, url: string, data: Object): Q.Promise<any> {

		return Q.Promise(function (resolve, reject, notify) {

			function onStateChange() {
				if (request.readyState === 4) {
					if (request.status >= 200 && request.status < 300) {
						resolve(NetworkInterface.parse(request));
					}
				}
			}

			function onLoad() {
				if (request.status >= 200 && request.status < 300) {
					resolve(NetworkInterface.parse(request));
				} else {
					reject(new Error(request.responseText));
				}
			}

			function onError() {
				reject(new Error('Can\'t XHR ' + url));
			}

			function onProgress(e) {
				notify(e.loaded / e.total);
			}

			let request = new XMLHttpRequest();
			request.open(type, url, true);
			request.withCredentials = true;
			request.setRequestHeader('Accept', 'application/json');
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
			request.onerror = onError;
			request.onprogress = onProgress;
			request.onload = onLoad;
			request.onreadystatechange = onStateChange;
			request.send(NetworkInterface.transformRequest(data));
		});
	};

	/**
	 * Get request
	 *
	 * @method get
	 * @param {String} src
	 * @param {Object} params
	 * @returns {Promise}
	 */
	static get(src:string, params: Object): Q.Promise<any> {
		if (params) {
			src += '?' + NetworkInterface.transformRequest(params);
		}
		return NetworkInterface.xhr('GET', src, undefined);
	};

	/**
	 * Put request
	 *
	 * @method put
	 * @param {String} url
	 * @param {Object} data
	 * @returns {Promise}
	 */
	static put(url: string, data: Object): Q.Promise<any> {
		return NetworkInterface.xhr('PUT', url, data);
	};

	/**
	 * Post request
	 *
	 * @method post
	 * @param {String} url
	 * @param {Object} data
	 * @returns {Promise}
	 */
	static post(url: string, data: Object): Q.Promise<any> {
		return NetworkInterface.xhr('POST', url, data);
	};

	/**
	 * Delete request
	 *
	 * @method delete
	 * @param {String} url
	 * @param {Object} data
	 * @returns {Promise}
	 */
	static delete(url: string, data: Object): Q.Promise<any> {
		return NetworkInterface.xhr('DELETE', url, data);
	};
}