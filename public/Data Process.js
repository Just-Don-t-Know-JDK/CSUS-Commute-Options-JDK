let mpg = window.localStorage.getItem('mpg');
let insurance = window.localStorage.getItem('insurance');
let travelInfo = JSON.parse(window.localStorage.getItem('travelInfo'));
let frequency = window.localStorage.getItem('frequency');
let userType = window.localStorage.getItem('mode');
let occupants = window.localStorage.getItem('vehicleOccupants');
let parkingVal = window.localStorage.getItem('prkingType');
let transitCost;
processType();
processTransit();

// Process some slightly different data for database storage
let userData = {
    mpg: mpg,
    insurance: insurance,
    distance: Math.round(meterToMile(travelInfo[userType][0]) * 10)/10,
    time: Math.round(((travelInfo[userType][1])/60.0) * 10)/10,
    mode: window.localStorage.getItem('mode')
};
// Post user data to server
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
}
fetch('/userData', options).then(response => {
    console.log(response);
});


// How much the user pays yearly in insurance & parking
let money = (insurance*12);

// https://www.csus.edu/parking-transportation/parking/permit-pricing.html
function parkCost(x) {
    if (parkingVal == 0) {
        if (x == 'Motorcycle') {
            return 118.0;
        }
        else if (x == 'SOV' || x == 'MOV') {
            return 475.0;
        }
    }
    else if (parkingVal == 1) {
        return 7.0*frequency*52.0;
    }
    return 0.0;
}

function processTransit() {
    if (!window.localStorage.getItem('isAStudent')) {
        transitCost = 0;
    }
    if (!window.localStorage.getItem('isAFaculty')) {
        transitCost = 80.0;
    }
    if (!window.localStorage.getItem('transitPass')) {
        transitCost = 1200;
    }
    if (window.localStorage.getItem('isAFaculty') && window.localStorage.getItem('isAStudent') && window.localStorage.getItem('transitPass')) {
        transitCost = 2.50*frequency*52.0*2.0;
    }
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

function sustainabilityCalc(mpg, distance, freq) {
    return ((((8887/mpg)*distance*2.0*freq*52.0)/1000)*2.205)/1000  // CO2 emissions in kg converted to lbs then to tons
}

function meterToMile(meters) {
    return meters*0.000621371192;
}

function timeCalc(seconds, freq) {
    return (seconds/3600.0)*freq*52.0*2.0;
}

// Calculates gas price per year with mpg (value) and commute type (type)
function extraCost(value, type) {
    return ((meterToMile(travelInfo[type][0]))/value * (frequency*2)) * 52 * 3.1;
}

let graphInfo = {
    sustainVals: [
        // Users consumption
        Math.round((sustainabilityCalc(mpg, meterToMile(travelInfo[userType][0]), frequency)/occupants) * 10)/10,
        // SOV
        Math.round(sustainabilityCalc(24.2, meterToMile(travelInfo[0][0]), frequency) * 10)/10,
        // MOV
        Math.round(sustainabilityCalc(25.50, meterToMile(travelInfo[0][0]), frequency) * 10)/10,
        // Motorcycle
        Math.round(sustainabilityCalc(44, meterToMile(travelInfo[0][0]), frequency) * 10)/10,
        // Transit (should pull stats from https://afdc.energy.gov/data/)
        Math.round(sustainabilityCalc(50, meterToMile(travelInfo[3][0]), frequency) * 10)/10,
        // Bike
        0,
        // Walking
        0
        ],
    timeVals: [
        Math.round(timeCalc(travelInfo[userType][1], frequency)),
        Math.round(timeCalc(travelInfo[0][1], frequency)),
        Math.round(timeCalc(travelInfo[0][1], frequency)),
        Math.round(timeCalc(travelInfo[0][1], frequency)),
        Math.round(timeCalc(travelInfo[3][1], frequency)),
        Math.round(timeCalc(travelInfo[2][1], frequency)),
        Math.round(timeCalc(travelInfo[1][1], frequency))
    ],
    moneyVals: [   // All is yearly (Future iterations should pull stats from https://afdc.energy.gov/data/)
        // user
        Math.round(money + extraCost(mpg, userType) + parkCost(window.localStorage.getItem('mode'))),
        // SOV (sources in google drive)
        Math.round(money + extraCost(25.1, 0) + parkCost('SOV')),
        // MOV
        Math.round(money + extraCost(25.5, 0) + parkCost('MOV')),
        // Motorcycle
        Math.round(money + extraCost(44, 0) + parkCost('Motorcycle')),
        // Transit
        transitCost,
        // Bike
        0,
        // Walk
        0
    ]
}

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ["Your Values", "Single Occupant Vehicle", "Multi-Occupant Vehicle", "Motorcycle", "Transit", "Bicycle", "Walking"],
        datasets: [{
            data: graphInfo.sustainVals,
            backgroundColor: ["#dad9u","#3e95cd", "#eb4034", "#ebe534", "#34ed4a", "#8d2ded", "#07eded"],
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2
        }]
    },
    options: {
        legend: {   display: false  },
        title: {
            display: true,
            text: 'Carbon Emissions (tons per year)'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

extraInfoSwap('Sustainability');

Chart.defaults.global.defaultFontColor = "#fff";

function extraInfoSwap(value) {
    const types = ['User', 'SOV', 'MOV', 'Motorcycle', 'Transit', 'Bike', 'Walk'];
    const mpgVals = [mpg, 24.2, 25.5, 44.0, 50.0, 0, 0];
    const dist = [travelInfo[userType][0], travelInfo[0][0], travelInfo[0][0], travelInfo[0][0], travelInfo[3][0], travelInfo[2][0], travelInfo[1][0]];
    const park = [parkCost(window.localStorage.getItem('mode')), parkCost('SOV'), parkCost('MOV'), parkCost('Motorcycle'), 0, 0, 0];
    const insure = [money, money, money, money, 0, 0, 0];
    const gasCost = [extraCost(mpg, userType), extraCost(25.1, 0), extraCost(25.5, 0), extraCost(44, 0), 0, 0, 0];
    const misc = [0, 0, 0, 0, transitCost, 0, 0];

    for (var i = 0; i < types.length; i++) {
        if (value == 'Time') {
            $('#'+types[i]).html(
                "Time traveled: " + graphInfo.timeVals[i]
            );
        }
        else if (value == 'Money') {
            $('#'+types[i]).html(
                "Parking: " + park[i] + "<br>" +
                "Insurance: " + insure[i] + "<br>" +
                "Gas: " + gasCost[i] + "<br>" +
                "Misc: " + misc[i] + "<br>" +
                "Total: " + graphInfo.moneyVals[i]
            );
        }
        else {
            $('#'+types[i]).html(
                "MPG: " + mpgVals[i] + "<br>" +
                "Distance: " + dist[i] + "<br>" +
                "Frequency: " + frequency + "<br>" +
                "Occupants: " + occupants + "<br>" +
                "Carbon Emissions: " + graphInfo.sustainVals[i]
            );
        }
    }
}

$('#parent').change(function(){
    if ($('#parent option:selected').text() == 'Sustainability') {
        myChart.options.title.text = 'Carbon Emissions (tons per year)';
        $("#p1").html(
            `
            The sustainability of a commute mode represents its impact on the environment. To come to our calculations for each mode, 
            we took the averages of each mode's miles per gallon alongside your inputted data to determine how much you would on average
            impact the environment with the given mode.
            `
        );
        extraInfoSwap('Sustainability');
    }
    else if ($('#parent option:selected').text() == 'Time') {
        myChart.options.title.text = 'Time Traveled (hours per year)';
        $("#p1").html(
            `
            The time concerns of a commute mode are the amount of time that we predict this commute mode to take in your situation.
            To calculate this, we used an algorithm to determine the fastest route you would take to get to Sacramento State and how many times
            you would commute a week and then upscaled the data to a yearly scale.
            `
        );
        extraInfoSwap('Time');
    }
    else if ($('#parent option:selected').text() == 'Money') {
        myChart.options.title.text = 'Travel Cost (dollars per year)';
        $("#p1").html(
            `
            The money concerns of a commute mode is just how much it will cost you to pay for your typical commute on a yearly scale.
            `
        );
        extraInfoSwap('Money');
    }

    myChart.data.datasets[0].data = getType($('#parent option:selected').text());
    myChart.update();
    $("#head1").html($('#parent option:selected').text());
});

function getType(value) {
    if (value == 'Sustainability')
        return graphInfo.sustainVals;
    else if (value == 'Time')
        return graphInfo.timeVals;
    else if (value == 'Money')
        return graphInfo.moneyVals;
}