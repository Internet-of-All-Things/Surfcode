import React, { Component } from "react";
import {
  Platform,
  TouchableHighlight,
  StyleSheet,
  Modal,
  Text,
  Image,
  View,
  AsyncStorage,
  Dimensions
} from "react-native";
import ActionBar from "react-native-action-bar";
import { AddButton } from "../components/AddButton";
//import BoxLayout from "../BoxLayout";
import Student_BasicFlatList from "../components/Student_BasicFlatList";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import flatListData from "../data/flatListData";
import { CheckBox } from "react-native-elements";

import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob'

var screen = Dimensions.get("window");
let listData = [];

const options = {
  title: 'Input user data',
  //customButtons: [{ name: 'user_info', title: 'Input user information' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

function renderForUpdate(){
  if(!this.state.unmount)
    this.forceUpdate()
}

export { renderForUpdate }

export default class FirstTab extends Component {
  state = {
    modalVisible: false,

    isListLongPressed: false,
    isFirstTabPage: true,
    /* User Info */
    userName: '이름',
    userSchool: '스쿨',
    userNickName: '닉네임',
    userId: '이메일',
    userTel: '연락처',
    userCareer: '경력',
    userImage: '이미지',
    /* firebase */
    firebaseID: '', 

  };

  constructor(props) {
    super(props)
    this._retrieveData()
    renderForUpdate = renderForUpdate.bind(this)
  }

  componentWillUnmount(){
    this.setState({unmount : true})
    console.log("Unmount!!!!!!!!!!!!!!!!!!!!!!!")
  }

  _retrieveData = async () => {
    try {
      /* get Email ID */
      var value = await AsyncStorage.getItem('Auth');
      this.readUserData(value);
    } catch (error) {
      /* return to Login */
      this.props.navigation.navigate('Login');
    }
  }

  readUserData = async (value) => {
    this.state.firebaseID = value.replace(".", "").replace("#", "").replace("$", '').replace("@", "").replace("!", "").replace("%", "")
                          .replace("^", "").replace("&", "").replace("*", "").replace("(", "").replace(")", "").replace("-", "")
                          .replace("/", "").replace("\\", "").replace("[", "").replace("]", "").replace("{", "").replace("}", "")
                          .replace("`", "").replace("~", "").replace("?", "").replace(",", "").replace("<", "").replace(">", "")
    let dbUrl = 'member/teacher/' + this.state.firebaseID
    console.log(this.state.firebaseID)
    firebase.database().ref(dbUrl).on('value', (snapshot) => {
      let user = snapshot.val()
      this.setState({
        /* User Info */
        userName: user.name,
        userSchool: user.school,
        userNickName: user.nickname,
        userId: user.email,
        userTel: user.phone,
        userCareer: user.career,
      })
      /* User Image Info */
      firebase.storage().ref(this.state.firebaseID+ '/profile.jpg').getDownloadURL()
        .then((url) => {
          this.setState({ userImage: url });
      }).catch((error) => {
          /* There is no match ref */
          if(error.code === 'storage/object-not-found')
            this.setState({ userImage: '../images/personxhdpi.png' })
      })
    });
  }

  changePage = () => {
    console.log("~~~~~~~~~~~~~~~~~~~~!!");
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
    if (visible) {
      this.setState({
        isFirstTabPage: false
      })
    }
    else {
      this.setState({
        isFirstTabPage: true
      })
    }
    this.setState({
      isListLongPressed: false
    })
  }
  changeListLongPressedState = () => {
    this.setState({
      isFirstTabPage: true,
      isListLongPressed: !this.state.isListLongPressed
    });
    if (this.state.isListLongPressed) {
      listData = [];
    }
    console.log("isLong!! : " + this.state.isListLongPressed);
  };

  changeListCheckBoxSelectState = (index, checked) => {
    console.log("changeListCheckBoxSelectState : " + index + " " + checked);
    if (checked) {
      listData.push(index);
    } else {
      for (let i = 0; i < listData.length; i++) {
        if (listData[i] == index) {
          listData.splice(i, 1);
          break;
        }
      }
    }
    for (let i = 0; i < listData.length; i++) {
      console.log("★ listData[" + i + "] " + JSON.stringify(listData[i]));
    }
  };
  removeStudentData = () => {
    for (let i = 0; i < flatListData.length; i++) {
      console.log(
        "before flatListData[" + i + "] " + JSON.stringify(flatListData[i])
      );
    }
    for (let i = 0; i < listData.length; i++) {
      flatListData.splice(listData[i] - i, 1);
      console.log(
        "deleted[" + listData[i] + "] " + JSON.stringify(flatListData[i])
      );
    }
    for (let i = 0; i < flatListData.length; i++) {
      console.log(
        "after latListData[" + i + "] " + JSON.stringify(flatListData[i])
      );
    }
    this.setState({
      isFirstTabPage: true,
      isListLongPressed: !this.state.isListLongPressed
    });
    console.log(this.state.isListLongPressed + "!!!!");
  };
  deleteCancel = () => {
    this.setState({
      isFirstTabPage: true,
      isListLongPressed: !this.state.isListLongPressed
    });
    console.log(this.state.isListLongPressed + "~!!!!");
  }

  uploadImage = (uri, imageName) => {

    const image = uri

    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob


    let uploadBlob = null
    let reference = 'gs://surfcode-d9b4d.appspot.com/' + this.state.userTel + '/' + imageName
    console.log("rrrrr", reference)
    const imageRef = firebase.storage().ref(reference)
    let mime = 'image/jpg'
    fs.readFile(image, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        // URL of the image uploaded on Firebase storage
        console.log(url);

      })
      .catch((error) => {
        console.log(error);

      })

  }
  setUserImage() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        //const source = { uri: response.uri };

        // You can also display the image using data:
        const source = { uri: 'data:image/jpeg;base64,' + response.data };

        // const fs = RNFetchBlob.fs;
        firebase.storage().ref(this.state.firebaseID).child('profile.jpg').put(response.uri, { contentType: 'image/jpg' });
        // .then(successCb)
        // .catch(failureCb);
        //this.uploadImage(response.uri,'profile.jpg');
        //console.log('Response = ', source);
        this.setState({
          userImage: response.uri
        });

      }
    });
  }

  render() {
    return (
      <View colors={["#00C6FB", "#005BEA"]} style={styles.container}>
        {/*modal부분 start*/}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            //alert('Modal has been closed.');
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <View>
            <ActionBar
              containerStyle={styles.bar}
              allowFontScaling={true}
              title={"내 정보(" + this.state.userName + ")"}
              backgroundColor={"#f9f9fa"}
              titleStyle={modalStyles.titleStyle}
              titleContainerStyle={modalStyles.titleContainerStyle}
              iconImageStyle={modalStyles.iconImageStyle}
              leftIconName={"back"}
              onLeftPress={() => this.setModalVisible(!this.state.modalVisible)}
              leftIconContainerStyle={modalStyles.leftIconContainerStyle}
            />
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 40
            }}>
              <TouchableHighlight
                onPress={() => {
                  console.log("dsfsdf");
                  this.setUserImage();
                }}>
                <Image source={{ uri: this.state.userImage }} style={{
                  width: 200,
                  height: 200,
                  borderWidth: 1,
                  borderColor: '#82889c',
                  borderRadius: 100,
                }} />
              </TouchableHighlight>
            </View>
            <View style={[modalStyles.info, { marginTop: 20 }]}>
              <Image
                style={{ height: 32, width: 32, marginRight: 10 }}
                source={require('../images/id.png')}
              />
              <Text
                style={modalStyles.titleStyle}>
                {this.state.userName}
              </Text>
            </View>
            <View style={[modalStyles.info, { marginTop: 15 }]}>
              <Image
                style={{ height: 32, width: 32, marginRight: 10 }}
                source={require('../images/tel.png')}
              />
              <Text
                style={modalStyles.titleStyle}>
                {this.state.userTel}
              </Text>
            </View>
            <View style={[modalStyles.info, { marginTop: 15 }]}>
              <Image
                style={{ height: 32, width: 32, marginRight: 10 }}
                source={require('../images/email.png')}
              />
              <Text
                style={modalStyles.titleStyle}>
                {this.state.userId}
              </Text>
            </View>
          </View>
        </Modal>
        {/*modal부분 end*/}

        {/*title부분 start*/}
        <View style={titleStyles.container}>
          <View
            style={{ flex: 0.6, flexDirection: "row", alignItems: "center" }}
          >
            <Text style={[titleStyles.titleStyle, { flex: 0.8 }]}>
              수강생 상태
            </Text>
            <TouchableHighlight
              underlayColor="#ffffff"
              style={titleStyles.titleRightStyle}
              onPress={() => {
                // alert(this.refs.userName);
                // this.state.userName = this.refs.userName.props.children;
                this.setModalVisible(true);
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}>
                  <Image source={{ uri: this.state.userImage }} style={{
                    width: 24,
                    height: 24,
                    borderWidth: 1,
                    borderColor: '#82889c',
                    borderRadius: 100,
                  }} />
                </View>
                <Text style={titleStyles.titleUserText} ref="userName">
                  {(this.state.userName)}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View
            style={{ flex: 0.4, flexDirection: "row", alignItems: "center" }}
          >
            <View style={{ flex: 0.6, flexDirection: "row" }}>
              <Text style={titleStyles.subTitleStyle}> 수강생 목록</Text>
              <View
                style={{
                  marginLeft: 8,
                  marginBottom: 5,
                  paddingTop: 1,
                  paddingBottom: 1,
                  paddingLeft: 7,
                  paddingRight: 7,
                  backgroundColor: "#d0d2da",
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "#fff"
                }}
              >
                <Text style={{ color: "#3b3e4c", fontSize: 12 }}>
                  {flatListData.length}
                </Text>
              </View>
            </View>
            {this.state.isListLongPressed ? (
              /*delete부분 start*/
              <View style={titleStyles.titleRightStyle}>
                <TouchableHighlight
                  style={[titleStyles.titleRightStyle, { flex: 0.4, justifyContent: 'center' }]}
                  onPress={() => {
                    this.deleteCancel();
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image style={{ marginRight: 5, marginTop: 4, width: 12, height: 12, tintColor: "#000000", resizeMode: 'contain' }} source={require('../images/crossmdpi.png')} />
                    <Text style={[titleStyles.titleDeleteStyle, { color: '#000000' }]}>취소</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[titleStyles.titleRightStyle, { flex: 0.4, justifyContent: 'center' }]}
                  onPress={() => {
                    this.removeStudentData();
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image style={{ marginRight: 5, marginTop: 4, width: 12, height: 12, tintColor: "#f33c17", resizeMode: 'contain' }} source={require('../images/trashmdpi.png')} />
                    <Text style={[titleStyles.titleDeleteStyle, { color: '#f33c17' }]}>삭제</Text>
                  </View>
                </TouchableHighlight>
              </View>
            ) : (
                /*delete부분 end*/

                <View style={[titleStyles.titleRightStyle, { flex: 0.4, paddingRight: 15 }]}>
                  <Icon name="heart" color={"#ff0000"} size={12} />
                  <Icon name="heart" color={"#ff0000"} size={12} />
                </View>
              )}
          </View>
        </View>
        {/*title부분 end*/}

        {/*list부분 start*/}
        <Student_BasicFlatList
          ref={component => this._flatList = component}
          isFirstTabPage={this.state.isFirstTabPage}
          changeListLongPressedState={this.changeListLongPressedState}
          isListLongPressed={this.state.isListLongPressed}
          changeListCheckBoxSelectState={this.changeListCheckBoxSelectState}
        />
        {/*list부분 end*/}
        <AddButton right="48%" bottom={1} />
      </View>
    );
  }
}

const titleStyles = StyleSheet.create({
  container: {
    height: 107,
    flexDirection: "column",
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#f9f9fa"
  },
  titleStyle: {
    fontSize: 21,
    color: "#3b3e4c",
    fontFamily: "SpoqaHanSans-Bold"
  },
  titleRightStyle: {
    flexDirection: "row",
    flex: 0.4,
    justifyContent: "flex-end"
  },
  subTitleStyle: {
    fontSize: 14,
    color: "#3b3e4c"
  },
  titleUserText: {
    fontSize: 14,
    color: "#82889c",
    paddingLeft: 5
  },
  titleDeleteStyle: {
    fontSize: 14,
    color: "#f33c17"
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
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bar: {
    height: 55,
    alignItems: "center"
  }
});
