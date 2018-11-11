import { NativeModules } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import flatListData from "../data/flatListData";
import { renderForUpdateItem } from '../tabs/FirstTab'
import firebase from 'react-native-firebase'
import moment from 'moment'
import userInfo from '../data/userInfo'

let _bluetoothManager;
let sensors = {
    0: "Heartrate",
    //1: "Accelerometer",
};
let prefixUUID = "0000180D"
let suffixUUID = "-0000-1000-8000-00805F9B34FB"

function getBluetoothManager() {
    if (!_bluetoothManager) {
        _bluetoothManager = new BleManager()
    }
    return _bluetoothManager;
}

setupNotifications = async (device) => {
    for (const id in sensors) {
        const service = serviceUUID(id)
        const temp = NativeModules.BleManager;
        console.log("시작한다잉");

        device.readCharacteristicForService("0000180F-0000-1000-8000-00805F9B34FB", "00002A19-0000-1000-8000-00805F9B34FB" ).
        then((characteristic) => {
            //console.log(characteristic);
        })

        device.monitorCharacteristicForService("0000180D-0000-1000-8000-00805F9B34FB", "00002A37-0000-1000-8000-00805F9B34FB", (error, characteristic) => {
            if (error) {
                console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
                console.log(error.message)
                return
            }
            var i = 0;
            for (; i < flatListData.length; i++) {
                if (characteristic.deviceID === flatListData[i].key) {
                    flatListData[i].isConnected = true
                    break;
                }
            }

            if (i != flatListData.length) {
                if(flatListData[i].tel !== null){
                    let dateObj = new Date();
                    let key = {}
                    let date = moment(dateObj).format('YYYY-MM-DD/HH:mm:ss')
                    key[new String('data/' + date + '/심박수')] = characteristic.value
                    key[new String('data/' + date + '/호흡수')] = flatListData[i].brethe
                    firebase.database().ref('data/'+userInfo.email).orderByChild('user/tel').equalTo(flatListData[i].tel).on('value',(snapshot) => {
                        snapshot.forEach((dataSnapShot)=> { 
                            firebase.database().ref('data/'+userInfo.email+'/'+dataSnapShot.key).update(key)
                        })
                    })
                }
                flatListData[i].bpm = characteristic.bpm;
                //console.log(characteristic.deviceID + " heartrate :" + characteristic.value + "bpm")
            }
            
            renderForUpdateItem()
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
    setupNotifications,
};