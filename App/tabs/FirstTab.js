import React, { Component } from "react";
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  Image,
  View,
  AsyncStorage,
} from "react-native";
import { AddButton } from "../components/AddButton";
import Student_BasicFlatList from "../components/Student_BasicFlatList";
import flatListData from "../data/flatListData";
import BluetoothManager from "../utils/BluetoothManager"
import SoundPlayer from 'react-native-sound-player'
import { soundOff } from "../components/Student_BasicFlatList"
import urgentStudents from "../data/urgentStudents"

function renderForUpdateItem() {
  this.forceUpdate()
}

export { renderForUpdateItem }

export default class FirstTab extends Component {
  state = {
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
    renderForUpdateItem = renderForUpdateItem.bind(this)
  }

  componentWillUnmount() {
    this.setState({ unmount: true })
  }

  changeListLongPressedState = () => {
    this.setState({
      isFirstTabPage: true,
      isListLongPressed: !this.state.isListLongPressed
    });
  };

  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch (exception) {
      return false;
    }
  }

  removeStudentData = async () => {
    /* 현재 진행 중 */
    console.log(flatListData)
    for (let i = 0; i < flatListData.length; i++) {
      if (flatListData[i].selected) {
        for (let i = 0; i < urgentStudents.length; i++) {
          /* sound off */
          if (urgentStudents[i].tel == flatListData[i].tel &&
            urgentStudents[i].name == flatListData[i].name) {
            urgentStudents.splice(i, 1)
            if (urgentStudents.length == 0) {
              soundOff()
              SoundPlayer.stop()
            }
            break
          }
        }

        let temp = JSON.parse(await AsyncStorage.getItem('device'))
        for (let j = 0; j < temp.devices.length; j++) {
          if (flatListData[i].key === temp.devices[j].key) {
            AsyncStorage.removeItem(flatListData[i].key)
            temp['devices'].splice(j, 1)
            AsyncStorage.setItem('device', JSON.stringify(temp))
            break
          }
        }

        console.log(temp)
        BluetoothManager.getBluetoothManager().onDeviceDisconnected(flatListData[i].key, () => {
          console.log("사용자 선택에 의한 장치 연결 해제")
        })
        BluetoothManager.getBluetoothManager().cancelDeviceConnection(flatListData[i].key)
        flatListData.splice(i, 1)
        i = i - 1
      }
    }
    this.setState({
      isFirstTabPage: true,
      isListLongPressed: !this.state.isListLongPressed
    });
  };

  deleteCancel = () => {
    this.setState({
      isFirstTabPage: true,
      isListLongPressed: !this.state.isListLongPressed
    });
  }

  render() {
    return (
      <View colors={["#00C6FB", "#005BEA"]} style={styles.container}>
        {/*title부분 start*/}
        <View
          style={titleStyles.container}
        >
          <View style={{ flex: 0.6, flexDirection: "row" }}>
            <Text style={titleStyles.subTitleStyle}> 수강생 목록</Text>
            <View
              style={{
                marginLeft: 8,
                marginTop: 3,
                marginBottom: 3,
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
              <Text style={{ color: "#3b3e4c", fontSize: 12, fontFamily: "SpoqaHanSans-Bold" }}>
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

              null
            )}
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
    height: 54,
    flexDirection: "row",
    alignItems: "center",
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
    color: "#3b3e4c",
    fontFamily: 'Spoqa Han Sans Bold'
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


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bar: {
    height: 55,
    alignItems: "center"
  }
});
