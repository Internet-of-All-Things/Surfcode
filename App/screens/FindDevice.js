import React, { Component } from 'react';
import {
    FlatList,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    AsyncStorage,
    BackHandler,
    Platform,
} from 'react-native';

import Loader from './Loader';
import flatListData from "../data/flatListData";
import NavigationService from '../utils/NavigationService';
import BluetoothManager from '../utils/BluetoothManager';
import { updateState } from '../components/Student_BasicFlatList';

export default class FindDevice extends Component {
    state = {
        modalVisible: false,
        deviceCount: 0,
        scanning: false,
        loading: false,
        refreshing: false,
    };

    static navigationOptions = {
        title: '디바이스 연결',
        headerStyle: {
            elevation: 0,
        },
        headerTitleContainerStyle: {
            justifyContent: "center",
        },
        headerTitleStyle: {
            paddingRight: 30,
        }
    };

    generateKey = (numberOfCharacters) => {
        return require('random-string')({ length: numberOfCharacters });
    }

    constructor(props) {
        super(props);
        this.manager = BluetoothManager.getBluetoothManager();
    }

    componentWillMount() {
        if (Platform.OS === 'ios') {
            this.manager.onStateChange((state) => {
                if (state === 'PoweredOn') this.scan()
            })
        } else {
            this.scan()
        }
    }

    componentDidMount() {
        //this.scan();
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.goBack();
            return true;
        });
    }

    componentWillUnmount() {
        BluetoothManager.getBluetoothManager().stopDeviceScan()
    }

    scan() {
        bluetoothDevices = []
        this.setState({ scanning: true, deviceCount: 0 })
        BluetoothManager.getBluetoothManager().startDeviceScan(null,
            null, (error, device) => {
                console.log("Scanning...")
                //console.log(device);
                if (device != null && device.id != null) {
                    for (var i = 0; i < bluetoothDevices.length; i++) {
                        console.log(bluetoothDevices[i].device.id + " bluetooth");
                        console.log(device.id + "??!@#")
                        if (bluetoothDevices[i].device.id === device.id)
                            return
                    }
                    //connBluetoothDevices.push([device.id, device.name])
                    bluetoothDevices.push({
                        'key': this.generateKey(24),
                        'device': device
                    });

                    this.setState({
                        deviceCount: this.state.deviceCount + 1,
                    });

                    if (error) {
                        this.error(error.message)
                        return
                    }
                }
            });
        setTimeout(() => { BluetoothManager.getBluetoothManager().stopDeviceScan(); this.state.scanning = false }, 3000)

    }


    renderSeparator = () => (
        <View
            style={{
                backgroundColor: '#d0d2da',
                height: 1,
            }}
        />
    );

    goBack = async () => {
        BluetoothManager.getBluetoothManager().stopDeviceScan();
        NavigationService.navigate("Main", {});
    }

    render() {
        return (
            <View style={styles.container}>
                <Loader
                    loading={this.state.loading} />
                <View style={{ marginTop: 24, marginLeft: 24 }}>
                    <Text style={{ color: '#3b3e4c', fontSize: 16, fontWeight: 'bold' }}>디바이스로 수강생 등록</Text>
                    <Text style={{ marginTop: 24, color: '#82889c', fontSize: 16 }}>블루투스를 통해 주변에 있는 디바이스를 탐색합니다.</Text>
                    <Text style={{ marginTop: 8, color: '#82889c', fontSize: 16 }}>탐색된 디바이스는 아래 목록에 표시됩니다.</Text>
                    <View style={{ marginTop: 45, flexDirection: 'row' }}>
                        <Text style={{ flex: 0.35, color: '#3b3e4c', fontSize: 16 }}>디바이스 목록 </Text>
                        <View style={{
                            marginLeft: 8,
                            marginBottom: 5,
                            paddingTop: 1,
                            paddingBottom: 1,
                            paddingLeft: 7,
                            paddingRight: 7,
                            backgroundColor: '#d0d2da',
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: '#fff'
                        }}>
                            <Text style={{ color: '#3b3e4c', fontSize: 16 }}>{this.state.deviceCount}</Text>
                        </View>
                        <View style={{
                            flex: 0.65,
                            marginRight: 24,
                            marginTop: 1,
                            justifyContent: "flex-end",
                            flexDirection: 'row'
                        }}>
                            <TouchableHighlight
                                underlayColor="#d0d2da"
                                onPress={() => {
                                    if (!this.state.scanning) {
                                        console.log("gogo~");
                                        BluetoothManager.getBluetoothManager().stopDeviceScan()
                                        this.scan()
                                    }
                                }}>
                                <View
                                    style={{
                                        justifyContent: "flex-end",
                                        flexDirection: 'row'
                                    }}>
                                    <Image
                                        style={{ width: 20, height: 20, marginRight: 5 }}
                                        source={require('../images/refresh.png')}
                                    />
                                    <Text style={{ color: '#82889c', fontSize: 16 }}>목록 새로고침</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>

                    <FlatList
                        ref={"bluetoothList"}
                        ItemSeparatorComponent={this.renderSeparator}
                        style={styles.FlatList}
                        data={bluetoothDevices}
                        extraData={this.state}
                        renderItem={({ item, index }) => {
                            //console.log(`Item = ${item}, index = ${index}`);
                            return (
                                <FlatListItem item={item} index={index} parentFlatList={this} >
                                </FlatListItem>
                            );
                        }}
                    />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9fa',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 20,
    },
    FlatList: {
        height: 360,
        marginTop: 24,
        width: 320
    },
    bar: {
        height: 55,
        alignItems: 'center'
    },
    leftIconContainerStyle: {

    },
    titleContainerStyle: {
        alignItems: 'center',
        paddingRight: 40
    },
    titleStyle: {
        fontSize: 16,
        color: '#3b3e4c'
    },
    iconImageStyle: {
        marginLeft: 24,
        width: 14.5,
        height: 30,
        tintColor: '#82889c'
    }
});

var bluetoothDevices = [];
var connBluetoothDevices = [];

class FlatListItem extends Component {

    _storeData = async (key, data) => {
        try {
            console.log('insertion success. ' + key + '//' + data)
            await AsyncStorage.setItem(key.toString(), data.toString());
        } catch (error) {
            console.log('??' + error)
        }
    }

    _addData = async (device) => {
        try {
            const value = await AsyncStorage.getItem('Count');
            console.log(value + " valuevlaue")
            if (value !== null) {
                console.log("value is not null ################################")
                let tmp = parseInt(value) + 1
                this._storeData('Count', tmp)
                this._storeData('device' + tmp, device.id + ',' + device.name)
            } else {
                console.log("value is null $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
                this._storeData('Count', 1)
                this._storeData('device' + 1, device.id + ',' + device.name)
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <View>
                <TouchableHighlight onPress={() => {

                    BluetoothManager.getBluetoothManager().stopDeviceScan()
                    this.props.item.device.connect()
                        .then((device) => {
                            console.log("Discovering services and characteristics")
                            return device.discoverAllServicesAndCharacteristics()
                        })
                        .then((device) => {
                            console.log("Setting notifications")
                            BluetoothManager.
                                getBluetoothManager().
                                onDeviceDisconnected(device.id, (error, device) => {
                                    /* reconnect */
                                    device.connect()
                                        .then((device) => {
                                            console.log("Discovering services and characteristics")
                                            return device.discoverAllServicesAndCharacteristics()
                                        })
                                        .then((device) => {
                                            console.log("Setting notifications")
                                            return BluetoothManager.setupNotifications(device)
                                        })
                                        .then(() => {

                                        }, (error) => {
                                            console.log(error.message)
                                        })
                                })
                            return BluetoothManager.setupNotifications(device)
                        })
                        .then(() => {
                            console.log("Listening...")
                            Alert.alert(
                                '',
                                `${this.props.item.device.name}과 연결되었습니다.`,
                                [
                                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                                ],
                                { cancelable: false }
                            )

                            flatListData.push({
                                "key": this.props.item.device.id,
                                "name": this.props.item.device.name,
                                "state": "양호한 상태",
                                "bpm": "미측정",
                                "brethe": "미측정",
                                "user_icon_url": "../images/user/ch.png",
                                "selected": false
                            })

                            updateState({ refresh: true })
                            //updateState({ refresh: false })
                            this._addData(this.props.item.device)
                            NavigationService.navigate("Main", { changed: true })
                        }, (error) => {
                            console.log(error.message)
                        })
                }}
                    underlayColor="#b7c3ea"
                    style={{
                        flex: 1
                    }}>
                    <View>
                        <Text style={{
                            color: '#3b3e4c',
                            padding: 5,
                            fontSize: 19
                        }}>{this.props.item.device.name}</Text>
                        <View style={{
                            color: '#82889c',
                            padding: 5,
                            marginBottom: 10,
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                color: '#82889c',
                                fontSize: 14,
                            }}>{this.props.item.device.id}</Text>
                            <Text style={{
                                color: '#82889c',
                                justifyContent: "flex-end",
                                fontSize: 14,
                            }}>연결강도 : {this.props.item.device.rssi}</Text>
                        </View>

                    </View>
                </TouchableHighlight >
            </View>
        );
    }
}