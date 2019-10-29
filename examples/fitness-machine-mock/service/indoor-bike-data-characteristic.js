var util = require('util')

var bleno = require('../../..')

var Descriptor = bleno.Descriptor
var Characteristic = bleno.Characteristic

var _value = new Buffer(0)
var _updateValueCallback = null


var IndoorBikeDataCharacteristic = function () {
    IndoorBikeDataCharacteristic.super_.call(this, {
        uuid: '13333333333333333333333333330002',
        properties: ['notify', 'read', 'write'],
        descriptors: [
            new Descriptor({
                uuid: '2901',
                value: 'This holds the training-related data of an indoor bike',
            })
        ],
        value: null
    })


    setInterval(this.notify, 1000)
}

IndoorBikeDataCharacteristic.prototype.notify = function () {
    console.log("notify")

    _value = parseInt(getRandomInt(100), 10)

    if (_updateValueCallback) {
        console.log('EchoCharacteristic - onWriteRequest: notifying')
        _updateValueCallback(_value)
    }
}

util.inherits(IndoorBikeDataCharacteristic, Characteristic)

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

IndoorBikeDataCharacteristic.prototype.onReadRequest = function (offset, callback) {
    callback(this.RESULT_SUCCESS, _value)
}

IndoorBikeDataCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
    _value = data;

    if (_updateValueCallback) {
        console.log('EchoCharacteristic - onWriteRequest: notifying');

        _updateValueCallback(_value);
    }

    callback(this.RESULT_SUCCESS);
};

IndoorBikeDataCharacteristic.prototype.onSubscribe = function (maxValueSize, updateValueCallback) {
    console.log('EchoCharacteristic - onSubscribe')

    _updateValueCallback = updateValueCallback
}

IndoorBikeDataCharacteristic.prototype.onUnsubscribe = function () {
    console.log('EchoCharacteristic - onUnsubscribe')

    ._updateValueCallback = null
}

module.exports = IndoorBikeDataCharacteristic

