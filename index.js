'use strict'

var OSServerURL = null;
var request = require('request');

module.exports = {
	summary: function (model) {
		return new Promise((resolve, reject) => {
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
	},

	pmml: function (model) {
		return new Promise((resolve, reject) => {
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
	},

	evaluate: function (model, data) {
		return new Promise((resolve, reject) => {
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
	},

	evaluateCSV(model, data) {
		return new Promise((resolve, reject) => {
			if (!OSServerURL) {
				reject("Null or Empty OpenScoring server URL");
			}

			if (!model) {
				reject("Must specify a model when calling evaluateCSV");
			}

			if (!data) {
				reject("Must include data parameter when calling evaluateCSV");
			}

			var endpoint = `${OSServerURL}/model/${model}/csv`;
			var options = {
				method: "POST",
				uri: endpoint,
				body: data,
				headers: {
					"Content-type": "text/plain"
				}
			};
			request(options, (err, response, body) => {
				if (err) {
					console.log(err);
					console.log(response);
					console.log(body);
					reject(err);
				} else {
					resolve(body);
				}
			});
		});
	},

	metric: function (model) {
		return new Promise((resolve, reject) => {

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
				headers: {
					"Content-type": "text/xml"
				}
			};
			request(options, (err, response, body) => {
				if (err) {
					reject(err);
				} else {
					resolve(body);
				}
			});
		});
	},

	deploy: function (model, pmmlText) {
		return new Promise((resolve, reject) => {
			if (!OSServerURL) {
				reject("Null or Empty OpenScoring server URL");
			}

			if (!model) {
				reject("Model name required for deploy.")
			} else {
				var endpoint = `${OSServerURL}/model/${model}`;

				var options = {
					method: "PUT",
					uri: endpoint,
					body: pmmlText
				}

				request(options, (err, response, body) => {
					if (err) {
						reject(err);
					} else {
						resolve(body);
					}
				});
			}

		});
	},

	delete: function (model) {
		return new Promise((resolve, reject) => {
			if (!OSServerURL) {
				reject("Null or Empty OpenScoring server URL");
			}

			if (!model) {
				reject("Model name required for deploy.")
			} else {
				var endpoint = `${OSServerURL}/model/${model}`;

				var options = {
					method: "DELETE",
					uri: endpoint
				}

				request(options, (err, response, body) => {
					if (err) {
						reject(err);
					} else {
						resolve(body);
					}
				});
			}

		});
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

