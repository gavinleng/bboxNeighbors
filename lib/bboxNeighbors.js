/*
 * Created by G on 18/07/2016.
 */


"use strict";

var request = require("request");
var getNeighbors = require('./getNeighbors.js');

module.exports = exports = function(url_area, margin, url_search, cb) {
	request(url_area, { json: true }, function(err, resp, body) {
		if (err || (resp && resp.statusCode !== 200)) {
			var msg = err ? err.message : body && body.message;
			console.log("failure running the input data query: " + msg);
			process.exit(-1);
		} else {
			var bbox_single = body.data[0]; //geojson obj
			
			request(url_search, { json: true }, function(err, resp, body) {
				if (err || (resp && resp.statusCode !== 200)) {
					var msg = err ? err.message : body && body.message;
					console.log("failure running the input data query: " + msg);
					process.exit(-1);
				} else {
					var bbox_array = body.data; //geojson array
					
					getNeighbors(bbox_single, margin, bbox_array, function(neighborIdArray) {
						console.log("the ids of " + bbox_single.properties.area_id + "'s neighbors are: " + neighborIdArray[0]);
						
						cb(neighborIdArray);
					});
				}
			});
		}
	});
};
