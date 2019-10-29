var util = require('util')

var bleno = require('../..')

var Descriptor = bleno.Descriptor
var Characteristic = bleno.Characteristic

var TimeCharacteristic = function () {
    TimeCharacteristic.super_.call(this, {
        uuid: '13333333333333333333333333330004',
        properties: ['notify', 'read'],
        descriptors: [
            new Descriptor({
                uuid: '2901',
                value: 'time',
            })
        ],
        value: null
    })

    this._value = new Buffer(0)
    this._updateValueCallback = null
}

util.inherits(TimeCharacteristic, Characteristic)

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

TimeCharacteristic.prototype.onReadRequest = function (offset, callback) {
    console.log('EchoCharacteristic - onReadRequest: value = ' + this._value.toString('hex'))

    callback(this.RESULT_SUCCESS, this._value)
}

TimeCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
    this._value = data;

    console.log('EchoCharacteristic - onWriteRequest: value = ' + this._value.toString('hex'));

    if (this._updateValueCallback) {
        console.log('EchoCharacteristic - onWriteRequest: notifying');

        this._updateValueCallback(this._value);
    }

    callback(this.RESULT_SUCCESS);
};

TimeCharacteristic.prototype.onSubscribe = function (maxValueSize, updateValueCallback) {
    console.log('EchoCharacteristic - onSubscribe')

    var self = this;

    this._updateValueCallback = updateValueCallback

    function notify() {
        self._value = parseInt(getRandomInt(100), 10)

        console.log(self._updateValueCallback)
        if (self._updateValueCallback) {
            console.log('EchoCharacteristic - onWriteRequest: notifying')
            self._updateValueCallback([self._value])
        }

    }

    setInterval(notify, 1000);
}

TimeCharacteristic.prototype.onUnsubscribe = function () {
    console.log('EchoCharacteristic - onUnsubscribe')

    this._updateValueCallback = null
}

module.exports = TimeCharacteristic

