"use strict";

$( document ).ready(function(){
	var mapOptions = {
		center:{lat:47.6, lng: -122.3},
		zoom:12
	}

	var mapElem = document.getElementById('map');

	var map = new google.maps.Map(mapElem, mapOptions);
	var infoWin = new google.maps.InfoWindow();

	var places = [];
	$.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
		.done(function(data){
			$.each(data, function(i,item){
				console.log('success');

				var newMarkersPos = {
					lat: Number(item.location.latitude),
					lng: Number(item.location.longitude)					
				}
				var marker = new google.maps.Marker({
					position: newMarkersPos,
					label: item.cameralabel,
					map:map
				});	

				places.push(marker);
				google.maps.event.addListener(marker, 'click', function(){
					var LatLng = this.getPosition();
					map.panTo(LatLng);
					infoWin.setContent("<h3>"+ item.cameralabel+ "</h3>" + "<img src='" + item.imageurl.url + "'>");
					infoWin.open(map, this);
				})
			});		

		})
		.fail(function(error){
			alert('Data not received, Please Try Again');
		})


	$('#search').bind('search keyup', function(){
		var input = $('#search').val().toLowerCase();
		for (var i = 0; i < places.length; i++){
			console.log(places[i].label);
			if (places[i].label.toLowerCase().indexOf(input) == -1) {
				places[i].setMap(null);
			} else {
				places[i].setMap(map);
			}
		}	
	})
});
