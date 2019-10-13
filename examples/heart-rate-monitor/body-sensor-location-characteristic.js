var util = require('util');

var bleno = require('../..');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var BodySensorLocationCharacteristic = function() {
  BodySensorLocationCharacteristic.super_.call(this, {
      uuid: '002C',
    properties: ['read'],
    descriptors: [
      new Descriptor({
        uuid: '2901',
        value: 'This is the location of the sensor'
      })
    ]

  });
};

util.inherits(BodySensorLocationCharacteristic, Characteristic);

BodySensorLocationCharacteristic.prototype.onReadRequest = function(offset, callback) {
  callback(this.RESULT_SUCCESS, new Buffer('finger'));
};

module.exports = BodySensorLocationCharacteristic;
