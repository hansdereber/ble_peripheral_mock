var util = require('util')

var bleno = require('../..')

var Descriptor = bleno.Descriptor
var Characteristic = bleno.Characteristic

var FitnessMachineFeatureCharacteristic = function () {
    FitnessMachineFeatureCharacteristic.super_.call(this, {
        uuid: '13333333333333333333333333330001',
        properties: ['read'],
        descriptors: [
            new Descriptor({
                uuid: '2901',
                value: 'This describes the supported features of the server'
            })
        ]

    })
}

util.inherits(FitnessMachineFeatureCharacteristic, Characteristic)

FitnessMachineFeatureCharacteristic.prototype.onReadRequest = function (offset, callback) {
    callback(this.RESULT_SUCCESS, new Buffer('finger'))
}

module.exports = FitnessMachineFeatureCharacteristic
