import React, { Component } from "react";
import { TouchableHighlight, Modal, Image, TextInput, StyleSheet, Text, View, AsyncStorage } from "react-native";
import { CheckBox } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker';
import ActionBar from "react-native-action-bar";
import firebase from "react-native-firebase";
import userInfo from "../data/userInfo"
import moment from 'moment'
import urgentStudents from '../data/urgentStudents'
import SoundPlayer from 'react-native-sound-player'

const options = {
    title: 'Input user data',
    autoColor: 0,
    customButtons: [{ name: 'user_info', title: 'Input user information' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

function updateStudentImage(userImageSource) {
    this.setState({ userImageSource })
    this.forceUpdate()
}

export { updateStudentImage }

export default class Student_FlatListItem extends Component {
    state = {
        isListLongPressed: false,
        selected: false,
        userImageSource: '../images/personxhdpi.png',
        modalVisible: false,
        itemUrgent: false,
        isItemScan: false,
        count: 0,
    }
    constructor(props) {
        super(props);
        this._onLongPressButton = this._onLongPressButton.bind(this);

        this.state.userImageSource = props.item.user_icon_url;
        updateStudentImage = updateStudentImage.bind(this)
    }

    _onLongPressButton() {
        this.props.changeListLongPressedState();
    }

    setUserImageModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    checkListItem() {
        if (this.state.isListLongPressed) {
            this.props.item.selected = !this.props.item.selected
            this.state.selected = this.props.item.selected
            this.forceUpdate()
        }
        else {
            this.setUserImageModalVisible(true);
        }
    }

    componentWillReceiveProps(props) {
        if (!this.state.modalVisible) {
            this.state.email = this.props.item.email
            this.state.name = this.props.item.name
            this.state.tel = this.props.item.tel
            this.state.age = this.props.item.age
            this.state.highhr = this.props.item.highhr
            this.state.lowhr = this.props.item.lowhr
            this.state.slowhr = this.props.item.slowhr
        }
        if (!this.state.isListLongPressed) {
            this.state.selected = false
        }
        if (!this.props.item.isConnected)
            this.state.isItemScan = userInfo.isScan
        /* set urgent situation */
        if (this.props.item.bpm > 127) {
            if (!this.state.itemUrgent) {
                urgentStudents.push({
                    'id': this.props.item.id,
                    'name': this.state.name,
                    'tel': this.state.tel,
                    'age': this.state.age,
                })
                this.props.item.state = "위험한 상태"
            }
            this.state.itemUrgent = true
            this.props.playSiren()
        } else {
            if (this.state.itemUrgent) {
                this.props.item.state = "양호한 상태"
                for (let i = 0; i < urgentStudents.length; i++) {
                    if (urgentStudents[i].id === this.props.item.id) {
                        urgentStudents.splice(i, 1)
                        if (urgentStudents.length == 0) {
                            this.props.setUrgentFalse()
                            SoundPlayer.stop()
                            //SoundPlayer.pause();
                        }
                        break
                    }
                }
            }
            this.state.itemUrgent = false
        }
        this.setState({ isListLongPressed: props.isListLongPressed });

    }

    setUserImage() {
        ImagePicker.showImagePicker(options, response => {
            console.log("Response = ", response);

            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else if (response.customButton) {
                console.log("User tapped custom button: ", response.customButton);
            } else {

                this.setState({
                    userImageSource: response.uri
                });
            }
        });
    }

    saveUserDate() {
        let firebaseID = userInfo.firebaseID
        let dbUrl = 'member/teacher/' + firebaseID

        this.props.item.email = this.state.email
        this.props.item.name = this.state.name
        this.props.item.tel = this.state.tel
        this.props.item.age = this.state.age
        this.props.item.highhr = false
        this.props.item.lowhr = false
        this.props.item.slowhr = false
        if (this.state.highhr) {
            this.props.item.highhr = true
        } else if (this.state.lowhr) {
            this.props.item.lowhr = true
        } else if (this.state.slowhr) {
            this.props.item.slowhr = true
        }

        let dateObj = new Date();
        let date = moment(dateObj).format('YYYY-MM-DD')

        let key = {
            "email": this.props.item.email,
            "name": this.props.item.name,
            "tel": this.props.item.tel,
            "age": this.props.item.age,
            "highhr": this.props.item.highhr,
            "lowhr": this.props.item.lowhr,
            "slowhr": this.props.item.slowhr,
        }
        console.log(dbUrl + '/students/' + date)
        firebase.database().ref(dbUrl + '/students/' + date).once('value', (snapshot) => {
            console.log(snapshot.val())
            if (snapshot.val() === null) {
                console.log("!!!!!!!!!!!!!!!!!!!!")
                var tempKey = firebase.database().ref(dbUrl + "/students/" + date).push().key
                firebase.database().ref(dbUrl + '/students/' + date + '/' + tempKey).set(key)
                var newDataRef = firebase.database().ref("data/" + firebaseID).push().child('user')
                newDataRef.set(key)
            } else {
                console.log("!!!!!@@@@@@@@@@@@@@@@")
                count = 0
                snapshot.forEach((dataSnapShot) => {
                    count = count + 1
                    if (dataSnapShot.tel === this.props.item.tel) {
                        firebase.database().ref(dbUrl +'/students/' + date + '/' + dataSnapShot.key).update(key)
                        count = count - 1
                        return
                    }
                    console.log(snapshot.numChildren() + " , " + count)
                    if (count === snapshot.numChildren()) {
                        var tempKey = firebase.database().ref(dbUrl + "/students/" + date).push().key
                        console.log(dbUrl + '/students/' + date + '/' + tempKey)
                        firebase.database().ref(dbUrl + '/students/' + date + '/' + tempKey).set(key)
                        var newDataRef = firebase.database().ref("data/" + firebaseID).push().child('user')
                        newDataRef.set(key)
                    }
                })
            }
            console.log('넘어간다~')
        })

        if (this.state.userImageSource !== '../images/user/personxhdpi.png')
            firebase
                .storage()
                .ref("student/" + this.state.tel)
                .child("profile.jpg")
                .put(this.state.userImageSource, { contentType: "image/jpg" });
        this._storeData()
        this.setUserImageModalVisible(!this.state.modalVisible);
    }

    _storeData = async () => {
        try {
            //console.log(this.props.item)
            console.log("##################")
            await AsyncStorage.setItem(this.props.item.key, JSON.stringify({
                key: this.props.item.key,
                name: this.state.name,
                email: this.state.email,
                tel: this.state.tel,
                userImageSource: this.state.userImageSource,
                age: this.state.age,
                highhr: this.state.highhr,
                lowhr: this.state.lowhr,
                slowhr: this.state.slowhr,
            }))
        } catch (error) {
            console.log("$$$$$$$$$$$$$$$$$$$")
            console.log(error);
        }
    }


    render() {
        return (
            <View>
                <TouchableHighlight onPress={() => { this.checkListItem() }} onLongPress={() => { this._onLongPressButton() }} underlayColor="#ff0000">
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        padding: 10,
                        alignItems: 'center',
                        backgroundColor:
                            this.state.itemUrgent ? '#f33c17' : '#f9f9fa'
                        //this.props.index % 2 == 0 ? "#ffffff" : "#65edea"
                    }}>
                        {this.state.isListLongPressed ? (
                            <View style={{ flex: 0.18, marginLeft: -10, width: 65, height: 40, paddingTop: 5, paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
                                <CheckBox
                                    title=''
                                    containerStyle={
                                        {
                                            padding: 0,
                                            borderColor: '#ff000000',
                                            backgroundColor: '#ff000000'
                                        }
                                    }
                                    checked={this.state.selected}
                                    onPress={() => { this.checkListItem() }}
                                />
                            </View>

                        ) : null}


                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image source={{ uri: this.state.userImageSource }} style={{
                                width: 50,
                                height: 50,
                                borderWidth: 1,
                                borderColor: '#82889c',
                                borderRadius: 100,
                                backgroundColor: '#f9f9fa'
                            }} />
                        </View>

                        {/*modal부분 start*/}
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                this.setUserImageModalVisible(!this.state.modalVisible);
                            }}
                        >
                            <ActionBar
                                containerStyle={styles.bar}
                                allowFontScaling={true}
                                title="사용자 정보 등록"
                                backgroundColor={"#f9f9fa"}
                                titleStyle={modalStyles.titleStyle}
                                titleContainerStyle={modalStyles.titleContainerStyle}
                                iconImageStyle={modalStyles.iconImageStyle}
                                leftIconName={"back"}
                                onLeftPress={() => this.setUserImageModalVisible(!this.state.modalVisible)}
                                leftIconContainerStyle={modalStyles.leftIconContainerStyle}
                            />
                            <View stlye={{
                                flex: 0.08,
                            }}>
                                <Text style={{
                                    marginLeft: 16,
                                    marginTop: 10,
                                    fontSize: 18,
                                    color: "#3b3e4c",
                                    fontFamily: 'Spoqa Han Sans Bold'
                                }}>수강생 프로필</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginTop: 20
                            }}>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.setUserImage();
                                    }}>
                                    <Image source={{ uri: this.state.userImageSource }} style={{
                                        width: 120,
                                        height: 120,
                                        borderWidth: 1,
                                        borderColor: '#82889c',
                                        borderRadius: 100,
                                        backgroundColor: '#f9f9fa'
                                    }} />
                                </TouchableHighlight>
                            </View>
                            <View style={[styles.info, { marginTop: 20, }]}>
                                <Image
                                    style={{ height: 32, width: 32, marginRight: 10 }}
                                    source={require('../images/id.png')}
                                />
                                <TextInput
                                    style={[styles.textInput, { flex: 0.45, height: 40, borderColor: '#d0d2da', borderWidth: 1, marginRight: 7, }]}
                                    placeholder="홍길동"
                                    placeholderTextColor="rgba(0,0,0,0.6)"
                                    onChangeText={(name) => this.setState({ name })}
                                    value={this.state.name}
                                />
                                <TextInput
                                    style={[styles.textInput, { flex: 0.45, height: 40, borderColor: '#d0d2da', borderWidth: 1, marginLeft: 7, }]}
                                    placeholder="나이"
                                    placeholderTextColor="rgba(0,0,0,0.6)"
                                    onChangeText={(age) => this.setState({ age })}
                                    value={this.state.age}
                                />
                            </View>
                            <View style={[styles.info, { marginTop: 15 }]}>
                                <Image
                                    style={{ height: 32, width: 32, marginRight: 10 }}
                                    source={require('../images/tel.png')}
                                />
                                <TextInput
                                    style={[styles.textInput, { flex: 0.92, height: 40, borderColor: '#d0d2da', borderWidth: 1 }]}
                                    placeholder="010-1234-5678"
                                    placeholderTextColor="rgba(0,0,0,0.6)"
                                    onChangeText={(tel) => this.setState({ tel })}
                                    value={this.state.tel}
                                />
                            </View>
                            <View style={[styles.info, { marginTop: 15 }]}>
                                <Image
                                    style={{ height: 32, width: 32, marginRight: 10 }}
                                    source={require('../images/email.png')}
                                />
                                <TextInput
                                    style={[styles.textInput, { flex: 0.92, height: 40, borderColor: '#d0d2da', borderWidth: 1 }]}
                                    placeholder="email@surfcode.com"
                                    placeholderTextColor="rgba(0,0,0,0.6)"
                                    onChangeText={(email) => this.setState({ email })}
                                    value={this.state.email}
                                />
                            </View>
                            <View
                                style={{
                                    width: '100%',
                                    borderBottomColor: '#d0d2da',
                                    borderBottomWidth: 1,
                                    marginTop: 20,
                                    marginBottom: 10,
                                }}
                            />
                            <View>
                                <Text style={{
                                    marginLeft: 16,
                                    fontSize: 18,
                                    color: "#3b3e4c",
                                    fontFamily: 'Spoqa Han Sans Bold'
                                }}>병력</Text>
                            </View>
                            <View style={[styles.info, {
                                alignItems: 'center',
                                justifyContent: 'center', marginBottom: 10
                            }]}>
                                <TouchableHighlight
                                    onPress={() => this.state.autoColor ? this.setState({ autoColor: 0 }) : this.setState({ autoColor: 1 })}
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    underlayColor="#f9f9fa"
                                ><View>
                                        <CheckBox
                                            title=''
                                            containerStyle={
                                                {
                                                    padding: 0,
                                                    borderColor: '#ff000000',
                                                    backgroundColor: '#ff000000'
                                                }
                                            }
                                            checked={this.state.slowhr}
                                            onPress={() => { this.setState({ slowhr: !this.state.slowhr }) }}
                                        />
                                        <Text
                                            style={{
                                                fontSize: 15,
                                            }}
                                        >서맥</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    onPress={() => this.state.autoColor ? this.setState({ autoColor: 0 }) : this.setState({ autoColor: 1 })}
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    underlayColor="#f9f9fa"
                                ><View>
                                        <CheckBox
                                            title=''
                                            containerStyle={
                                                {
                                                    padding: 0,
                                                    borderColor: '#ff000000',
                                                    backgroundColor: '#ff000000'
                                                }
                                            }
                                            checked={this.state.highhr}
                                            onPress={() => { this.setState({ highhr: !this.state.highhr }) }}
                                        />
                                        <Text
                                            style={{
                                                fontSize: 15,
                                            }}
                                        >고혈압</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    onPress={() => this.state.autoColor ? this.setState({ autoColor: 0 }) : this.setState({ autoColor: 1 })}
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    underlayColor="#f9f9fa"
                                ><View>
                                        <CheckBox
                                            title=''
                                            containerStyle={
                                                {
                                                    padding: 0,
                                                    borderColor: '#ff000000',
                                                    backgroundColor: '#ff000000'
                                                }
                                            }
                                            checked={this.state.lowhr}
                                            onPress={() => { this.setState({ lowhr: !this.state.lowhr }) }}
                                        />
                                        <Text
                                            style={{
                                                fontSize: 15,
                                            }}
                                        >저혈압</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1, }}>

                                <TouchableHighlight
                                    onPress={() => this.saveUserDate()}
                                    underlayColor="rgba(47,82,196,0.7)"
                                    style={[styles.boxContainer, { flex: 1, backgroundColor: "#2f52c4", marginTop: 20, marginLeft: 15 }]}
                                >
                                    <Text
                                        style={{ color: '#f9f9fa' }}
                                    >저장</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    onPress={() => this.setUserImageModalVisible(!this.state.modalVisible)}
                                    underlayColor="rgba(47,82,196,0.7)"
                                    style={[styles.boxContainer, { flex: 1, backgroundColor: "#ffffff", marginTop: 20, borderColor: "#2f52c4", borderWidth: 1, marginRight: 15 }]}
                                >
                                    <Text
                                        style={{ color: '#2f52c4' }}
                                    >취소</Text>
                                </TouchableHighlight>
                            </View>

                        </Modal>
                        {/*modal부분 end*/}

                        <View style={{ flex: 0.45, flexDirection: "column", marginLeft: 25 }}>
                            <Text style={[styles.textStyle,
                            {
                                fontSize: 22,
                                fontFamily: 'Spoqa Han Sans Bold',
                                color: this.state.itemUrgent ? '#f9f9fa' : '#3b3e4c'
                            }]}>
                                {this.props.item.name}
                            </Text>
                            <Text style={[styles.smallText,
                            { color: this.state.itemUrgent ? '#f9f9fa' : '#82889c' }]}>
                                {this.props.item.state}
                            </Text>
                        </View>
                        {this.props.item.isConnected ?
                            <View style={{ flex: 0.55, flexDirection: "row", paddingTop: 5 }}>
                                <View style={{ flex: 0.5, alignItems: 'center' }}>
                                    <Text style={[styles.textStyle, { flex: 0.5, marginBottom: 2, color: this.state.itemUrgent ? '#f9f9fa' : '#3b3e4c' }]}>{this.props.item.bpm} BPM</Text>
                                    <View style={{ flexDirection: 'row', flex: 0.5, marginTop: 2, alignItems: 'center' }}>
                                        <Image style={{ marginRight: 5, width: 12, height: 12, tintColor: this.state.itemUrgent ? '#f9f9fa' : "#82889c", resizeMode: 'contain' }} source={require('../images/empty-heartmdpi.png')} />
                                        <Text style={[styles.smallText, { color: this.state.itemUrgent ? '#f9f9fa' : '#82889c' }]}>심박</Text>
                                    </View>
                                </View>

                                <View style={{ width: 1, marginBottom: 15, backgroundColor: '#d0d2da', marginTop: 15, marginLeft: 5, marginRight: 5 }} />{/* 바 부분 */}
                                <View style={{ flex: 0.5, alignItems: 'center' }}>
                                    <Text style={[styles.textStyle, { flex: 0.5, marginBottom: 2, color: this.state.itemUrgent ? '#f9f9fa' : '#3b3e4c' }]}>{this.props.item.brethe}/Min</Text>
                                    <View style={{ flexDirection: 'row', flex: 0.5, marginTop: 2, alignItems: 'center' }}>
                                        <Image style={{ marginRight: 5, width: 12, height: 12, tintColor: this.state.itemUrgent ? '#f9f9fa' : "#82889c", resizeMode: 'contain' }} source={require('../images/breathingmdpi.png')} />
                                        <Text style={[styles.smallText, { color: this.state.itemUrgent ? '#f9f9fa' : '#82889c' }]}>호흡</Text>
                                    </View>
                                </View>
                            </View> : <View style={{ flex: 0.55, flexDirection: "row", paddingTop: 5 }}>
                                {userInfo.isScan ?
                                    <Text style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: this.state.itemUrgent ? '#f9f9fa' : '#3b3e4c'
                                    }}>
                                        스캔중 ...
                                    </Text>
                                    :
                                    <TouchableHighlight><View>
                                        <Text style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: this.state.itemUrgent ? '#f9f9fa' : '#3b3e4c'
                                        }}>
                                            연결 재시도
                                        </Text>
                                    </View>
                                    </TouchableHighlight>}
                            </View>}
                    </View>
                </TouchableHighlight>
            </View >
        );
    }
}
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
    info: {
        flexDirection: 'row',
        //alignItems: 'center', // 가운데 맞춤
        //justifyContent: 'center', // 위 아래로 중앙정렬
    },
});

const styles = StyleSheet.create({
    textStyle: {
        color: '#3b3e4c',
        fontSize: 12,
        fontFamily: 'Spoqa Han Sans Regular'
    },
    smallText: {
        fontSize: 12,
        color: '#82889c',
        fontFamily: 'Spoqa Han Sans Regular'
    },
    info: {
        flexDirection: 'row',
        marginLeft: 20,
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
        marginLeft: 10,
        marginRight: 10,
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
    },
    bar: {
        height: 55,
        alignItems: "center"
    }
});