import React, { Component } from 'react';
import { Animated, Easing, TouchableHighlight, TouchableOpacity, View, Modal, Text, StyleSheet, Platform, FlatList, PermissionsAndroid, Image, Alert } from "react-native";
import EasyBluetooth from 'easy-bluetooth-classic';
import ActionBar from 'react-native-action-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionSheet from 'react-native-actionsheet'

const SIZE = 80;
const durationIn = 300;
const durationOut = 200;
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
                            EasyBluetooth.writeln("a")
                                .then(() => {
                                    console.log("Writing~")
                                })
                                .catch((ex) => {
                                    console.warn(ex);
                                })
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
class AddButton extends Component {
    state = {
        modalVisible: false,
        refreshing: false,
        deviceCount: 0,
        scanning: false
    };

    constructor(props) {
        super(props);
        var config = {
            "uuid": "00001101-0000-1000-8000-00805F9B34FB",
            "deviceName": "Bluetooth Example Project",
            "bufferSize": 1024,
            "characterDelimiter": "\n"
        };
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK");
                } else {
                    PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                        if (result) {
                            console.log("User accept");
                        } else {
                            console.log("User refuse");
                        }
                    });
                }
            });
        }
        console.log('call constructor');
        EasyBluetooth.init(config)
            .then(function (config) {
                console.log("config done!");
            })
            .catch(function (ex) {
                console.warn(ex);
            });
        //this.handleRefresh = 
    }
    mode = new Animated.Value(0);

    toggleView = () => {
        Animated.timing(this.mode, {
            toValue: this.mode._value === 0 ? 1 : 0,
            duration: 300
        }).start();
    };
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
        this.scan();
    };
    generateKey = (numberOfCharacters) => {
        return require('random-string')({ length: numberOfCharacters });
    }
    componentWillMount() {
        this.onDeviceFoundEvent = EasyBluetooth.addOnDeviceFoundListener(this.onDeviceFound.bind(this));
        this.onStatusChangeEvent = EasyBluetooth.addOnStatusChangeListener(this.onStatusChange.bind(this));
        this.onDataReadEvent = EasyBluetooth.addOnDataReadListener(this.onDataRead.bind(this));
        this.onDeviceNameEvent = EasyBluetooth.addOnDeviceNameListener(this.onDeviceName.bind(this));
        this.handleRefreshEnd = this.handleRefreshEnd.bind(this);
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
            refreshing: false
        });
        this.setState({
            refreshing: true
        });
    }

    onStatusChange(status) {
        console.log("onStatusChange");
        console.log(status);
    }

    onDataRead(data) {
        console.log("onDataRead");
        console.log(data);
    }

    onDeviceName(name) {
        console.log("onDeviceName");
        console.log(name);
    }

    scan() {
        this.setState({
            deviceCount: 0,
            refreshing: true
        });
        bluetoothDevices = []
        EasyBluetooth.startScan()
            .then((devices) => {
                console.log("all devices found:");
                //console.log(devices);//172.30.15.160
                console.log(bluetoothDevices[0]);

                this.setState({ refreshing: false, scanning: false });
                //BluetoothDialog.callfunc();
            })
            .catch(function (ex) {
                console.warn(ex);
            });
    }

    componentWillUnmount() {
        this.onDeviceFoundEvent.remove();
        this.onStatusChangeEvent.remove();
        this.onDataReadEvent.remove();
        this.onDeviceNameEvent.remove();

    }



    renderSeparator = () => (
        <View
            style={{
                backgroundColor: '#d0d2da',
                height: 1,
            }}
        />
    );

    handleRefresh = () => {
        this.setState({
            //refreshing: true
        })
    }

    handleRefreshEnd = () => {
        this.setState({
            refreshing: false
        })
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
        this.scan();
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    render() {
        const firstX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [20, -40]
        });
        const firstY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -30]
        });
        const secondX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 20]
        });
        const secondY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -55]
        });
        const thirdX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 80]
        });
        const thirdY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -30]
        });

        const opacity = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        const rotation = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '45deg']
        });

        return (
            <View style={{
                position: 'absolute',
                alignItems: 'center',
                right: "40%", bottom: 50, height: 30, width: 30

            }}>
                {/*modal부분 start*/}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <ActionBar
                        containerStyle={styles.bar}
                        allowFontScaling={true}
                        title={'디바이스 연결'}
                        backgroundColor={'#f9f9fa'}
                        titleStyle={styles.titleStyle}
                        titleContainerStyle={styles.titleContainerStyle}
                        iconImageStyle={styles.iconImageStyle}
                        leftIconName={'back'}
                        onLeftPress={() => this.setModalVisible(!this.state.modalVisible)}
                        leftIconContainerStyle={styles.leftIconContainerStyle}
                    />
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
                                        {/* <Image
                                            style={{ width: 20, height: 20, marginRight: 5 }}
                                            source={require('./images/project.png')}
                                        /> */}
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
                            refreshing={this.state.refreshing}
                            onRefresh={() => { }}
                            renderItem={({ item, index }) => {
                                //console.log(`Item = ${item}, index = ${index}`);
                                return (
                                    <FlatListItem item={item} index={index} parentFlatList={this}>
                                    </FlatListItem>
                                );
                            }}
                        />

                    </View>
                </Modal>
                {/*modal부분 end*/}

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Which one do you like ?'}
                    message={'In botany, a fruit is the seed-bearing structure in flowering plants (also known as angiosperms) formed from the ovary after flowering.'}
                    options={['Device 연결', '신청 수강생 조회', 'Cancel']}
                    cancelButtonIndex={2}
                    //destructiveButtonIndex={1}
                    styles={{
                        messageBox: { height: 60, },
                        body: {
                            margin: 10,
                            
                        },
                        titleBox: {
                            borderRadius:100
                        }
                    }}
                    onPress={(index) => {
                        if (index == 0) {
                            this.setModalVisible(true);
                        }
                        else if (index == 1) {

                        }
                    }}
                />
                <TouchableHighlight
                    // onPress={() => {
                    //     this.setModalVisible(true);
                    // }}
                    onPress={this.showActionSheet}
                    underlayColor="#2882D8"
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: SIZE,
                        height: SIZE,
                        borderRadius: SIZE / 2,
                        backgroundColor: '#48A2F8'
                    }}
                >
                    <Animated.View style={{
                        transform: [
                            { rotate: rotation }
                        ]
                    }}>
                        <Icon name="plus" size={24} color="#F8F8F8" />
                    </Animated.View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
export { AddButton };
