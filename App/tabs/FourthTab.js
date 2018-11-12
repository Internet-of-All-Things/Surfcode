import React, { Component } from "react";
import { TouchableHighlight, Modal, StyleSheet, Text, View, Image, AsyncStorage } from "react-native";
import userInfo from "../data/userInfo";
import ActionBar from "react-native-action-bar";
import NavigationService from '../utils/NavigationService';
import { updateLoginButton } from '../screens/Login';
import BluetoothManager from '../utils/BluetoothManager';
import SmsAndroid from 'react-native-get-sms-android';

export default class SecondScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        userImageSource: '../images/personxhdpi.png',
        helpModalVisible: false,
        infoModalVisible: false
    }

    componentWillMount() {
        this.state.userName = userInfo.userName;
        this.state.userImageSource = userInfo.userImage;
    }

    setHelpModalVisible(visible) {
        this.setState({ helpModalVisible: visible });
    }
    setInfoModalVisible(visible) {
        this.setState({ infoModalVisible: visible });
    }
    render() {
        return (
            <View style={styles.container}>
                {/*modal부분 start*/}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.helpModalVisible}
                    onRequestClose={() => {
                        //alert('Modal has been closed.');
                        this.setHelpModalVisible(!this.state.helpModalVisible);
                    }}
                >
                    <View>
                        <ActionBar
                            containerStyle={styles.bar}
                            allowFontScaling={true}
                            title={"도움말"}
                            backgroundColor={"#f9f9fa"}
                            titleStyle={modalStyles.titleStyle}
                            titleContainerStyle={modalStyles.titleContainerStyle}
                            iconImageStyle={modalStyles.iconImageStyle}
                            leftIconName={"back"}
                            onLeftPress={() => this.setModalVisible(!this.state.modalVisible)}
                            leftIconContainerStyle={modalStyles.leftIconContainerStyle}
                        />
                        <View
                            style={{
                                flexDirection: "column",
                            }}
                        >
                            <View style={{marginTop: 20, alignItems: 'center' }}>
                                <Text style={[styles.textStyle, { fontSize: 15, fontFamily: 'Spoqa Han Sans Bold' }]}>팀명 : IoAT(Internet of All Things)</Text>
                            </View>
                            <View style={{ marginTop: 20, marginLeft:30, flexDirection: 'column' }}>
                                <View style={{ alignItems: 'center', flexDirection: 'column' }}>
                                    <View>
                                        <Text style={[styles.textStyle, { lineHeight: 30, textAlign: 'left', fontSize: 14, fontFamily: 'Spoqa Han Sans Regular' }]}>1. +버튼을 눌러 Surfcode 기기와 블루투스로 연결합니다</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.textStyle, { lineHeight: 30, marginTop: 20, textAlign: 'left', fontSize: 14, fontFamily: 'Spoqa Han Sans Regular' }]}>2. 리스트에 추가된 기기를 눌러 사용자 정보를 입력합니다.</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.textStyle, { lineHeight: 30, marginTop: 20, textAlign: 'left', fontSize: 14, fontFamily: 'Spoqa Han Sans Regular' }]}>3. Surfcode 기기를 착용하여 실시간으로 생체 데이터를 전달받습니다.</Text>
                                    </View>
                                </View>
                            </View>


                        </View>
                    </View>
                </Modal>
                {/*modal부분 end*/}
                {/*modal부분 start*/}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.infoModalVisible}
                    onRequestClose={() => {
                        //alert('Modal has been closed.');
                        this.setInfoModalVisible(!this.state.infoModalVisible);
                    }}
                >
                    <View>
                        <ActionBar
                            containerStyle={styles.bar}
                            allowFontScaling={true}
                            title={"Surfcode 정보"}
                            backgroundColor={"#f9f9fa"}
                            titleStyle={modalStyles.titleStyle}
                            titleContainerStyle={modalStyles.titleContainerStyle}
                            iconImageStyle={modalStyles.iconImageStyle}
                            leftIconName={"back"}
                            onLeftPress={() => this.setModalVisible(!this.state.modalVisible)}
                            leftIconContainerStyle={modalStyles.leftIconContainerStyle}
                        />
                        <View
                            style={{
                                flexDirection: "column",
                            }}
                        >
                            <View style={{ marginLeft: 20, marginTop: 10, alignItems: 'center' }}>
                                <Text style={[styles.textStyle, { fontSize: 15, fontFamily: 'Spoqa Han Sans Bold' }]}>팀명 : IoAT(Internet of All Things)</Text>
                            </View>
                            <Text style={[styles.textStyle, { alignItems: 'center', textAlign: 'center', fontSize: 14, fontFamily: 'Spoqa Han Sans Regular' }]}> 박세호 , 최용석, 최찬환</Text>
                            <View style={{ marginTop: 10, marginLeft: 20, flexDirection: 'column' }}>
                                <View style={{ flex: 0.5, alignItems: 'center' }}>

                                    <Text style={[styles.textStyle, { lineHeight: 30, textAlign: 'left', fontSize: 14, fontFamily: 'Spoqa Han Sans Regular' }]}>◎ Surfcode Application은 Surfcode 기기로부터 사용자의 생체데이터를 받아주고, 관리해 주는 어플리케이션입니다.</Text>

                                    <Text style={[styles.textStyle, { lineHeight: 30, marginTop: 20, textAlign: 'left', fontSize: 14, fontFamily: 'Spoqa Han Sans Regular' }]}>◎ 블루투스 디바이스(Surfcode 기기)를 등록 후 사용자를 등록하여 사용자를 관리할 수 있습니다.</Text>

                                    <Text style={[styles.textStyle, { lineHeight: 30, marginTop: 20, textAlign: 'left', fontSize: 14, fontFamily: 'Spoqa Han Sans Regular' }]}>◎ 또한 블루투스로 전달받은 데이터를 실시간으로 보여줌과 동시에 사용자별 데이터를 Firebase DB에 저장합니다.</Text>

                                    <Text style={[styles.textStyle, { lineHeight: 30, marginTop: 20, textAlign: 'left', fontSize: 14, fontFamily: 'Spoqa Han Sans Regular' }]}>◎ 심박수, 호흡수에 기반한 긴급한 상황 발생 시 알람신호를 통하여 즉각적으로 위험한 상황을 인지 할 수있습니다. </Text>
                                </View>
                            </View>


                        </View>
                    </View>
                </Modal>
                {/*modal부분 end*/}
                <View stlye={{
                    flex: 0.08,
                }}>
                    <Text style={[styles.subTitleStyle, { marginLeft: 16, marginTop: 28, marginBottom: 20, fontSize: 16, fontFamily: 'Spoqa Han Sans Bold' }]}>프로필</Text>
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
                        <Text style={[styles.smallText, { color: '#82889c', fontFamily: 'Spoqa Han Sans Regular', }]}>
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
                    }}
                />

                <TouchableHighlight underlayColor="#d0d2da" onPress={function () {
                    AsyncStorage.clear();
                    BluetoothManager.destroyBluetoothManager();
                    updateLoginButton({ auth: 1 });
                    NavigationService.popToTop();
                    NavigationService.navigate('Login');
                }}
                >
                    <Text style={{
                        fontFamily: 'Spoqa Han Sans Regular',
                        marginLeft: 25,
                        paddingTop: 20,
                        paddingBottom: 20,
                        color: '#3b3e4c',
                        fontSize: 16,
                    }}>로그아웃</Text>
                </TouchableHighlight>

                <View
                    style={{
                        width: '100%',
                        borderBottomColor: '#d0d2da',
                        borderBottomWidth: 1
                    }}
                />
                <View stlye={{
                    flex: 0.05,
                }}>
                    <Text style={[styles.subTitleStyle, { marginLeft: 16, fontSize: 16, fontFamily: 'Spoqa Han Sans Bold' }]}>긴급 상황 연결 연락처</Text>
                </View>
                <TouchableHighlight underlayColor="#d0d2da" onPress={function () {
                    //import SmsAndroid  from 'react-native-get-sms-android';
                    SmsAndroid.autoSend('01077238280', '세호가 위험합니다.', (fail) => {
                        console.log("Failed with this error: " + fail)
                    }, (success) => {
                        console.log("SMS sent successfully");
                    });
                }}
                >
                    <Text style={{
                        fontFamily: 'Spoqa Han Sans Regular',
                        paddingTop: 20,
                        paddingBottom: 20,
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
                    }}
                />

                <View stlye={{
                    flex: 0.05,
                }}>
                    <Text style={[styles.subTitleStyle,
                    {
                        fontFamily: 'Spoqa Han Sans Bold',
                        marginLeft: 16,
                        fontSize: 16,
                    }]}>정보</Text>
                </View>

                <TouchableHighlight underlayColor="#d0d2da" onPress={() => {
                    this.setHelpModalVisible(!this.state.helpModalVisible)
                }}>
                    <Text style={{
                        fontFamily: 'Spoqa Han Sans Regular',
                        marginLeft: 25,
                        paddingTop: 20,
                        paddingBottom: 20,
                        color: '#3b3e4c',
                        fontSize: 16,
                    }}>도움말</Text>
                </TouchableHighlight>

                <View
                    style={{
                        width: '100%',
                        borderBottomColor: '#d0d2da',
                        borderBottomWidth: 1,
                    }}
                />

                <TouchableHighlight underlayColor="#d0d2da" onPress={() => {
                    this.setInfoModalVisible(!this.state.infoModalVisible)
                }}>
                    <Text style={{
                        fontFamily: 'Spoqa Han Sans Regular',
                        marginLeft: 25,
                        paddingTop: 20,
                        paddingBottom: 20,
                        color: '#3b3e4c',
                        fontSize: 16,
                    }}>SurfCode 정보</Text>
                </TouchableHighlight>


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
    bar: {
        height: 55,
        alignItems: "center"
    },
    colorStyle: {
        marginLeft: 8,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 6,
        paddingRight: 6,
        borderRadius: 5,
    }
});
const modalStyles = StyleSheet.create({
    titleStyle: {
        fontSize: 16,
        color: "#3b3e4c"
    },
    titleContainerStyle: {
        alignItems: "center",
        paddingRight: 40
    },
    iconImageStyle: {
        width: 14.5,
        height: 30,
        tintColor: "#82889c"
    },
});