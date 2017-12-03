#!/usr/bin/env node

var web3 = require('web3');
var web3 = new web3(new web3.providers.HttpProvider("http://localhost:8545"));

var abiArray = read_json('../../refactored-train/contracts/carrierRegistry.abi');

var MyContract = web3.eth.contract(abiArray);

function get_number_of_trips(carrier_id) {
    var contract_address = get_contact_address_for_carrier(carrier_id);
    var instance = MyContract.at(contract_address);

    return instance.getTripCount.call().toString();
}

function get_trip_data(contract_address, trip_id) {

    var instance = MyContract.at(contract_address);

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

console.log(result);
    return result;
}

function get_contact_address_for_carrier(carrier_id) {
    switch (carrier_id) {
        case 1:
            return '0x0D84efb69AE7d1E3f4aE264248797f1F6024062a';
        default:
            return;
    }
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

function trip_already_captured(completed_trips, carrier_id, trip_id) {
    var carrier_data = completed_trips[carrier_id];
    if (!carrier_data) return false;

    return carrier_data[trip_id];
}


function set_completed_trips(completed_trips, new_event) {
    c = completed_trips;
    if (!new_event.trip_id) { //also handles blank new_event
        return c;
    }

    if (!c[new_event.carrier_id]) {
      c[new_event.carrier_id] = {};
    }
    c[new_event.carrier_id][new_event.trip_id] = true;
    return c;
}

function read_json(filename) {
  var fs = require('fs');
  try {
    return JSON.parse(fs.readFileSync(filename, 'utf8'));
  } catch (err) { }

  return {};
}

function write_json(filename, obj) {
  var fs = require('fs');
  fs.writeFile(filename, JSON.stringify(obj), function(err) {
    if(err) {
        return console.log(err);
    }

  });
}

function update_all() {
    var completed_trips_file = '../app/data/completed_trips.json';
    var all_carriers_file = '../app/data/carriers.json';
    var all_trips_file = '../app/data/trips.json';

    var completed_trips = read_json(completed_trips_file);
    var all_carriers = read_json(all_carriers_file);
    var all_trips = read_json(all_trips_file);

    var number_of_trips = get_number_of_trips(1);

    var carrier_id = 1;
    for (var i=1; i<=number_of_trips;i++) {
        if (trip_already_captured(completed_trips, carrier_id, i)) {
            continue;
        }
        var result = get_carrier_trip_data(carrier_id, i);

        all_carriers = update_carriers_from_event(all_carriers, result);
        all_trips = update_trips_from_event(all_trips, result);
        completed_trips = set_completed_trips(completed_trips, result);
    }

    write_json(completed_trips_file, completed_trips);
    write_json(all_carriers_file, all_carriers);
    write_json(all_trips_file, all_trips);
}

update_all();
