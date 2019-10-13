var util = require('util');

var bleno = require('../..');

var Characteristic = bleno.Characteristic;

var BodySensorLocationCharacteristic = function() {
  BodySensorLocationCharacteristic.super_.call(this, {
      uuid: '002C',
    properties: ['read']
  });
};

util.inherits(BodySensorLocationCharacteristic, Characteristic);

BodySensorLocationCharacteristic.prototype.onReadRequest = function(offset, callback) {
  callback(this.RESULT_SUCCESS, new Buffer(['finger']));
};

module.exports = BodySensorLocationCharacteristic;
