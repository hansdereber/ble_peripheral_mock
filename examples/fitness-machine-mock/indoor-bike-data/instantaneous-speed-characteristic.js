var util = require('util')

var bleno = require('../../..')

var Descriptor = bleno.Descriptor
var Characteristic = bleno.Characteristic

var InstantaneousSpeedCharacteristic = function () {
    InstantaneousSpeedCharacteristic.super_.call(this, {
        uuid: '13333333333333333333333333330101',
        properties: ['notify', 'read'],
        descriptors: [
            new Descriptor({
                uuid: '2901',
                value: 'This represents the instantaneous speed of the user'
            })
        ]

    })
}

util.inherits(InstantaneousSpeedCharacteristic, Characteristic)

InstantaneousSpeedCharacteristic.prototype.onReadRequest = function (offset, callback) {
    callback(this.RESULT_SUCCESS, new Buffer('66'))
}

module.exports = InstantaneousSpeedCharacteristic
