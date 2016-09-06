/*
 * Created by G on 18/07/2016.
 */


"use strict";

var geolib = require('geolib');

module.exports = exports = function(bboxSingle, margin, bboxArray, cb) {
	var i, bbox;
	
	var bboxs = bboxSingle.bbox;
	var dist = margin * Math.sqrt(2);
	
	var startPoint = {lat: bboxs[1], lon: bboxs[0]};
	var southWest = geolib.computeDestinationPoint(startPoint, dist, 225);
	
	startPoint = {lat: bboxs[3], lon: bboxs[2]};
	var northEast = geolib.computeDestinationPoint(startPoint, dist, 45);
	
	bboxs = [+southWest.longitude, +southWest.latitude, +northEast.longitude, +northEast.latitude];
	
	var lenbboxArray = bboxArray.length;
	
	var neighborIn = [];
	
	var neighborOut = [];
	
	for (i = 0; i < lenbboxArray; i++) {
		if (bboxArray[i].properties.area_id == bboxSingle.properties.area_id) {
			continue;
		}
		
		bbox = [];
		bbox = bboxArray[i].bbox;
		
		if ((((+bbox[0] >= +bboxs[0]) && (+bbox[0] <= +bboxs[2])) && ((+bbox[1] >= +bboxs[1]) && (+bbox[1] <= +bboxs[3]))) || (((+bbox[0] >= +bboxs[0]) && (+bbox[0] <= +bboxs[2])) && ((+bbox[3] >= +bboxs[1]) && (+bbox[3] <= +bboxs[3]))) || (((+bbox[2] >= +bboxs[0]) && (+bbox[2] <= +bboxs[2])) && ((+bbox[3] >= +bboxs[1]) && (+bbox[3] <= +bboxs[3]))) || (((+bbox[2] >= +bboxs[0]) && (+bbox[2] <= +bboxs[2])) && ((+bbox[1] >= +bboxs[1]) && (+bbox[1] <= +bboxs[3])))){
			neighborIn.push(bboxArray[i].properties.area_id);
		} else if ((((+bboxs[0] >= +bbox[0]) && (+bboxs[0] <= +bbox[2])) && ((+bboxs[1] >= +bbox[1]) && (+bboxs[1] <= +bbox[3]))) || (((+bboxs[0] >= +bbox[0]) && (+bboxs[0] <= +bbox[2])) && ((+bboxs[3] >= +bbox[1]) && (+bboxs[3] <= +bbox[3]))) || (((+bboxs[2] >= +bbox[0]) && (+bboxs[2] <= +bbox[2])) && ((+bboxs[3] >= +bbox[1]) && (+bboxs[3] <= +bbox[3]))) || (((+bboxs[2] >= +bbox[0]) && (+bboxs[2] <= +bbox[2])) && ((+bboxs[1] >= +bbox[1]) && (+bboxs[1] <= +bbox[3])))) {
			neighborIn.push(bboxArray[i].properties.area_id);
		} else {
			neighborOut.push(bboxArray[i].properties.area_id);
		}
	}
	
	var neighborIdArray = [neighborIn, neighborOut];
	
	cb(neighborIdArray);
};
