import { NativeModules } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import flatListData from "../data/flatListData";
import { updateState } from '../components/Student_BasicFlatList';

let _bluetoothManager;
let sensors = {
    0: "Heartrate",
    //1: "Accelerometer",
};
let prefixUUID = "0000180D"
let suffixUUID = "-0000-1000-8000-00805F9B34FB"
let Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9+/=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/rn/g, "n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }
/*
let prefixUUID = "f000aa"
let suffixUUID = "-0451-4000-b000-000000000000"
*/
function getBluetoothManager() {
    if (!_bluetoothManager) {
        console.log("???????");
        _bluetoothManager = new BleManager()
    }
    return _bluetoothManager;
}

function toUTF8Array(str) {
    var utf8 = [];
    for (var i = 0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6),
                0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12),
                0x80 | ((charcode >> 6) & 0x3f),
                0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff) << 10)
                | (str.charCodeAt(i) & 0x3ff));
            utf8.push(0xf0 | (charcode >> 18),
                0x80 | ((charcode >> 12) & 0x3f),
                0x80 | ((charcode >> 6) & 0x3f),
                0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
}

setupNotifications = async (device) => {
    for (const id in sensors) {
        const service = serviceUUID(id)
        const temp = NativeModules.BleManager;
        console.log("시작한다잉");

        device.readCharacteristicForService("0000180F-0000-1000-8000-00805F9B34FB", "00002A19-0000-1000-8000-00805F9B34FB" ).
        then((characteristic) => {
            console.log(characteristic);
        })
        //temp.getString(string => console.log(string))

        device.monitorCharacteristicForService("0000180D-0000-1000-8000-00805F9B34FB", "00002A37-0000-1000-8000-00805F9B34FB", (error, characteristic) => {
            if (error) {
                console.log(error.message)
                return
            }
            var i = 0;
            for (; i < flatListData.length; i++) {
                if (characteristic.deviceID === flatListData[i].key) {
                    break;
                }
            }

            if (i != flatListData.length) {
                flatListData[i].bpm = characteristic.value;
                console.log(characteristic.uuid + " heartrate : " + toUTF8Array(Base64.decode(characteristic.value)) + " bpm")
            }
            updateState({ refresh: true })
        })

    }
}

serviceUUID = (num) => {
    console.log("serviceUUID called");
    return prefixUUID + suffixUUID
}

notifyUUID = (num) => {
    console.log("notifyUUID called");
    return prefixUUID + num + "1" + suffixUUID
}

writeUUID = (num) => {
    console.log("writeUUID called");
    return prefixUUID + num + "2" + suffixUUID
}

export default {
    getBluetoothManager,
    setupNotifications
};