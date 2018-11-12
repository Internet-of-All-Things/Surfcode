import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableHighlight, AsyncStorage, ScrollView } from 'react-native';

import Loader from './Loader';

import firebase from 'react-native-firebase';
import { updateLoginButton } from './Login'

export default class SignInStudent extends Component {
    state = {
        id: "",
        pw: "",
        cpw: "",
        name: "",
        nickname: "",
        phone: "",
        school: "",
        career: "",
        autoColor: 1,
        toggleColor: 1,
        loading: false,
    }

    constructor(props) {
        super(props);
        //this._bootstrapAsync();
    }    

    static navigationOptions = {
        title: '회원가입',
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
          // Error saving data
        }
      }

    _bootstrapAsync = async () => {
        //const userToken = await AsyncStorage.getItem('userToken');

        //this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }

    createAccount() {
        this.setState({
            loading: true
        });

        firebase.auth()
            .createUserWithEmailAndPassword(this.state.id, this.state.pw)
            .then(() => {
                firebase.auth()
                .signInWithEmailAndPassword(this.state.id, this.state.pw)
                .then((data) => {
                    this._storeData(data);
                    firebase.database().ref('member/teacher/'+this.state.id
                    .replace(".","").replace("#","").replace("$",'').replace("@","").replace("!","").replace("%","")
                    .replace("^","").replace("&","").replace("*","").replace("(","").replace(")","").replace("-","")
                    .replace("/","").replace("\\","").replace("[","").replace("]","").replace("{","").replace("}","")
                    .replace("`","").replace("~","").replace("?","").replace(",","").replace("<","").replace(">",""))
                    .set(
                        {
                            email: this.state.id,
                            name: this.state.name,
                            nickname: this.state.nickname,
                            phone : this.state.phone,
                            school: this.state.school,
                            career: this.state.career,
                        }
                    ).then(() => {
                        console.log("INSERTED !");
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
                    }).catch((error) => {
                        console.log(error);
                    });
                }).catch((error) => {
                    this.setState({
                        loading: false
                    });
                    console.log(error.message);
                });
            })
            .catch((error) => {
                this.setState({
                    loading: false
                });
                console.log(error.code);
                if(error.code == "auth/email-already-in-use"){
                    console.log("이미 존재하는 이메일 아이디입니다.");
                }else if(error.code =="auth/invalid-password"){
                    console.log("비밀번호는 6자리 이상이어야합니다.");
                }

            })
    }

    signUp() {
        if (this.state.id != "" &&
            this.state.pw != "" &&
            this.state.cpw != "" &&
            this.state.name != "" &&
            this.state.nickname != "" &&
            this.state.phone != ""&&
            this.state.school != ""){
                this.createAccount();
        } 
    }
    
    render() {

        return (
            <ScrollView style={styles.container}>
                <Loader
                    loading={this.state.loading} />

                <View style={styles.account}><Text style={styles.indexText}>계정 정보</Text></View>
                <View style={styles.info}>
                    <Image
                        style={{ height: 32, width: 32, marginRight: 10 }}
                        source={require('../images/id.png')}
                    />
                    <TextInput
                        style={[{ flex: 0.8 }, styles.textInput]}
                        placeholder="아이디(이메일)"
                        placeholderTextColor="rgba(0,0,0,0.4)"
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
                        style={[{ flex: 0.8 }, styles.textInput]}
                        placeholder="비밀번호"
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        secureTextEntry
                        onChangeText={(pw) => this.setState({ pw })}
                        value={this.state.pw}
                    />
                </View>
                <View style={[styles.info, { marginTop: 14 }]}>
                    <Image
                        style={{ height: 32, width: 32, marginRight: 10 }}
                        source={require('../images/pw.png')}
                    />
                    <TextInput
                        style={[{ flex: 0.8 }, styles.textInput]}
                        placeholder="비밀번호 확인"
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        secureTextEntry
                        onChangeText={(cpw) => this.setState({ cpw })}
                        value={this.state.cpw}
                    />
                </View>
                <View style={styles.account}><Text style={styles.indexText}>회원 정보</Text></View>

                <View style={[styles.boxContainer, { flexDirection: 'row' }]}>
                    <TextInput
                        style={[{ flex: 1, marginRight: 6 }, styles.textInput]}
                        placeholder="이름"
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                    />
                    <TextInput
                        style={[{ flex: 1, marginLeft: 6 }, styles.textInput]}
                        placeholder="닉네임"
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        onChangeText={(nickname) => this.setState({ nickname })}
                        value={this.state.nickname}
                    />
                </View>

                <View style={styles.boxContainer}>
                    <TextInput
                        style={[styles.textInput]}
                        placeholder= "전화번호"
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        onChangeText={(phone) => this.setState({ phone })}
                        value={this.state.phone}
                    />
                </View>

                
                    <View style={styles.boxContainer}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="소속 서핑 스쿨"
                            placeholderTextColor="rgba(0,0,0,0.4)"
                            onChangeText={(school) => this.setState({ school })}
                            value={this.state.school}
                        />
                    </View>
               



                <View style={styles.autologin}>
                    <View style={{ flex: 0.8 }}>
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
                                >개인정보 수집 및 이용 동의</Text>
                            </View>

                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 0.2, alignItems: 'flex-end', }}>
                        <TouchableHighlight
                            onPress={() => console.log("????")}
                            underlayColor="#FFFFFF"
                        >
                            <Text
                                onPress={() => { }}
                                style={{ color: '#82889c' }}
                            >내용 읽기</Text>
                        </TouchableHighlight>
                    </View>
                </View>

                <TouchableHighlight
                    onPress={() => this.signUp() }
                    underlayColor="#rgba(47,82,196,0.7)"
                    style={[styles.boxContainer, { backgroundColor: "#2f52c4", height: 44 }]}
                >
                    <Text
                        style={{ color: '#f9f9fa', fontSize: 15, }}
                    >회원가입하기</Text>
                </TouchableHighlight>

            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9fa",
    },
    indexText: {
        color: '#3b3e4c',
        fontWeight: 'bold',
        fontSize: 17,
    },
    toggle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: '100%',
    },
    autologin: {
        alignItems: 'flex-end',
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 6,
        flexDirection: 'row',
        height: 40,
        alignItems: 'center', // 가운데 맞춤
        justifyContent: 'center', // 위 아래로 중앙정렬
    },
    account: {
        marginTop: 18,
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 18,
        alignItems: 'flex-start', // 가운데 맞춤
    },
    info: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center', // 가운데 맞춤
        justifyContent: 'center', // 위 아래로 중앙정렬
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
        height: 40,
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 18,
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