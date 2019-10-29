var util = require('util');

var bleno = require('../..');

var BlenoPrimaryService = bleno.PrimaryService;

var FitnessMachineFeatureCharacteristic = require('./service/fitness-machine-feature-characteristic');
var IndoorBikeDataCharacteristic = require('./service/indoor-bike-data-characteristic');

function FtmsService() {
  FtmsService.super_.call(this, {
      uuid: '13333333333333333333333333333337',
      characteristics: [
          new FitnessMachineFeatureCharacteristic(),
          new IndoorBikeDataCharacteristic(),
      ]
  });
}

util.inherits(FtmsService, BlenoPrimaryService);

module.exports = FtmsService;
