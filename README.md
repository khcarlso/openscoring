# openscoring - Simple API for openscoring REST interface

This openscoring npm module is designed to be a simple way to make calls to an openscoring server. For making the `XMLHttpRequest` to openscoring, this module uses the [request](https://www.npmjs.com/package/request) module which supports both HTTP and HTTPS.

All methods return a `Promise` and should be used as follows:

```js
var openscoring = require('openscoring');
var result = openscoring.summary();
result.then((result) => {
	console.log(result);
}).catch((error) => {
	console.warn(error);
});
```

## Table of Contents

 - [Installation](#installation)
 - [setURL](#setURL)
 - [getURL](#getURL)
 - [Summary](#summary)
 - [Evaluate](#evaluate)
 - [EvaluateCSV](#evaluateCSV)
 - [Metric](#metric)
 - [PMML](#pmml)
 - [Deploy](#deploy)
 - [Delete](#delete)


## Installation

```
npm install --save openscoring
```

## setURL
This method sets the URL for the OpenScoring server. This should include the full path of the default URL, for example:

```js
openscoring.setURL("http://localhost:8080/openscoring");
```
[back to top](#table-of-contents)

## getURL
Returns the current URL endpoint for the OpenScoring server.

```js
openscoring.getURL();
```
[back to top](#table-of-contents)

## evaluate
This method evaluates a single or batch set of data against a given data model, depending on the structure of the data that is passed.

Returns a Promise

Note: the `data` parameter must be a jsonobject in the format expected by openscoring (see [openscoring GitHub page](http://github.com/openscoring/openscoring) for full details)

#### Example: Single data set
```js
openscoring.setURL("http://localhost:8080/openscoring");
var data = {
"id": "record-001",
"arguments": {
	"item1": 2345,
	"item2": 3345,
	"item3": 53,
	}
};
var result = openscoring.evaluate("model", data);
result.then((result) => {
	console.log(result);
}).catch((error) => {
	console.warn(error);
});
```

For batch mode, the data looks for a key called `requests` per the openscoring documentation:

#### Example: Batch data set
```js
openscoring.setURL("http://localhost:8080/openscoring");
var data = {
	"id" : "batch-1",
	"requests" : [
		{
		"id": "record-001",
		"arguments": {
			"item1": 1,
			"item2": 1,
			"item3": 1,
			}
		},
		{
		"id": "record-002",
		"arguments": {
			"item1": 10,
			"item2": 10,
			"item3": 10,
			}
		}	
	]
};

var result = openscoring.evaluate("model", data);
result.then((result) => {
	console.log(result);
}).catch((error) => {
	console.warn(error);
});
```

[back to top](#table-of-contents)

## evaluateCSV
Evaluates a model based on data in CSV format

#### Example
```js
openscoring.setURL("http://localhost:8080/openscoring");
var data = `
Id,param1,param2,param3
rec-01,1.0,1.1,1.4
rec-02,1.5,1.7,1.9
rec-03,4.1,2.6,6.4
`;

var result = openscoring.evaluate("model", data);
result.then((result) => {
	console.log(result);
}).catch((error) => {
	console.warn(error);
});
```

[back to top](#table-of-contents)

## metric
Retrieves model metrics for one or all deployed models depending on whether the `model` parameter is passed.

This action equires administrative rights on the openscoring server. See openscoring documentation for details.

```js
openscoring.metric(model)
// or
openscoring.metric()
```

#### Example
```js
openscoring.setURL("http://localhost:8080/openscoring");
var result = openscoring.metric();
result.then((result) => {
	console.log(result);
}).catch((error) => {
	console.warn(error);
});
```
[back to top](#table-of-contents)

## pmml
Retrieves the PMML for a given model. Requires administrative rights on the openscoring server. See openscoring documentation for details.


#### Example
```js
openscoring.setURL("http://localhost:8080/openscoring");
var result = openscoring.pmml("model");
result.then((result) => {
	console.log(result);
}).catch((error) => {
	console.warn(error);
});
```
[back to top](#table-of-contents)

## deploy
Deploys a new model. Requires administrative rights on the openscoring server. See openscoring documentation for details.

#### Example
```js
openscoring.setURL("http://localhost:8080/openscoring");
var pmmlText = "<PMML> ... </PMML>"
var result = openscoring.deploy("newmodel", pmmlText);
result.then((result) => {
	console.log(result);
}).catch((error) => {
	console.warn(error);
});
```
[back to top](#table-of-contents)

## delete
Deploys a new model. Requires administrative rights on the openscoring server. See openscoring documentation for details.

#### Example
```js
openscoring.setURL("http://localhost:8080/openscoring");
var result = openscoring.delete("model");
result.then((result) => {
	console.log(result);
}).catch((error) => {
	console.warn(error);
});
```

[back to top](#table-of-contents)