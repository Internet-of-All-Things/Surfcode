import React, { Component } from "react";
import {
  Platform,
  TouchableHighlight,
  StyleSheet,
  Modal,
  Text,
  View,
  Dimensions
} from "react-native";
import ActionBar from 'react-native-action-bar';
import {AddButton} from '../components/AddButton'
//import BoxLayout from "../BoxLayout";
import Student_BasicFlatList from "../components/Student_BasicFlatList";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import flatListData from '../data/flatListData'
import { CheckBox } from "react-native-elements";

var screen = Dimensions.get('window');
let listData = [];
export default class FirstScreen extends Component {
  state = {
    modalVisible: false,
    userName: 'Tom',
    isListLongPressed: false
  };

  constructor(props) {
    super(props);
  }
  changePage = () =>{
    //this.props.navigation.navigate('Adding');    
    console.log("~~~~~~~~~~~~~~~~~~~~!!");
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  changeListLongPressedState = () => {
    this.setState({
      isListLongPressed: !this.state.isListLongPressed
    });
    if (this.state.isListLongPressed) {
      listData = [];
    }
    console.log("isLong!! : " + this.state.isListLongPressed);
  }
  changeListCheckBoxSelectState = (index, checked) => {
    console.log("changeListCheckBoxSelectState : " + index + " " + checked);
    if (checked) {
      listData.push(index);
    }
    else {
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
  }
  removeStudentData = () => {
    for (let i = 0; i < flatListData.length; i++) {
      console.log("before flatListData[" + i + "] " + JSON.stringify(flatListData[i]));

    }
    for (let i = 0; i < listData.length; i++) {
      flatListData.splice(listData[i] - i, 1);
      console.log("deleted[" + listData[i] + "] " + JSON.stringify(flatListData[i]));
    }
    for (let i = 0; i < flatListData.length; i++) {
      console.log("after latListData[" + i + "] " + JSON.stringify(flatListData[i]));

    }
    this.setState({
      isListLongPressed: !this.state.isListLongPressed
    });
    console.log(this.state.isListLongPressed + "!!!!");
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
          }}>
          <View>
            <ActionBar
              containerStyle={styles.bar}
              allowFontScaling={true}
              title={"내 정보(" + this.state.userName + ")"}
              backgroundColor={'#f9f9fa'}
              titleStyle={styles.titleStyle}
              titleContainerStyle={styles.titleContainerStyle}
              iconImageStyle={styles.iconImageStyle}
              leftIconName={'back'}
              onLeftPress={() => this.setModalVisible(!this.state.modalVisible)}
              leftIconContainerStyle={styles.leftIconContainerStyle}
            />
            <View>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>{this.state.userName} Page</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        {/*modal부분 end*/}

        {/*title부분 start*/}
        <View style={{ height: 107, flexDirection: "column", paddingLeft: 16, paddingRight: 16, backgroundColor: '#f9f9fa' }}>
          <View
            style={{ flex: 0.6, flexDirection: "row", alignItems: "center" }}
          >
            <Text style={[styles.titleStyle, { flex: 0.8 }]}>
              수강생 상태
              </Text>
            <TouchableHighlight underlayColor="#ffffff" style={[styles.titleRightStyle, { flex: 0.2 }]} onPress={() => {
              // alert(this.refs.userName);
              // this.state.userName = this.refs.userName.props.children;
              this.setModalVisible(true);
            }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="heart" color={"#ff0000"} size={24} />
                <Text style={styles.userText} ref='userName'>{this.state.userName = '최용석'}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View
            style={{ flex: 0.4, flexDirection: "row", alignItems: "center" }}
          >
            <View style={{ flex: 0.8, flexDirection: 'row' }}>
              <Text style={styles.subTitleStyle}> 수강생 목록</Text>
              <View style={{
                marginLeft: 8,
                marginBottom: 5,
                paddingTop: 1,
                paddingBottom: 1,
                paddingLeft: 7,
                paddingRight: 7,
                backgroundColor: '#d0d2da',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#fff'
              }}>
                <Text style={{ color: '#3b3e4c', fontSize: 12 }}>{flatListData.length}</Text>
              </View>
            </View>
            {this.state.isListLongPressed ? (
              /*delete부분 start*/
              <TouchableHighlight style={[styles.titleRightStyle, { flex: 0.2 }]} onPress={() => {
                this.removeStudentData();
              }}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="heart" color={"#ff0000"} size={12} />
                  <Text style={styles.deleteStyle}>삭제</Text>
                </View>
              </TouchableHighlight>
              /*delete부분 end*/

            ) : (
                <View style={[styles.titleRightStyle, { flex: 0.2 }]}>
                  <Icon name="heart" color={"#ff0000"} size={12} />
                  <Icon name="heart" color={"#ff0000"} size={12} />
                </View>

              )}
          </View>
        </View>
        {/*title부분 end*/}
        {/* <View style={{
          position: 'absolute',
          backgroundColor: '',
          zIndex: 100,
          alignItems: 'center',
          right: "40%", bottom: 50, height: 30, width: 30

        }}></View> */}

          
          {/*list부분 start*/}
          <Student_BasicFlatList changeListLongPressedState={this.changeListLongPressedState} isListLongPressed={this.state.isListLongPressed} changeListCheckBoxSelectState={this.changeListCheckBoxSelectState} />
          {/*list부분 end*/}
          <AddButton right="48%" bottom={1}/>
          {/* <TouchableHighlight
            // onPress={() => {
            //     this.setModalVisible(true);
            // }}
            onPress={this.changePage}
            underlayColor="#2f52c4"
            style={{
              position: 'absolute',
              backgroundColor: '',
              zIndex: 100,
              alignItems: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              width: 65,
              height: 65,
              borderRadius: 100,
              right: 180, 
              bottom: -35,
              backgroundColor: '#2f52c4'
            }}>
            <FontAwesomeIcon name="plus" size={24} color="#F8F8F8" />
          </TouchableHighlight> */}

        </View>
        );
      }
    }
const styles = StyleSheet.create({
      container: {
        flex: 1
      },
      userText: {
        fontSize: 14,
        color: "#82889c",
        marginLeft: 5
      },
  titleStyle: {
          fontSize: 21,
        color: "#3b3e4c",
        fontFamily: 'SpoqaHanSans-Bold'
      },
  titleRightStyle: {
          flexDirection: "row",
        flex: 0.5,
        justifyContent: "center"
      },
  bar: {
          height: 55,
        alignItems: 'center'
      },
  deleteStyle: {
          fontSize: 14,
        color: '#f33c17'
      },
  subTitleStyle: {
          fontSize: 14,
        color: "#3b3e4c"
      },
  titleContainerStyle: {
          alignItems: 'center',
        paddingRight: 40
      },
  titleStyle: {
          fontSize: 16,
        color: '#3b3e4c'
      },
  iconImageStyle: {
          width: 14.5,
        height: 30,
        tintColor: '#82889c'
      }
    });
