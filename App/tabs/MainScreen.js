import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
  AsyncStorage,
  Image
} from "react-native";
import MainTabNavigator from "../navigators/MainTabNavigator";
import ActionBar from "react-native-action-bar";

import firebase from "react-native-firebase";
import ImagePicker from "react-native-image-picker";


function setTitleName(title) {
  this.state.titleName = title;
  console.log("!!!! " + this.state.titleName, title);
  this.forceUpdate();
}
export { setTitleName }
export default class MainScreen extends Component {
  state = {
    modalVisible: false,

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
    titleName: "수강생 상태"
  };

  constructor(props) {
    super(props);
    this._retrieveData();
    setTitleName = setTitleName.bind(this)
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
      firebase.storage().ref(this.state.firebaseID + '/profile.jpg').getDownloadURL()
        .then((url) => {
          this.setState({ userImage: url });
        }).catch((error) => {
          /* There is no match ref */
          if (error.code === 'storage/object-not-found')
            this.setState({ userImage: '../images/personxhdpi.png' })
        })
    });
  }

  setUserImage() {
    ImagePicker.showImagePicker(response => {
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
          .ref(this.state.firebaseID)
          .child("profile.jpg")
          .put(response.uri, { contentType: "image/jpg" });
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

  render() {
    return (
      <View style={styles.container}>
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 40
              }}
            >
              <TouchableHighlight
                onPress={() => {
                  console.log("dsfsdf");
                  this.setUserImage();
                }}
              >
                <Image
                  source={{ uri: this.state.userImage }}
                  style={{
                    width: 200,
                    height: 200,
                    borderWidth: 1,
                    borderColor: "#82889c",
                    borderRadius: 100
                  }}
                />
              </TouchableHighlight>
            </View>
            <View style={{justifyContent: 'center',alignSelf:'center'}}>
              <View style={[modalStyles.info, { marginTop: 20 }]}>
                <Image
                  style={{ height: 32, width: 32, marginRight: 10 }}
                  source={require("../images/id.png")}
                />
                <Text style={modalStyles.titleStyle}>{this.state.userNickName}</Text>
              </View>
              <View style={[modalStyles.info, { marginTop: 15 }]}>
                <Image
                  style={{ height: 32, width: 32, marginRight: 10 }}
                  source={require("../images/tel.png")}
                />
                <Text style={modalStyles.titleStyle}>{this.state.userTel}</Text>
              </View>
              <View style={[modalStyles.info, { marginTop: 15 }]}>
                <Image
                  style={{ height: 32, width: 32, marginRight: 10 }}
                  source={require("../images/email.png")}
                />
                <Text style={modalStyles.titleStyle}>{this.state.userId}</Text>
              </View>
            </View>
          </View>
        </Modal>
        {/*modal부분 end*/}

        {/*title부분 start*/}
        <View style={titleStyles.container}>

          <Text style={[titleStyles.titleStyle, { flex: 0.8 }]}>
            {this.state.titleName}
          </Text>
          <TouchableHighlight
            underlayColor="#ffffff"
            style={titleStyles.titleRightStyle}
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <Image
                  source={{ uri: this.state.userImage }}
                  style={{
                    width: 24,
                    height: 24,
                    borderWidth: 1,
                    borderColor: "#82889c",
                    borderRadius: 100
                  }}
                />
              </View>
              <Text style={titleStyles.titleUserText} ref="userName">
                {this.state.userName}
              </Text>
            </View>
          </TouchableHighlight>

        </View>
        {/*title부분 end*/}

        <MainTabNavigator />
      </View>
    );
  }
}

const titleStyles = StyleSheet.create({
  container: {
    height: 54,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#f9f9fa",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center'
  },
  titleStyle: {
    fontSize: 21,
    color: "#3b3e4c",
    fontFamily: 'Spoqa Han Sans Bold'
  },
  titleRightStyle: {
    flexDirection: "row",
    flex: 0.4,
    justifyContent: "flex-end"
  },
  titleUserText: {
    fontSize: 14,
    color: "#82889c",
    paddingLeft: 5,
    fontFamily: 'Spoqa Han Sans Bold'
  },
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
    //alignItems: 'center', // 가운데 맞춤
    //justifyContent: 'center', // 위 아래로 중앙정렬
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

