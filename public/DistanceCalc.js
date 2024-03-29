// Functions for calculating distance between sacstate and their address
// Sacstate coords
const sacState = { lat: 38.56122, lng: -121.42426 };
// Map options: center map at sac state
const mapOptions = {
    center: sacState,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
// Hide results button so the user uses the route button first
document.getElementById('submit').style.visibility = 'hidden';

let distance, duration;

// Create/Init map
const map = new google.maps.Map(document.getElementById("google-map"), mapOptions);

// Create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

// Create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

// Bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

let mapData = [
    [0, 0],         // DRIVE
    [0, 0],         // WALK
    [0, 0],         // BIKE
    [0, 0]          // TRANSIT
];

// Set user's commute mode depending to what they selected on the commute options page
let userType = window.localStorage.getItem('mode');

// Define calcRoute function
function calcRoute(theMode, count) {
    // Create request using the user's travel mode and chosen address
    var request = {
        origin: document.getElementById("addy").value,
        destination: sacState,
        travelMode: theMode,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }


    // Routing
    directionsService.route(request, function (result, status) {
        // Check status of google maps
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            distance = result.routes[0].legs[0].distance;
            duration = result.routes[0].legs[0].duration;
            // Calculates the distance and time for every mode and sends into a 2-D array
            mapData[count][0] = distance.value;
            mapData[count][1] = duration.value;
            // If the user's mode matches that being calculated display the route
            if (count == userType) {
                //display route onto map
                directionsDisplay.setDirections(result);
            }
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map on sac state
            map.setCenter(sacState);
            //Show error message once and clear route
            clearRoute();
            if(count == 0) {
                alert("Address Invalid");
            }
        }
    });
}

// Converts user's mode of transport to designated value
function processType() {
    if (userType == 'SOV' || userType == 'MOV' || userType == 'Motorcycle') {
        userType = 0;
    } else if (userType == 'Transit') {
        userType = 3;
    } else if (userType == 'Bike') {
        userType = 2;
    } else {
        userType = 1;
    }
}

// Calculates all the distance and times for each commute mode
function calcAll() {
    console.log(userType);
    processType();
    console.log(userType);
    // Calculate the routes of each travel mode 
    calcRoute(google.maps.TravelMode.DRIVING, 0);
    calcRoute(google.maps.TravelMode.WALKING, 1);
    calcRoute(google.maps.TravelMode.BICYCLING, 2);
    calcRoute(google.maps.TravelMode.TRANSIT, 3);
    console.log(mapData);
    window.localStorage.setItem('travelInfo', JSON.stringify(mapData));
    // Set results button to visible to user
    document.getElementById('submit').style.visibility = 'visible';
}

// Clear results
function clearRoute(){
    // Set display address value to blank
    document.getElementById("addy").value = "";
    directionsDisplay.setDirections({ routes: [] });
    // Hide results button from user
    document.getElementById('submit').style.visibility = 'hidden';
}

// Create autocomplete objects for all inputs
var options = {
    types: ['address']
}

// Set input to address input
var input1 = document.getElementById("addy");
// Add autocomplete to address input passing in the element id and setting autocomplete to addresses
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);
// On submit send data to server
$('#submit').click(function(){
    console.log($('input[name="freq"]').val());
    if ($('input[name="freq"]').val() > 0) {
        window.localStorage.setItem('frequency', $('input[name="freq"]').val());
        window.localStorage.setItem('travelInfo', JSON.stringify(mapData));
        window.location.href='Data Analysis.html';
    }
});