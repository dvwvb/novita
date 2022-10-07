/**
 * 카카오맵에 대해 메소드 구현
 */
 
//var publicUrl = '/public';
//var markerImage = '/images/marker.png';
var markerImage = document.getElementsByClassName("ico-picker");
var lat = 37.539815;
var lng = 127.136690;
var mapId = 'map';

var GoogleMapHelper = (function($) {
	var initMap = function(options) {
		var map = new google.maps.Map(document.getElementById(mapId), {
			center: {lat: lat, lng: lng},
			zoom: 18
		});
		return map;
	};
	
	var addMarker = function(options) {
		var markers = [];

		options.resultList.forEach(function(agency) {
			var gpsLa = parseFloat(agency.gpsLa);
			var gpsLo = parseFloat(agency.gpsLo)
			var latLng = {
				//lat : agency.gpsLa, lng: agency.gpsLo
				lat : gpsLa, lng: gpsLo
			};

			// 마커 생성
			var marker = new google.maps.Marker({
				map: options.map,
				icon: markerImage,
				position: latLng,
			});

			marker.agencySn = agency.agencySn;
			markers.push(marker);
			
		});
		
		return markers;
	};
	
	var clearMarkers = function(options) {
		options.markers.forEach(function(marker) {
			marker.setMap(null);
		});
	};
	
	var setCenter = function(options) {
		//console.log("test");
		options.map.setCenter(options.latlng);
	};
	
	return {
		initMap: initMap,
		addMarker: addMarker,
		clearMarkers: clearMarkers,
		setCenter: setCenter,
	};
}(jQuery)); // end of GoogleMapHelper

