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

    self._value = 2520

    function notify() {

        function toMinutes(totSec) {
            var sec = totSec % 60
            var min = parseInt(totSec / 60)

            return min + ':' + sec
        }

        self._value += 1

        console.log(self._updateValueCallback)
        if (self._updateValueCallback) {
            console.log('EchoCharacteristic - onWriteRequest: notifying ' + toMinutes(self._value))
            self._updateValueCallback(new Buffer(toMinutes(self._value)))
        }

    }

    setInterval(notify, 1000);
}

TimeCharacteristic.prototype.onUnsubscribe = function () {
    console.log('EchoCharacteristic - onUnsubscribe')

    this._updateValueCallback = null
}

module.exports = TimeCharacteristic

