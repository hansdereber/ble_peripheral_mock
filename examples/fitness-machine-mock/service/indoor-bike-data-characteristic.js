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
                value: 'This holds the training-related data of an indoor bike',
            })
        ],
    })

    this
}

util.inherits(IndoorBikeDataCharacteristic, Characteristic)

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

IndoorBikeDataCharacteristic.prototype.onReadRequest = function (offset, callback) {
    setTimeout(function() {
        if (self.updateValueCallback) {
            var data = new Buffer(1);
            data.writeUInt8(getRandomInt(2), 0);
            self.updateValueCallback(data);
        }
    }, 1000);

    callback(this.RESULT_SUCCESS)
}

module.exports = IndoorBikeDataCharacteristic
