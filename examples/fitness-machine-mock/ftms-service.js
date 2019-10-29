var util = require('util');

var bleno = require('../..');

var BlenoPrimaryService = bleno.PrimaryService;

var BpmCharacteristic = require('./bpm-characteristic');
var CaloriesCharacteristic = require('./calories-characteristic');
var DistanceCharacteristic = require('./distance-characteristic');
var SpeedCharacteristic = require('./speed-characteristic');
var TimeCharacteristic = require('./time-characteristic');
var WattageCharacteristic = require('./wattage-characteristic');

function FtmsService() {
  FtmsService.super_.call(this, {
      uuid: '13333333333333333333333333333337',
      characteristics: [
          new BpmCharacteristic(),
          new CaloriesCharacteristic(),
          new DistanceCharacteristic(),
          new SpeedCharacteristic(),
          new TimeCharacteristic(),
          new WattageCharacteristic(),
      ]
  });
}

util.inherits(FtmsService, BlenoPrimaryService);

module.exports = FtmsService;
