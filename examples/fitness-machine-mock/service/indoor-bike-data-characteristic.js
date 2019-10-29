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
        value: null
    })

    this._value = new Buffer(0);
    this._updateValueCallback = null;

    setTimeout(notify(), 1000)
}

function notify() {
    console.log("notify")

    if (this._updateValueCallback) {
        console.log('EchoCharacteristic - onWriteRequest: notifying');
        this._value = getRandomInt(100);
        this._updateValueCallback(this._value);
    }
}

util.inherits(IndoorBikeDataCharacteristic, Characteristic)

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

IndoorBikeDataCharacteristic.prototype.onReadRequest = function (offset, callback) {
    console.log('EchoCharacteristic - onReadRequest: value = ' + this._value.toString('hex'));

    callback(this.RESULT_SUCCESS, this._value);
}

IndoorBikeDataCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
    console.log('EchoCharacteristic - onSubscribe');

    this._updateValueCallback = updateValueCallback;
};

IndoorBikeDataCharacteristic.prototype.onUnsubscribe = function() {
    console.log('EchoCharacteristic - onUnsubscribe');

    this._updateValueCallback = null;
};

module.exports = IndoorBikeDataCharacteristic

