/*
 * Created by G on 18/07/2016.
 */


var bboxNeighbors = require('./lib/bboxNeighbors.js');
var config = require('./bboxNeighbors-config.js');

bboxNeighbors(config.url_area, config.margin, config.url_search, function (neighborIdArray) {
	console.log("the ids of neighbors are: " + neighborIdArray[0]);
	console.log("one of the ids of no_neighbors are: " + neighborIdArray[1][0]);
});
