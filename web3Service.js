var web3 = require('web3');
var timer = require('timers');
var fs = require('fs');

// var web3 = new Web3();

function get_contact_address_for_carrier(carrier_id) {
  switch (carrier_id) {
      case 1:
          return '0xc3b642b11a25d3A414a3CD185f9cA18d20D8fB1F';
      default:
          return undefined;
  }
}

/*
{
  "carrier_id":1,
  "trip_id":1,
  "rating":4
}
*/
function get_trip_data(contract_address, trip_id) {

  var address = '0xc3b642b11a25d3A414a3CD185f9cA18d20D8fB1F';

  var abiArray = [{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_time","type":"uint256"},{"name":"_z","type":"uint256"}],"name":"trackBumpEvent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_time","type":"uint256"},{"name":"_light","type":"uint256"}],"name":"trackLightEvent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"isTripFinalized","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"finalizeTrip","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_light","type":"uint256"},{"name":"_z","type":"uint256"}],"name":"newTrip","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getTripRating","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

  var MyContract = web3.eth.contract(abiArray);

  var instance = MyContract.at(address);

  var isFinalized = instance.isTripFinalized.call(trip_id);

  if (!isFinalized) {
      return {};
  }

  var c = instance.getTripRating.call(trip_id).c;

  if (!c) {
      return {};
  }

  var rating = c[0] / 1000;

  var result = {
      "carrier_id":1,
      "trip_id":trip_id,
      "rating":rating,
  }

  return result;
}

function get_carrier_trip_data(carrier_id, trip_id) {
  var address = get_contact_address_for_carrier(carrier_id);
  if (!address) {
      return {};
  }
  return get_trip_data(address, trip_id);
}

/*
{
  "carrier_id": 1,
  "carrier_name": "African Trucking",
  "rating": 3.08,
  "number_of_events": 3
}
*/
function update_carrier_rating(current, new_event) {
  if (new_event.carrier_id != current.carrier_id) { //also handles blank new_event
      return current;
  }

  var old_total = current.rating * current.number_of_events;
  var new_total = old_total + new_event.rating;
  var new_number_of_events = current.number_of_events + 1;
  var new_rating = new_total / new_number_of_events;

  return {
      "carrier_id": current.carrier_id,
      "carrier_name": current.carrier_name,
      "rating": new_rating,
      "number_of_events": new_number_of_events
  }
}

/*
{
  "trip_id": 1,
  "trip_name": "Cape Town to Johannesburg",
  "rating": 2.6875,
  "number_of_events": 4
}
*/
function update_trip_rating(current, new_event) {
  if (new_event.trip_id != current.trip_id) { //also handles blank new_event
      return current;
  }

  var old_total = current.rating * current.number_of_events;
  var new_total = old_total + new_event.rating;
  var new_number_of_events = current.number_of_events + 1;
  var new_rating = new_total / new_number_of_events;

  return {
      "trip_id": current.trip_id,
      "trip_name": current.trip_name,
      "rating": new_rating,
      "number_of_events": new_number_of_events
  }
}

function update_carriers_from_event(current_carriers, new_event) {
  return current_carriers.map(function(carrier) {
      return update_carrier_rating(carrier, new_event);
  });
}

function update_trips_from_event(current_trips, new_event) {
  return current_trips.map(function(trip) {
      return update_trip_rating(trip, new_event);
  });
}

function update_all() {
  var all_carriers = [
      {
          "carrier_id": 1,
          "carrier_name": "African Trucking",
          "rating": 75.4,
          "number_of_events": 3
      },
      {
          "carrier_id": 2,
          "carrier_name": "We Deliver",
          "rating": 40,
          "number_of_events": 6
      }
  ];

  var all_trips = [
      {
          "trip_id": 1,
          "trip_name": "Cape Town to Johannesburg",
          "rating": 85,
          "number_of_events": 4
      },
      {
          "trip_id": 2,
          "trip_name": "Johannesburg to Cape Town",
          "rating": 25.3,
          "number_of_events": 4
      }
  ];

//  for (var i=1; i<=5;i++) {
  var result = get_trip_data('',1);
  all_carriers = update_carriers_from_event(all_carriers, result);
  all_trips = update_trips_from_event(all_trips, result);
//  }
return {'carriers':all_carriers,'trips':all_trips}
}

timer.setInterval(function () {
  var all_carriers = [
    {
        "carrier_id": 1,
        "carrier_name": "African Trucking",
        "rating": 75.4,
        "number_of_events": 3
    },
    {
        "carrier_id": 2,
        "carrier_name": "We Deliver",
        "rating": 40,
        "number_of_events": 6
    }
];
  var result = get_trip_data('',1);
  var json = JSON.stringify(update_carriers_from_event());
  fs.writeFileSync('../data/test.json', json);

}
  , 2000)
