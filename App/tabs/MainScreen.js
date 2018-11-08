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
import screenTitleData from '../data/screenTitleData'

export default class MainScreen extends Component {
  // static navigationOptions = {
  //     header: null
  // }
  state = {
    modalVisible: false,
    userName: "Tom",
    userId: "",
    userImage: "../images/personxhdpi.png",
    titleName: screenTitleData[0]
    };
  componentWillReceiveProps(props) {
    console.log("component Will Receive Props1", JSON.stringify(props),props);   
}
  _retrieveData = async () => {
    try {
      var value = await AsyncStorage.getItem("Auth");
      console.log("~~~~~~~~~~~~~~~~~" + value);
      value = "cys_star@naver.com";
      if (value !== null) {
        this.state.userId = value;
        this.readUserData();
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  readUserData() {
    let dbUrl =
      "member/teacher/" +
      this.state.userId
        .replace(".", "")
        .replace("#", "")
        .replace("$", "")
        .replace("@", "")
        .replace("!", "")
        .replace("%", "")
        .replace("^", "")
        .replace("&", "")
        .replace("*", "")
        .replace("(", "")
        .replace(")", "")
        .replace("-", "")
        .replace("/", "")
        .replace("\\", "")
        .replace("[", "")
        .replace("]", "")
        .replace("{", "")
        .replace("}", "")
        .replace("`", "")
        .replace("~", "")
        .replace("?", "")
        .replace(",", "")
        .replace("<", "")
        .replace(">", "") +
      "/phone";
    firebase
      .database()
      .ref(dbUrl)
      .on("value", snapshot => {
        console.log(snapshot.val() + "@@@");
        this.state.userTel = snapshot.val();
        const ref = firebase.storage().ref(this.state.userTel + "/profile.jpg");
        ref.getDownloadURL().then(url => {
          this.setState({ userImage: url });
        });
      });
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
          .ref(this.state.userTel)
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
  setTitleName = (title) => {
    console.log(title + "~~~~~~~~~~~~~~~~~");
    this.setState({ titleName: title });
  }

  constructor(props) {
    super(props);
    this._retrieveData();
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
            <View style={[modalStyles.info, { marginTop: 20 }]}>
              <Image
                style={{ height: 32, width: 32, marginRight: 10 }}
                source={require("../images/id.png")}
              />
              <Text style={modalStyles.titleStyle}>{this.state.userId}</Text>
            </View>
            <View style={[modalStyles.info, { marginTop: 15 }]}>
              <Image
                style={{ height: 32, width: 32, marginRight: 10 }}
                source={require("../images/tel.png")}
              />
              <Text style={modalStyles.titleStyle}>{this.state.userId}</Text>
            </View>
            <View style={[modalStyles.info, { marginTop: 15 }]}>
              <Image
                style={{ height: 32, width: 32, marginRight: 10 }}
                source={require("../images/email.png")}
              />
              <Text style={modalStyles.titleStyle}>{this.state.userId}</Text>
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
                {(this.state.userName = "최용석")}
              </Text>
            </View>
          </TouchableHighlight>

        </View>
        {/*title부분 end*/}

        <MainTabNavigator screenProps={this.setTitleName} />
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
    fontFamily: "SpoqaHanSans-Bold"
  },
  titleRightStyle: {
    flexDirection: "row",
    flex: 0.4,
    justifyContent: "flex-end"
  },
  titleUserText: {
    fontSize: 14,
    color: "#82889c",
    paddingLeft: 5
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

