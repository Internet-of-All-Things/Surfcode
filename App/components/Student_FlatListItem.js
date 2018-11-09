import React, { Component } from "react";
import { TouchableHighlight, TouchableOpacity, FlatList, Modal, Image, TextInput, StyleSheet, Text, View } from "react-native";
import { CheckBox } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker';
import flatListData from "../data/flatListData";
import ActionBar from "react-native-action-bar";
import firebase from "react-native-firebase";

const options = {
    title: 'Input user data',
    customButtons: [{ name: 'user_info', title: 'Input user information' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
export default class Student_FlatListItem extends Component {
    state = {
        isListLongPressed: false,
        itemChecked: false,
        userImageSource: '../images/personxhdpi.png',
        modalVisible: false,
    }
    constructor(props) {
        super(props);
        this._onLongPressButton = this._onLongPressButton.bind(this);
        //var imageName = `image!${props.item.user_icon_url}`
        //this.setState({ userImageSource: props.item.user_icon_url });

        this.state.userImageSource = props.item.user_icon_url;
        //console.log(this.state.userImageSource + "!!!!" + props.item.user_icon_url);
    }
    _onLongPressButton() {
        this.props.changeListLongPressedState();
    }

    setUserImageModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    checkListItem() {
        if (this.state.isListLongPressed) {
            console.log("dddd", this.state);
            var itemstate = this.state.itemChecked = !this.state.itemChecked;
            this.setState({ itemChecked: itemstate });
            //this.state.checked = !this.state.checked//이건 위의 this.state
            this.props.changeListCheckBoxSelectState(this.props.index, itemstate);
            console.log(this.props.index + " checked : " + itemstate);
        }
        else {
            this.setUserImageModalVisible(true);
        }
    }
    componentWillReceiveProps(props) {
        this.setState({ itemChecked: false });
        this.setState({ isListLongPressed: props.isListLongPressed });
        //console.log("item! : " + this.state.isListLongPressed + " " + this.props.index + " "+ this.state.itemChecked + " " + JSON.stringify(props) );
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
            //const source = { uri: response.uri };
    
            // You can also display the image using data:
            const source = { uri: "data:image/jpeg;base64," + response.data };
    
            // const fs = RNFetchBlob.fs;
            firebase
              .storage()
              .ref("student/"+this.state.tel)
              .child("profile.jpg")
              .put(response.uri, { contentType: "image/jpg" });
      
            this.setState({
                userImageSource: response.uri
            });
          }
        });
      }
    saveUserDate() {
        flatListData[this.props.index].email = this.state.email;
        flatListData[this.props.index].name = this.state.name;
        flatListData[this.props.index].tel = this.state.tel;
        this.setUserImageModalVisible(!this.state.modalVisible);
    }


    render() {
        return (
            <View>
                <TouchableHighlight onPress={() => { this.checkListItem() }} onLongPress={() => { this._onLongPressButton() }} underlayColor="#ff0000">
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        padding: 10,
                        alignItems : 'center',
                        backgroundColor:
                            '#f9f9fa'
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
                                    checked={this.state.itemChecked}
                                    onPress={() => { this.checkListItem() }}
                                />
                            </View>

                        ) : null}


                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems : 'center'
                        }}>
                            <Image source={{uri:this.state.userImageSource}} style={{
                                width: 50,
                                height: 50,
                                borderWidth: 1,
                                borderColor: '#82889c',
                                borderRadius: 100,
                                backgroundColor:'#f9f9fa'
                            }}  />
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
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginTop: 20
                            }}>
                                <TouchableHighlight
                                    onPress={() => {
                                        console.log("dsfsdf");
                                        this.setUserImage();
                                    }}>
                                    <Image source={{uri:this.state.userImageSource}} style={{
                                        width: 120,
                                        height: 120,
                                        borderWidth: 1,
                                        borderColor: '#82889c',
                                        borderRadius: 100,
                                        backgroundColor:'#f9f9fa'
                                    }} />
                                </TouchableHighlight>
                            </View>
                            <View style={[styles.info, { marginTop: 20 }]}>
                                <Image
                                    style={{ height: 32, width: 32, marginRight: 10 }}
                                    source={require('../images/id.png')}
                                />
                                <TextInput
                                    style={[styles.textInput, { flex: 0.8, height: 40, borderColor: '#d0d2da', borderWidth: 1 }]}
                                    placeholder="홍길동"
                                    placeholderTextColor="rgba(0,0,0,0.6)"
                                    onChangeText={(name) => this.setState({ name })}
                                    value={this.state.name}
                                />
                            </View>
                            <View style={[styles.info, { marginTop: 15 }]}>
                                <Image
                                    style={{ height: 32, width: 32, marginRight: 10 }}
                                    source={require('../images/tel.png')}
                                />
                                <TextInput
                                    style={[styles.textInput, { flex: 0.8, height: 40, borderColor: '#d0d2da', borderWidth: 1 }]}
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
                                    style={[styles.textInput, { flex: 0.8, height: 40, borderColor: '#d0d2da', borderWidth: 1 }]}
                                    placeholder="email@surfcode.com"
                                    placeholderTextColor="rgba(0,0,0,0.6)"
                                    onChangeText={(email) => this.setState({ email })}
                                    value={this.state.email}
                                />
                            </View>

                            <TouchableHighlight
                                onPress={() => this.saveUserDate()}
                                underlayColor="rgba(47,82,196,0.7)"
                                style={[styles.boxContainer, { backgroundColor: "#2f52c4", marginTop: 20 }]}
                            >
                                <Text
                                    style={{ color: '#f9f9fa' }}
                                >저장</Text>
                            </TouchableHighlight>
                        </Modal>
                        {/*modal부분 end*/}

                        <View style={{ flex: 0.45, flexDirection: "column", marginLeft: 25 }}>
                            <Text style={[styles.textStyle, { fontSize: 22, fontFamily: 'Spoqa Han Sans Bold' }]}>{this.props.item.name}</Text>
                            <Text style={styles.smallText}>{this.props.item.state}</Text>
                        </View>
                        <View style={{ flex: 0.55, flexDirection: "row", paddingTop: 5 }}>
                            <View style={{ flex: 0.5, alignItems: 'center' }}>
                                <Text style={[styles.textStyle, { flex: 0.5, marginBottom:2}]}>{this.props.item.bpm} BPM</Text>
                                <View style={{ flexDirection: 'row', flex: 0.5,marginTop:2, alignItems:'center' }}>
                                    <Image style={{ marginRight: 5, width: 12, height: 12, tintColor: "#82889c", resizeMode: 'contain' }} source={require('../images/empty-heartmdpi.png')} />
                                    <Text style={styles.smallText}>심박</Text>
                                </View>
                            </View>

                            <View style={{ width: 1, marginBottom: 15, backgroundColor: '#d0d2da', marginTop: 15, marginLeft:5, marginRight:5 }} />{/* 바 부분 */}
                            <View style={{ flex: 0.5, alignItems: 'center' }}>
                                <Text style={[styles.textStyle, { flex: 0.5, marginBottom:2 }]}>{this.props.item.brethe}/Min</Text>
                                <View style={{ flexDirection: 'row', flex: 0.5,marginTop:2, alignItems:'center' }}>
                                    <Image style={{ marginRight: 5, width: 12, height: 12, tintColor: "#82889c", resizeMode: 'contain' }} source={require('../images/breathingmdpi.png')} />
                                    <Text style={styles.smallText}>호흡</Text>
                                </View>
                            </View>
                        </View>
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
    },
    bar: {
        height: 55,
        alignItems: "center"
    }
});