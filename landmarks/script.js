var map;
var myLat = 0;
var myLng = 0;
getMyPosition();
var marker;

function initMap(){
	var myOptions = {
    zoom: 13, // The larger the zoom number, the bigger the zoom
    center: me,
    mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	infowindow = new google.maps.InfoWindow();
	map = new google.maps.Map(document.getElementById("map"), myOptions);
	console.log("making requests");
	makeRequests();
}

function getMyPosition(){
    if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position) {
		myLat = position.coords.latitude;
		myLng = position.coords.longitude;
		me = new google.maps.LatLng(myLat, myLng);
		initMap();
		console.log(myLat);
		console.log(myLng);
		renderMap();
	    });
	    }
	else {
	    alert("Geolocation is not supported by your web browser.");
	}
}

function renderMap()
{
    me = new google.maps.LatLng(myLat, myLng);
  
    // Update map and go there...
    map.panTo(me);
  
    // Create a marker
    marker = new google.maps.Marker({
	    position: me,
	    title: "Here I Am!"
	});
    marker.setMap(map);
    
    // Open info window on click of marker
    google.maps.event.addListener(marker, 'click', function() {
	    infowindow.setContent(marker.title);
	    infowindow.open(map, marker);
	});
}

function makeRequests()
{
	request = new XMLHttpRequest('u1QcvwrF', myLat, myLng);
	request.open("POST", "https://defense-in-derpth.herokuapp.com/sendLocation", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.onreadystatechange = function() {//Call a function when the state changes.
    if(request.readyState == 4 && request.status == 200) {
        alert(request.responseText);
        parseData();
    }
	}
	request.send('login=u1QcvwrF&lat='+myLat+'&lng='+myLng);
	//request.responseText;
}

function parseData()
{
	//console.log(rawData);
	locations = JSON.parse(request.responseText);
	console.log(locations);
	output = "<ul>";
	for (count = 0; count < locations.length; count++) {
	output += "<li>" + locations[count]+ " => " + locations[count]+ "</li>";
	}
	output += "</ul>";
	document.getElementById("locations").innerHTML = output;
	console.log(output);
	//console.log(locations.length);
	addLocations();
}

function addLocations()
{
	//newMarkers{

	//}
	//console.log(locations.people);
	console.log(locations.people[0].lat);
	for (var person in locations.people){
		console.log(person);
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations.people[person].lat, location.people[person].lng),
			title: "Hooray"
		});
		marker.setMap(map);
	}
		console.log(locations.people[person]);
		//console.log(locations.people.id);
	//	for (var person in locations.people.lat)
			
}


