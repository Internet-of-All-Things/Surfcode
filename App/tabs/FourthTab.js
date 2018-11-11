import React, { Component } from "react";
import { TouchableHighlight, StyleSheet, Text, View, Image, AsyncStorage } from "react-native";
import userInfo from "../data/userInfo";
import NavigationService from '../utils/NavigationService';
import { updateLoginButton } from '../screens/Login';
import BluetoothManager from '../utils/BluetoothManager';

export default class SecondScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        userImageSource: '../images/personxhdpi.png',
    }

    componentWillMount() {
        this.state.userName = userInfo.userName;
        this.state.userImageSource = userInfo.userImage;
    }

    render() {
        return (
            <View style={styles.container}>
                <View stlye={{
                    flex: 0.08,
                }}>
                    <Text style={[styles.subTitleStyle, { marginLeft: 16, marginTop: 28, marginBottom : 20, fontSize : 16 }]}>프로필</Text>
                </View>
                <View style={{
                    flex: 0.1,
                    flexDirection: "row",
                    padding: 10,
                    alignItems: 'center',
                    backgroundColor: '#f9f9fa'
                }}>
                    <Image source={{ uri: this.state.userImageSource }} style={{
                        width: 50,
                        height: 50,
                        borderWidth: 1,
                        borderColor: '#82889c',
                        borderRadius: 100,
                        backgroundColor: '#f9f9fa',
                        marginTop: 10
                    }} />

                    <View style={{ flex: 0.45, flexDirection: "column", marginLeft: 25 }}>
                        <Text style={[styles.textStyle,
                        {
                            fontSize: 22,
                            fontFamily: 'Spoqa Han Sans Bold',
                            color: '#3b3e4c'
                        }]}>
                            {userInfo.userName}
                        </Text>
                        <Text style={[styles.smallText,
                        { color: '#82889c' }]}>
                            강사
                                </Text>
                    </View>

                </View>
                <View
                    style={{
                        width: '100%',
                        borderBottomColor: '#d0d2da',
                        borderBottomWidth: 1,
                        marginTop: 40,
                        marginBottom: 20,
                    }}
                />

                <TouchableHighlight onPress={function () {
                    AsyncStorage.clear();
                    BluetoothManager.destroyBluetoothManager();
                    updateLoginButton({ auth: 1 });
                    console.log(NavigationService)
                    NavigationService.popToTop();
                    NavigationService.navigate('Login');
                }}
                >
                    <Text style={{
                        marginLeft: 25,
                        color: '#3b3e4c',
                        fontSize: 16,
                    }}>로그아웃</Text>
                </TouchableHighlight>

                <View
                    style={{
                        width: '100%',
                        borderBottomColor: '#d0d2da',
                        borderBottomWidth: 1,
                        marginTop: 20,
                    }}
                />
                <View stlye={{
                    flex: 0.05,
                }}>
                    <Text style={[styles.subTitleStyle, { marginLeft: 16, marginTop: 15, marginBottom: 20, fontSize:16, }]}>긴급 상황 연결 연락처</Text>
                </View>
                <TouchableHighlight onPress={function () {
                    
                }}
                >
                    <Text style={{
                        marginLeft: 25,
                        color: '#3b3e4c',
                        fontSize: 16,
                    }}>010-1234-1234</Text>
                </TouchableHighlight>

                <View
                    style={{
                        width: '100%',
                        borderBottomColor: '#d0d2da',
                        borderBottomWidth: 1,
                        marginTop: 20,
                    }}
                />

                <View stlye={{
                    flex: 0.05,
                }}>
                    <Text style={[styles.subTitleStyle, 
                        { marginLeft: 16, 
                        marginTop: 15,
                        marginBottom: 20,
                        fontSize:16, }]}>정보</Text>
                </View>

                <TouchableHighlight onPress={function () {
                    
                }}
                >
                    <Text style={{
                        marginLeft: 25,
                        color: '#3b3e4c',
                        fontSize: 16,
                    }}>도움말</Text>
                </TouchableHighlight>

                <View
                    style={{
                        width: '100%',
                        borderBottomColor: '#d0d2da',
                        borderBottomWidth: 1,
                        marginTop: 20,
                        marginBottom: 20,
                    }}
                />

                <TouchableHighlight onPress={function () {
                    
                }}
                >
                    <Text style={{
                        marginLeft: 25,
                        color: '#3b3e4c',
                        fontSize: 16,
                    }}>SurfCode 정보</Text>
                </TouchableHighlight>

                <View
                    style={{
                        width: '100%',
                        borderBottomColor: '#d0d2da',
                        borderBottomWidth: 1,
                        marginTop: 20,
                    }}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9fa",
    },
    subTitleStyle: {
        fontSize: 14,
        color: "#3b3e4c",
        fontFamily: 'Spoqa Han Sans Bold'
    },
});
