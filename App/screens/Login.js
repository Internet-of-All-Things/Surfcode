import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Image, ImageBackground, Dimensions, AsyncStorage } from 'react-native';
import flatListData from "../data/flatListData";
import connDeviceInfo from "../data/connDeviceInfo";
import BluetoothManager from '../utils/BluetoothManager';
import userInfo from '../data/userInfo'
import { renderForUpdateItem } from '../tabs/FirstTab'

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

    startCheckAndScan() {
        userInfo.isScan = true
        BluetoothManager.getBluetoothManager().state().then((state) => {
            if (state === "PoweredOn") {
                console.log("???????????????????대체 뭑 ㅏ문제야")
                this.startScan()
            } else {
                BluetoothManager.getBluetoothManager().enable().then((bleManager) => {
                    this.startCheckAndScan()
                });
            }
        })
        
    }

    startScan() {
        /* start scanning */
        BluetoothManager.getBluetoothManager().startDeviceScan(null,
            null, (error, device) => {
                console.log("scanning");
                if (error) {
                    if(error.message === "Cannot start scanning operation")
                        this.startCheckAndScan()
                    console.log(error)
                    return
                }
                console.log(connDeviceInfo.length + ", , " + flatListData.length)
                if (connDeviceInfo.length === flatListData.length) {
                    console.log("scanning end")
                    BluetoothManager.getBluetoothManager().stopDeviceScan()
                    userInfo.isScan = false
                    //renderForUpdateItem()
                    return
                }

                if (device != null && device.id != null) {
                    console.log("in????")
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
                                            for (let j = 0; j < connDeviceInfo.length; j++) {
                                                if (connDeviceInfo[j].key === device.id) {
                                                    connDeviceInfo.splice(j, 1)
                                                    break
                                                }
                                            }
                                            if (error !== null) {
                                                console.log('비정상적인 연결 해제 2')
                                                for (let j = 0; j < flatListData.length; j++) {
                                                    if (flatListData[j].key === device.id) {
                                                        flatListData[j].isConnected = false;
                                                        break
                                                    }
                                                }
                                                userInfo.isScan = true
                                                renderForUpdateItem()
                                                console.log('비정상적인 연결 해제 ')
                                                this.startCheckAndScan()
                                            } else {
                                                console.log('conn length' + connDeviceInfo.length)
                                                console.log('정상적인 연결 해제')
                                            }
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

                }
                console.log("끝!")
            })

        /* scanner option */
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('Auth');

            if (value !== null) {
                userInfo.email = value.replace(".", "").replace("#", "").replace("$", '').replace("@", "").replace("!", "").replace("%", "")
                    .replace("^", "").replace("&", "").replace("*", "").replace("(", "").replace(")", "").replace("-", "")
                    .replace("/", "").replace("\\", "").replace("[", "").replace("]", "").replace("{", "").replace("}", "")
                    .replace("`", "").replace("~", "").replace("?", "").replace(",", "").replace("<", "").replace(">", "")
                console.log("로그인에 성공 " + userInfo.email)
                let device = JSON.parse(await AsyncStorage.getItem('device'))
                if (device !== null) {
                    for (let i = 0; i < device['devices'].length; i++) {
                        let value = await AsyncStorage.getItem(device['devices'][i].key);
                        if (value === undefined || value === null) {
                            flatListData.push({
                                "key": device['devices'][i].key,
                                "name": device['devices'][i].name,
                                "state": "양호한 상태",
                                "bpm": "미측정",
                                "brethe": "미측정",
                                "user_icon_url": "../images/user/personxhdpi.png",
                                "email": null,
                                "tel": null,
                                "selected": false,
                                "isConnected": false,
                            })
                        } else {
                            value = JSON.parse(value)
                            console.log(value)
                            flatListData.push({
                                "key": value.key,
                                "name": value.name,
                                "state": "양호한 상태",
                                "bpm": "미측정",
                                "brethe": "미측정",
                                "user_icon_url": value.userImageSource,
                                "email": value.email,
                                "tel": value.tel,
                                "selected": false,
                                "isConnected": false,
                            })
                        }
                    }


                    this.startCheckAndScan()
                    // setTimeout(() => { BluetoothManager.getBluetoothManager().stopDeviceScan(); this.state.scanning = false }, 3000)
                }
                this.props.navigation.navigate('Main');
            } else {
                console.log("로그인 되어 있지 않음.");
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
                            style={{ width: '60%', tintColor: '#ffffff', resizeMode: 'contain' }}
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