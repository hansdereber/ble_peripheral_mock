var util = require('util')

var bleno = require('../../..')

var Descriptor = bleno.Descriptor
var Characteristic = bleno.Characteristic

var IndoorBikeDataCharacteristic = function () {
    IndoorBikeDataCharacteristic.super_.call(this, {
        uuid: '13333333333333333333333333330002',
        properties: ['notify', 'read'],
        descriptors: [
            new Descriptor({
                uuid: '2901',
                value: 'This holds the training-related data of an indoor bike'
            })
        ]

    })
}

util.inherits(IndoorBikeDataCharacteristic, Characteristic)

IndoorBikeDataCharacteristic.prototype.onReadRequest = function (offset, callback) {
    callback(this.RESULT_SUCCESS, new Buffer('finger'))
}

module.exports = IndoorBikeDataCharacteristic
