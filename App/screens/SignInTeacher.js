import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableHighlight, AsyncStorage } from 'react-native';

import Loader from './Loader';

import firebase from 'react-native-firebase';
import { updateLoginButton } from './Login'

export default class SignInStudent extends Component {
    state = {
        id: "",
        pw: "",
        autoColor: 1,
        loading: false,
    }

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: '로그인',
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

    _storeData = async (data) => {
        try {
            await AsyncStorage.setItem('Auth', data);
        } catch (error) {
            console.log(error);
        }
    }

    login() {
        if (this.state.id != "" && this.state.pw != "") {
            this.setState({
                loading: true
            });

            firebase.auth().signInWithEmailAndPassword(this.state.id, this.state.pw).then((data) => {
                this._storeData(this.state.id);
                console.log(data);
                this.setState({
                    loading: false
                });
                updateLoginButton({ auth : 0 })
                this.props.navigation.state.params._login()
                this.props.navigation.navigate('Login');
            }).catch((error) => {
                this.setState({
                    loading: false
                });
                console.log(error.message);
            });
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Loader
                    loading={this.state.loading} />
                <View style={[styles.info, { marginTop: 21 }]}>
                    <Image
                        style={{ height: 32, width: 32, marginRight: 10 }}
                        source={require('../images/id.png')}
                    />
                    <TextInput
                        style={[styles.textInput, { flex: 0.8, height: 40, borderColor: '#d0d2da', borderWidth: 1 }]}
                        placeholder="email@surfcode.com"
                        placeholderTextColor="rgba(0,0,0,0.6)"
                        onChangeText={(id) => this.setState({ id })}
                        value={this.state.id}
                    />
                </View>
                <View style={[styles.info, { marginTop: 14 }]}>
                    <Image
                        style={{ height: 32, width: 32, marginRight: 10 }}
                        source={require('../images/pw.png')}
                    />
                    <TextInput
                        style={[styles.textInput, { flex: 0.8, height: 40, borderColor: '#d0d2da', borderWidth: 1 }]}
                        placeholder="●●●●●●"
                        placeholderTextColor="rgba(0,0,0,0.6)"
                        secureTextEntry
                        onChangeText={(pw) => this.setState({ pw })}
                        value={this.state.pw}
                    />
                </View>
                <View style={styles.autologin}>
                    <TouchableHighlight
                        onPress={() => this.state.autoColor ? this.setState({ autoColor: 0 }) : this.setState({ autoColor: 1 })}
                        style={{
                            height: '100%',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}
                        underlayColor="#f9f9fa"
                    ><View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                            <Image
                                style={{
                                    height: 15,
                                    width: 15,
                                    marginRight: 5,
                                    tintColor: this.state.autoColor ? '#82889c' : '#f33c17',
                                }}
                                source={require('../images/success.png')}

                            />
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: this.state.autoColor ? '#82889c' : '#f33c17',
                                }}
                            >자동 로그인</Text>
                        </View>

                    </TouchableHighlight>
                </View>
                <TouchableHighlight
                    onPress={() => this.login()}
                    underlayColor="rgba(47,82,196,0.7)"
                    style={[styles.boxContainer, { backgroundColor: "#2f52c4" }]}
                >
                    <Text
                        style={{ color: '#f9f9fa' }}
                    >로그인하기</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => console.log("test")}
                    underlayColor="rgba(47,82,196,0.2)"
                    style={[styles.boxContainer]}
                >
                    <Text
                        style={{ color: '#2f52c4' }}
                    >비밀번호 찾기</Text>
                </TouchableHighlight>
                <View style={styles.orLine}>
                    <Text stlye={{ color: '#d0d2da' }}> ──────────  또는  ─────────</Text>
                </View>

                <TouchableHighlight
                    onPress={() => console.log("test")}
                    underlayColor="rgba(60,90,154,0.7)"
                    style={[styles.boxContainer, { backgroundColor: "#3c5a9a" }]}
                >
                    <Text
                        style={{ color: '#f9f9fa' }}
                    >페이스북으로 로그인</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => console.log("test")}
                    underlayColor="rgba(208,210,218,0.7)"
                    style={[styles.boxContainer, { borderWidth: 1, borderColor: '#d0d2da' }]}
                >
                    <Text
                        style={{ color: '#3b3e4c' }}
                    >구글로 로그인</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => console.log("test")}
                    underlayColor="rgba(250,225,0,0.4)"
                    style={[styles.boxContainer, { backgroundColor: "#fae100" }]}
                >
                    <Text
                        style={{ color: '#3b1e1e' }}
                    >카카오톡으로 로그인</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9fa",
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center', // 가운데 맞춤
        justifyContent: 'center', // 위 아래로 중앙정렬
    },
    autologin: {
        alignItems: 'flex-end',
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 16,
        height: 40,
    },
    orLine: {
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 24,
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxContainer: {
        height: 50,
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 16,
        borderRadius: 4,
        alignItems: 'center', // 가운데 맞춤
        justifyContent: 'center', // 위 아래로 중앙정렬
    },
    textInput: {
        width: "100%",
        height: "100%",
        borderRadius: 4,
        borderColor: '#d0d2da',
        borderWidth: 1,
        paddingLeft: 12,
        paddingRight: 12,
    }
});