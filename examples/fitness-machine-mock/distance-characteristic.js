var util = require('util')

var bleno = require('../..')

var Descriptor = bleno.Descriptor
var Characteristic = bleno.Characteristic

var DistanceCharacteristic = function () {
    DistanceCharacteristic.super_.call(this, {
        uuid: '13333333333333333333333333330005',
        properties: ['notify', 'read'],
        descriptors: [
            new Descriptor({
                uuid: '2901',
                value: 'distance',
            })
        ],
        value: null
    })

    this._value = new Buffer(0)
    this._updateValueCallback = null
}

util.inherits(DistanceCharacteristic, Characteristic)

DistanceCharacteristic.prototype.onReadRequest = function (offset, callback) {
    console.log('EchoCharacteristic - onReadRequest: value = ' + this._value.toString('hex'))

    callback(this.RESULT_SUCCESS, this._value)
}

DistanceCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
    this._value = data;

    console.log('EchoCharacteristic - onWriteRequest: value = ' + this._value.toString('hex'));

    if (this._updateValueCallback) {
        console.log('EchoCharacteristic - onWriteRequest: notifying');

        this._updateValueCallback(this._value);
    }

    callback(this.RESULT_SUCCESS);
};

DistanceCharacteristic.prototype.onSubscribe = function (maxValueSize, updateValueCallback) {
    console.log('EchoCharacteristic - onSubscribe')

    var self = this;
    self._value = 17000

    this._updateValueCallback = updateValueCallback

    function notify() {
        self._value = self._value + 82

        console.log(self._updateValueCallback)
        if (self._updateValueCallback) {
            console.log('EchoCharacteristic - onWriteRequest: notifying')
            self._updateValueCallback([self._value])
        }

    }

    setInterval(notify, 15000);
}

DistanceCharacteristic.prototype.onUnsubscribe = function () {
    console.log('EchoCharacteristic - onUnsubscribe')

    this._updateValueCallback = null
}

module.exports = DistanceCharacteristic

