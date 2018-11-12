import React, { Component } from 'react';
import { Animated, Easing, TouchableHighlight, TouchableOpacity, View, Modal, Text, TextInput, StyleSheet, Platform, FlatList, Image, Alert } from "react-native";
import EasyBluetooth from 'easy-bluetooth-classic';
import ActionBar from 'react-native-action-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionSheet from 'react-native-actionsheet'
import PropTypes from 'prop-types';

import NavigationService from '../utils/NavigationService';

const SIZE = 65;
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
        studentModalVisible: false,
        refreshing: false,
        deviceCount: 0,
        studentCount: 0,
        scanning: false
    };

    mode = new Animated.Value(0);

    toggleView = () => {
        Animated.timing(this.mode, {
            toValue: this.mode._value === 0 ? 1 : 0,
            duration: 300
        }).start();
    };


    setStudentModalVisible(visible) {
        this.setState({ studentModalVisible: visible });
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
        const { right, bottom} = this.props;        
        return (
            
            <View style={{
                position: 'absolute',
                alignItems: 'center',
                right: right, bottom: bottom, height: 30, width: 30

            }}>               
                {/*ActionSheet 부분 Start*/}
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={['Device 연결', 'Cancel']}
                    cancelButtonIndex={1}
                    //destructiveButtonIndex={1}                    
                    styles={{
                        body: {
                            margin: 20,
                            borderRadius: 5,
                        },
                        titleBox: {
                            borderRadius: 50
                        },
                        buttonBox: {
                            borderRadius: 5,
                            marginBottom: 1,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#fff'
                        },
                        cancelButtonBox: {
                            borderRadius: 5,
                            height: 50,
                            marginTop: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#fff'
                        }
                    }}
                    onPress={(index) => {
                        if (index == 0) {
                            NavigationService.navigate('FindDevice', { });
                        }
                    }}
                />
                {/*ActionSheet 부분 End*/}
                <TouchableHighlight
                    onPress={this.showActionSheet}
                    underlayColor="#2f52c4"
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: SIZE,
                        height: SIZE,
                        borderRadius: 100,
                        backgroundColor: '#2f52c4'
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
AddButton.propTypes = {
    right: PropTypes.string,
    bottom: PropTypes.number,
  }
AddButton.defaultProps = {
    right: "40%",
    bottom: 50,    
};

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
    },
    textInputStyle: {
        marginLeft: 10,
        backgroundColor: '#f2f3f6',
        width: '90%',
        height: 40,
        overflow:"hidden"
    }
});
export { AddButton };
