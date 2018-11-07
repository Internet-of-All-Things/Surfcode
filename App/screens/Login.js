import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Image, ImageBackground, Dimensions, AsyncStorage } from 'react-native';
import flatListData from "../data/flatListData";
import connDeviceInfo from "../data/connDeviceInfo";
import BluetoothManager from '../utils/BluetoothManager';
import { updateState } from '../components/Student_BasicFlatList';

export default class Login extends Component {
    state = {
        auth: 0,
        cnt: 0,
        //count: 0
    }
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this._retrieveData();
        //AsyncStorage.clear()
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('Auth');
            
            if (value !== null) {
                /*const count = await AsyncStorage.getItem('Count')
                //this.state.count = count;
                console.log('count : ' + count)
                console.log('flatListData :' +flatListData.length)
                
                if (count === '0' || count === null || count == flatListData.length){
                    this.props.navigation.navigate('Main');
                    return
                }
                    
                console.log('run !!!!!!!!!!!')
                for (let i = flatListData.length; i <= parseInt(count); i++) {
                    let device = await AsyncStorage.getItem('device' + i)
                    console.log(device)
                    let splitDevice = device.split(',')
                    flatListData.push({
                        "key": splitDevice[0],
                        "name": splitDevice[1],
                        "state": "양호한 상태",
                        "bpm": "미측정",
                        "brethe": "미측정",
                        "user_icon_url": "../images/user/ch.png",
                        "selected": false
                    })
                }

                if (flatListData.length != parseInt(count)){
                    BluetoothManager.getBluetoothManager().startDeviceScan(null,
                        null, (error, device) => {
                            console.log("Scanning..." + count)
                            if (count === flatListData.length) {
                                BluetoothManager.getBluetoothManager().stopDeviceScan()
                            }

                            if (device != null && device.id != null) {
                                for (let i = 0; i < flatListData.length; i++) {
                                    if (flatListData[i].key === device.id) {

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
                                                this.state.cnt = this.state.cnt + 1
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
                }
*/
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