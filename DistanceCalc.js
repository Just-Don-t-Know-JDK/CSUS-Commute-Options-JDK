// Functions for calculating distance between sacstate and their address
// Sacstate coords
const sacState = { lat: 38.56122, lng: -121.42426 };
const mapOptions = {
    center: sacState,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

let distance, duration;

// Hide result box
document.getElementById("output").style.display = "none";

// Create/Init map
const map = new google.maps.Map(document.getElementById("google-map"), mapOptions);

// Create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

// Create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

// Bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

var dataStore = [
    [0, 0],         // DRIVE
    [0, 0],         // WALK
    [0, 0],         // BIKE
    [0, 0]          // TRANSIT
];

let userType = window.localStorage.getItem('mode');

// Define calcRoute function
function calcRoute(theMode, count) {
    //create request
    var request = {
        origin: document.getElementById("addy").value,
        destination: sacState,
        travelMode: theMode,
        //travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }


    // Routing
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            distance = result.routes[0].legs[0].distance;
            duration = result.routes[0].legs[0].duration;
            dataStore[count][0] = distance.value;
            dataStore[count][1] = duration.value;
            // $("#output").html("<div class='result-table'> Driving distance: " + result.routes[0].legs[0].distance.text + ".<br />Duration: " + result.routes[0].legs[0].duration.text + ".</div>");
            // document.getElementById("output").style.display = "block";
            if (count == userType)
                //display route
                directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(sacState);

            //Show error message 
           
            alert("Can't find road! Please try again!");
            clearRoute();
        }
    });

}

function processType() {
    if (userType == 'SOV')
        userType = 0;
    else if (userType == 'MOV')
        userType = 0;
    else if (userType == 'Motorcycle')
        userType = 0;
    else if (userType == 'Transit')
        userType = 3;
    else if (userType == 'Bike')
        userType = 2;
    else
        userType = 1;
}

function calcAll() {
    console.log(userType);
    processType();
    console.log(userType);
    calcRoute(google.maps.TravelMode.DRIVING, 0);
    calcRoute(google.maps.TravelMode.WALKING, 1);
    calcRoute(google.maps.TravelMode.BICYCLING, 2);
    calcRoute(google.maps.TravelMode.TRANSIT, 3);
    console.log(dataStore);
    window.localStorage.setItem('travelInfo', dataStore);
}

// Clear results

function clearRoute(){
    document.getElementById("output").style.display = "none";
    document.getElementById("addy").value = "";
    directionsDisplay.setDirections({ routes: [] });
    
}

// Create autocomplete objects for all inputs

var options = {
    types: ['address']
}


var input1 = document.getElementById("addy");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);