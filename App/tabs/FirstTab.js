import React, { Component } from "react";
import {
  Platform,
  TouchableHighlight,
  StyleSheet,
  Modal,
  Text,
  Image,
  View,
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

var screen = Dimensions.get("window");
let listData = [];
export default class FirstTab extends Component {
  state = {
    modalVisible: false,
    userName: "Tom",
    isListLongPressed: false,
    isFirstTabPage : true
  };

  constructor(props) {
    super(props);
  }
  changePage = () => {
    console.log("~~~~~~~~~~~~~~~~~~~~!!");
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
    if(visible){
      this.setState({
        isFirstTabPage : false
      })
    }
    else{
      this.setState({
        isFirstTabPage : true
      })
    }
    this.setState({
      isListLongPressed : false
    })
  }
  changeListLongPressedState = () => {
    this.setState({
      isFirstTabPage : true,
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
      isFirstTabPage : true,
      isListLongPressed: !this.state.isListLongPressed
    });
    console.log(this.state.isListLongPressed + "!!!!");
  };
  deleteCancel = () => {
    this.setState({
      isFirstTabPage : true,
      isListLongPressed: !this.state.isListLongPressed
    });
    console.log(this.state.isListLongPressed + "~!!!!");
  }

  render() {
    console.log("FirstTab.js render() called!!");   
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
            <View>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>{this.state.userName} Page</Text>
              </TouchableHighlight>
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
                  <Image source={require('../images/personxhdpi.png')} style={{
                    width: 24,
                    height: 24,
                    borderWidth: 1,
                    borderColor: '#82889c',
                    borderRadius: 100,
                  }} />
                </View>
                <Text style={titleStyles.titleUserText} ref="userName">
                  {(this.state.userName = "최용석")}
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
          isFirstTabPage = {this.state.isFirstTabPage}
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
