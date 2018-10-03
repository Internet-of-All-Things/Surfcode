import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import Login from './Login';

import firebase from 'react-native-firebase';

export default class SignInStudent extends Component {
    state = {
        id: "",
        pw: "",
        autoColor: 1
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
    omponentWillMount() {
        firebase.auth().signOut();
    }

    componentDidMount() {
        
        firebase.auth().onAuthStateChanged(user => {
            if(!user){
                console.log("user null!")
            }else{
                console.log(user);
                this.props.navigation.navigate('Login');
            }
        });
    }

    login(){
        firebase.auth().signInWithEmailAndPassword(this.state.id, this.state.pw).then((data) => {
            console.log("!@#!@ signInWith: "+data);
          }).catch((error) => console.log(error.message));
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={[styles.info, { marginTop: 21 }]}>
                    <Image
                        style={{ height: 32, width: 32, marginRight: 10 }}
                        source={require('../images/id.png')}
                    />
                    <TextInput
                        style={{ flex: 0.8, height: 40, borderColor: '#d0d2da', borderWidth: 1 }}
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
                        style={{ flex: 0.8, height: 40, borderColor: '#d0d2da', borderWidth: 1 }}
                        placeholder="●●●●●●"
                        placeholderTextColor="rgba(0,0,0,0.6)"
                        secureTextEntry
                        onChangeText={(pw) => this.setState({ pw })}
                        value={this.state.pw}
                    />
                </View>
                <View style={styles.autologin}>
                    <TouchableHighlight
                        onPress={() => console.log("????")}
                        underlayColor="#FFFFFF"
                    >
                        <Text
                            onPress={() => this.state.autoColor ? this.setState({ autoColor: 0 }) : this.setState({ autoColor: 1 })}
                            style={{ color: this.state.autoColor ? '#82889c' : '#AA5577' }}
                        > 자동 로그인</Text>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight
                    onPress={() => this.login()}
                    style={[styles.boxContainer, { backgroundColor: "#2f52c4" }]}
                >
                    <Text
                        style={{ color: '#f9f9fa' }}
                    >로그인하기</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => console.log("test")}
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
                    style={[styles.boxContainer, { backgroundColor: "#3c5a9a" }]}
                >
                    <Text
                        style={{ color: '#f9f9fa' }}
                    >페이스북으로 로그인</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => console.log("test")}
                    style={[styles.boxContainer, { borderWidth: 1, borderColor: '#d0d2da' }]}
                >
                    <Text
                        style={{ color: '#3b3e4c' }}
                    >구글로 로그인</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => console.log("test")}
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
        backgroundColor: "#FFFFFF"
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
        marginBottom: 32,
        marginTop: 16,
    },
    orLine: {
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 12,
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
});