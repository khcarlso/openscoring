/**
 * 
 */
var OSServerURL = null;
var request = require('request');

module.exports = {
	summary: function (model) {
		var promise = new Promise((resolve, reject) => {
			// path = /model
			if (!OSServerURL) {
				reject("Null or Empty OpenScoring server URL");
			}
			var endpoint = OSServerURL + "/model";
			if (model) {
				endpoint = `${endpoint}/${model}`;
			}
			var options = {
				method: "GET",
				uri: endpoint,
				json: true
			};
			request(options, (err, response, body) => {
				if (err) {
					reject(err);
				} else {
					resolve(body);
				}
			});

		});
		return promise;
	},

	pmml: function (model) {
		var promise = new Promise((resolve, reject) => {
			// path = /model
			if (!OSServerURL) {
				reject("Null or Empty OpenScoring server URL");
			}
			if (!model) {
				reject("Call to pmml requires valid model name");
			}
			var endpoint = `${OSServerURL}/model/${model}/pmml`;
			var options = {
				method: "GET",
				uri: endpoint,
				json: true
			};
			request(options, (err, response, body) => {
				if (err) {
					reject(err);
				} else {
					resolve(body);
				}
			});

		});
		return promise;
	},

	evaluate: function (model, data) {
		var promise = new Promise((resolve, reject) => {
			if (!OSServerURL) {
				reject("Null or Empty OpenScoring server URL");
			}
			if (!model) {
				reject("Must specify a model when calling evaluate");
			}

			var endpoint = `${OSServerURL}/model/${model}`;
			if (data.hasOwnProperty('requests')) {
				endpoint = `${endpoint}/batch`;
			}
			var options = {
				method: "POST",
				uri: endpoint,
				json: true,
				body: data
			};
			request(options, (err, response, body) => {
				if (err) {
					reject(err);
				} else {
					resolve(body);
				}
			});


		});
		return promise;
	},

	metric: function (model) {
		var promise = new Promise((resolve, reject) => {
			// path = /model
			if (!OSServerURL) {
				reject("Null or Empty OpenScoring server URL");
			}

			var endpoint = `${OSServerURL}/metric/model`;
			if (model) {
				endpoint = `${endpoint}/${model}`;
			}
			var options = {
				method: "GET",
				uri: endpoint,
				json: true
			};
			request(options, (err, response, body) => {
				if (err) {
					reject(err);
				} else {
					resolve(body);
				}
			});

		});
		return promise;
	},

	setURL: function (url) {
		if (url[url.length - 1] === '/') {
			url = url.substr(url.length - 1);
		}
		OSServerURL = url;
	},

	getURL: function () {
		return OSServerURL;
	}
}




