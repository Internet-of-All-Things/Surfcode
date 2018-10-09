import React, { Component } from 'react';
import {
    FlatList,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    BackHandler,
} from 'react-native';

import Loader from './Loader';
import flatListData from "../data/flatListData";
import EasyBluetooth from 'easy-bluetooth-classic';
import NavigationService from '../utils/NavigationService';

import { updateState } from '../components/Student_BasicFlatList';

var config = {
    "uuid": "00001101-0000-1000-8000-00805F9B34FB",
    "deviceName": "Bluetooth Example Project",
    "bufferSize": 1024,
    "characterDelimiter": "\n"
}

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

        EasyBluetooth.init(config)
            .then(function (config) {
                console.log("config done!");
            })
            .catch(function (ex) {
                console.warn(ex);
            });
    }

    componentWillMount() {
        this.onDeviceFoundEvent = EasyBluetooth.addOnDeviceFoundListener(this.onDeviceFound.bind(this));
        this.onStatusChangeEvent = EasyBluetooth.addOnStatusChangeListener(this.onStatusChange.bind(this));
        this.onDataReadEvent = EasyBluetooth.addOnDataReadListener(this.onDataRead.bind(this));
        this.onDeviceNameEvent = EasyBluetooth.addOnDeviceNameListener(this.onDeviceName.bind(this));
    }

    componentDidMount() {
        this.scan();
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.goBack();
            return true;
        });
    }

    componentWillUnmount() {
        this.onDeviceFoundEvent.remove();
        this.onStatusChangeEvent.remove();
        //this.onDataReadEvent.remove();
        this.onDeviceNameEvent.remove();
        this.backHandler.remove();
    }

    onDeviceFound(device) {
        console.log("onDeviceFound");
        console.log(device);
        bluetoothDevices.push({
            'key': this.generateKey(24),
            'device': device
        });
        this.setState({
            deviceCount: this.state.deviceCount + 1,
        });
    }

    onStatusChange(status) {
        console.log("onStatusChange");
        console.log(status);
    }

    onDataRead(data) {
        const values = data.split(' ');
        if (flatListData[0] != null) {
            flatListData[0]["bpm"] = values[0];
            flatListData[0]["brethe"] = values[1];

            updateState({ refresh: true });
        }
        console.log(data);

    }

    onDeviceName(name) {
        console.log("onDeviceName");
        console.log(name);
    }

    scan() {
        this.setState({
            deviceCount: 0,
            loading: true,
        });
        bluetoothDevices = []
        EasyBluetooth.startScan()
            .then((devices) => {
                console.log("all devices found:");
                //console.log(devices);//172.30.15.160
                console.log(bluetoothDevices[0]);

                this.setState({
                    scanning: false,
                    loading: false,
                    refreshing: true,
                });

            })
            .catch(function (ex) {
                console.warn(ex);
            });
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
                                        this.setState({ scanning: true })
                                        this.scan();
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
                                <FlatListItem item={item} index={index} parentFlatList={this}>
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

    render() {
        return (
            <View>
                <TouchableHighlight onPress={() => {
                    EasyBluetooth.connect(this.props.item.device)
                        .then(() => {
                            console.log("Connected");
                            connBluetoothDevices.push({
                                name: this.props.item.device.name,
                                address: this.props.item.device.address
                            });
                            Alert.alert(
                                '',
                                `${this.props.item.device.name}과 연결되었습니다.`,
                                [
                                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                                ],
                                { cancelable: false }
                            )
                            EasyBluetooth.write("a")
                                .then(() => {
                                    console.log("Writing~")
                                })
                                .catch((ex) => {
                                    console.warn(ex);
                                })
                            flatListData.push({
                                "key": "abc1",
                                "name": this.props.item.device.name,
                                "state": "양호한 상태",
                                "bpm": "미측정",
                                "brethe": "미측정",
                                "selected": false
                            })
                            NavigationService.navigate("Main", { changed: true });

                        })
                        .catch((ex) => {
                            console.warn(ex);
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
                        <Text style={{
                            color: '#82889c',
                            padding: 5,
                            fontSize: 14,
                            marginBottom: 10
                        }}>{this.props.item.device.address}</Text>
                    </View>
                </TouchableHighlight >
            </View>
        );
    }
}