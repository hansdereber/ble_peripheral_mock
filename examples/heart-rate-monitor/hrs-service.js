var util = require('util');

var bleno = require('../..');

var BlenoPrimaryService = bleno.PrimaryService;

var BodySensorLocationCharacteristic = require('./body-sensor-location-characteristic');

function HrsService() {
  HrsService.super_.call(this, {
      uuid: '0021',
      characteristics: [
          new BodySensorLocationCharacteristic()
      ]
  });
}

util.inherits(HrsService, BlenoPrimaryService);

module.exports = HrsService;
