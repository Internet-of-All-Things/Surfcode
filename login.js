import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Image, ImageBackground, Dimensions } from 'react-native';

export default class Login extends Component {
    state = {
        isTouch: false,
        touchTeacher: false,
        touchStudent: false,
        touchSignUp: false
    }

    _onPressTeacher = () => {
        this.setState({
            isTouch: true,
            touchTeacher: true,
        });
    }

    _onPressStudent = () => {
        this.setState({
            isTouch: true,
            touchStudent: true,
        });
    }

    _onPressSignUp = () => {
        this.setState({
            isTouch: true,
            touchSignUp: true,
        });
    }

    render() {
        var { height, width } = Dimensions.get('window');
        const { isTouch, touchSignUp, touchStudent, touchTeacher } = this.state;
        return (
            <View style={styles.container}>
                {!isTouch ? (
                    <ImageBackground
                        style={{ width: '100%', height: '100%' }}
                        source={require('./images/background.png')}>
                        <View style={styles.container}>

                            <View
                                style={styles.logo}>
                                <Image
                                    style={{ width: '70%' }}
                                    source={require('./images/logo.png')}
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableHighlight
                                    onPress={this._onPressTeacher}
                                    style={[styles.FirstButton, styles.boxContainer]}
                                >
                                    <Text
                                        style={{ color: '#2f52c4' }}
                                    >강사로 로그인하기</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    onPress={this._onPressStudent}
                                    style={[styles.SecondButton, styles.boxContainer]}
                                >
                                    <Text
                                        style={{ color: '#f9f9fa' }}
                                    >수강생으로 로그인하기</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    onPress={this._onPressSignUp}
                                    style={[styles.ThirdButton, styles.boxContainer]}
                                >
                                    <Text
                                        style={{ color: '#b7c3ea' }}
                                    >회원가입하기</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </ImageBackground>
                ) : (<Text>touch!!!</Text>)}
            </View>
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