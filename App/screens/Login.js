import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Image, ImageBackground, Dimensions, AsyncStorage } from 'react-native';
import flatListData from "../data/flatListData";
import connDeviceInfo from "../data/connDeviceInfo";
import BluetoothManager from '../utils/BluetoothManager';
import { updateState } from '../components/Student_BasicFlatList';
import { updateStudentImage } from '../components/Student_FlatListItem';
import firebase from "react-native-firebase";

export default class Login extends Component {
    state = {
        auth: 0,
    }
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this._retrieveData();
        //AsyncStorage.clear()
    }

    componentWillUnmount() {
        //BluetoothManager.getBluetoothManager().stopDeviceScan()
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('Auth');

            if (value !== null) {
                const count = await AsyncStorage.getItem('Count')
                console.log("count : " + count)
                for (let i = 1; i < parseInt(count) + 1; i++) {
                    let device = await AsyncStorage.getItem('device' + i)
                    console.log(device)
                    let splitDevice = device.split(',')

                    console.log(splitDevice[0] + "/////////////////////")
                    let value = await AsyncStorage.getItem(splitDevice[0]);
                    console.log(value)
                    console.log(value.key + "???????????????????????????????????")
                    if (value === undefined) {
                        flatListData.push({
                            "key": splitDevice[0],
                            "name": splitDevice[1],
                            "state": "양호한 상태",
                            "bpm": "미측정",
                            "brethe": "미측정",
                            "user_icon_url": "../images/user/personxhdpi.png",
                            "email": null,
                            "tel": null,
                            "selected": false
                        })
                    } else {
                        
                        let splitValue = value.split(',')
                        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
                        console.log(splitValue[4])
                        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
                        flatListData.push({
                            "key": splitValue[0],
                            "name": splitValue[1],
                            "state": "양호한 상태",
                            "bpm": "미측정",
                            "brethe": "미측정",
                            "user_icon_url": splitValue[4],
                            "email": splitValue[2],
                            "tel": splitValue[3],
                            "selected": false
                        })
                        /* User Image Info */
                        /*firebase.storage().ref(value.tel + '/profile.jpg').getDownloadURL()
                            .then((url) => {
                                updateStudentImage({ userImuserImageSourceage: url });
                            }).catch((error) => {
                               
                                if (error.code === 'storage/object-not-found')
                                    updateStudentImage({ userImuserImageSourceage: '../images/personxhdpi.png' });
                            })*/
                    }
                }

                /* start scanning */
                BluetoothManager.getBluetoothManager().startDeviceScan(null,
                    null, (error, device) => {
                        console.log("scanning");
                        //console.log(flatListData[0].key + ", , " + device.id)
                        if (connDeviceInfo.length === flatListData.length) {
                            BluetoothManager.getBluetoothManager().stopDeviceScan()
                            return
                        }

                        if (device != null && device.id != null) {
                            for (let i = 0; i < flatListData.length; i++) {
                                if (flatListData[i].key === device.id) {
                                    console.log("찾앗다.")
                                    for (let j = 0; j < connDeviceInfo.length; j++) {
                                        if (connDeviceInfo[j].key === device.id) {
                                            return;
                                        }
                                    }
                                    connDeviceInfo.push({
                                        "key": flatListData[i].key,
                                        "name": flatListData[i].name,
                                    })
                                    device.connect()
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

                                        }, (error) => {
                                            console.log(error.message)
                                        })
                                    return
                                }

                            }

                            if (error) {
                                this.error(error.message)
                                return
                            }
                        }

                    })
                /* scanner option */
                // setTimeout(() => { BluetoothManager.getBluetoothManager().stopDeviceScan(); this.state.scanning = false }, 3000)
                this.props.navigation.navigate('Main');
            } else {
                console.log("value is null");
                this.setState({ auth: 1 });
            }
        } catch (error) {
            console.log(error);
            this.setState({ auth: 1 });
        }
    }

    render() {
        var { height, width } = Dimensions.get('window');
        return (
            <ImageBackground
                style={{ width: '100%', height: '100%' }}
                source={require('../images/background.png')}>
                <View style={styles.container}>

                    <View
                        style={styles.logo}>
                        <Image
                            style={{ width: '70%' }}
                            source={require('../images/logo.png')}
                        />
                    </View>
                    {this.state.auth ? (

                        <View style={styles.buttonContainer}>
                            <TouchableHighlight
                                onPress={() => this.props.navigation.navigate('SignInTeacher')}
                                underlayColor="#rgba(255,255,255,0.5)"
                                style={[styles.FirstButton, styles.boxContainer]}
                            >
                                <Text
                                    style={{ color: '#2f52c4' }}
                                >강사로 로그인하기</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={() => this.props.navigation.navigate('SignInStudent')}
                                underlayColor="#rgba(255,255,255,0.5)"
                                style={[styles.SecondButton, styles.boxContainer]}
                            >
                                <Text
                                    style={{ color: '#f9f9fa' }}
                                >수강생으로 로그인하기</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={() => this.props.navigation.navigate('SignUp')}
                                underlayColor="#rgba(255,255,255,0.5)"
                                style={[styles.ThirdButton, styles.boxContainer]}
                            >
                                <Text
                                    style={{ color: '#b7c3ea' }}
                                >회원가입하기</Text>
                            </TouchableHighlight>
                        </View>
                    ) : (<View></View>)}
                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //flexDirection: 'column', // 수직방향
    },
    logo: {
        flex: 0.73,
        alignItems: 'center', // 가운데 맞춤
        justifyContent: 'center', // 위 아래로 중앙정렬
    },
    buttonContainer: {
        flex: 0.27,
    },
    boxContainer: {
        flex: 1,
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 16,
        borderRadius: 4,
        alignItems: 'center', // 가운데 맞춤
        justifyContent: 'center', // 위 아래로 중앙정렬
    },
    FirstButton: {
        alignItems: 'center',
        backgroundColor: '#f9f9fa',
    },
    SecondButton: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: '#f9f9fa',
        borderWidth: 1,
    },
    ThirdButton: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
    }
});