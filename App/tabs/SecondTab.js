import React, { Component } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    ScrollView,
    View,
    Modal,
    Image,    
    TouchableHighlight,
    TouchableOpacity
} from "react-native";

import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import ActionBar from "react-native-action-bar";
import { LocaleConfig } from "react-native-calendars";
import firebase from "react-native-firebase";

import Picker from 'react-native-picker';
import moment from 'moment'
import userInfo from '../data/userInfo'

import Student_LogFlatList from '../components/Student_LogFlatList'


var data = {};
export default class SecondScreen extends Component {

    onDayPress(day) {        
        if (typeof (data[day.dateString]) !== 'undefined' && data[day.dateString].marked == true) {
            var tt = Object.keys(this.state.userLogData);
            for (var i = 0; i < tt.length; i++) {
                var keys = Object.keys(this.state.userLogData[tt[i]]);//[ 'LQxPLYA2apaj2dYvlrp','LQxPLYA2apaj2dYvlrp' ]
                //this.state.userLogDataArray = [];
                var logArray = []
                var loadingCount = 0;
                for (var j = 0; j < keys.length; j++) {
                    firebase.database().ref('data/' + userInfo.firebaseID).orderByChild('user/tel/').equalTo(this.state.userLogData[tt[i]][keys[j]].tel).once('value', (snapshot) => {
                        //console.log("@@@@@",snapshot)
                        snapshot.forEach((dataSnapShot) => {
                            let dd = dataSnapShot.val();
                            /* User Image Info */
                            const ordered = {};
                            Object.keys(dd['data'][day.dateString]).sort().forEach(function(key) {
                                ordered[key] = dd['data'][day.dateString][key];
                            });

                            
                            let ddkeys = Object.keys(ordered);
                            var orderedData = {}
                            if(ddkeys.length > 10){
                                for(var i= ddkeys.length-10; i<ddkeys.length; i++)
                                    orderedData[ddkeys[i]] = ordered[ddkeys[i]]                                    
                            }
                            else
                                orderedData = ordered
                                
                            
                            logArray.push({
                                key: "[" + loadingCount + "]",
                                name: dd['user']['name'],
                                date: day.dateString,
                                tel: dd['user']['tel'],
                                email: dd['user']['email'],
                                data: orderedData
                            });
                            this.setState({
                                userLogDataArray: logArray
                            })

                            loadingCount++;
                        })
                    })
                }

            }
            this.setModalVisible(!this.state.modalVisible);
        }
        this.forceUpdate();
    }

    readUserLogData = async (value) => {
        let url = 'member/teacher/' + userInfo.firebaseID + '/students';
       // console.log("!!!!!!", url)
        firebase.database().ref(url).once('value', (snapshot) => {

            this.state.userLogData = snapshot.val();
            if (typeof (this.state.userLogData) !== 'undefined') {
                var tt = Object.keys(this.state.userLogData);//[ '2018-11-10' ]

                for (var i = 0; i < tt.length; i++) {
                    data[tt[i]] = {
                        marked: true,
                        selected: true, selectedColor: '#2f52c4'
                    };

                    //console.log(this.state.userLogData[tt[i]])
                    

                };

                this.setState({
                    markedDates: data
                });
            }
        });
    }

    constructor(props) {
        super(props);
        let dateObj = new Date();
        var month = dateObj.getMonth() + 1;
        var value;
        if (month < 10) {
            value = "0" + month;
        }
        else {
            value = month;
        }

        this.state = {
            maxdate: moment(dateObj).format('YYYY-MM-DD'),
            pickedDate: moment(dateObj).format('YYYY-MM-DD'),
            selectedYear: dateObj.getFullYear(),
            selectedMonth: dateObj.getMonth(),
            displayDate: dateObj.getFullYear() + "년 " + value + "월",
            modalVisible: false,
            userLogData: {},
            userLogDataArray: [],
            loadedMarkedData: {},
            markedDates: {},
            loadingCount: 0
        };
        this.onDayPress = this.onDayPress.bind(this);
        this.readUserLogData();
    }

    // componentDidMount() {
    //     //this.props.screenProps.setTitle("사용 기록");
    // }

    _showDatePicker() {
        let date = new Date();
        let year = date.getFullYear();
        let years = new Array(2).fill().map((item, id) => {
            return year - id;
        });
        let months = [
            'Jan',
            'Feb',
            'Mar',
            'Spr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'];
        Picker.init({
            pickerData: [years, months],
            pickerFontColor: [255, 0, 0, 1],
            selectedValue: [this.state.selectedYear, months[this.state.selectedMonth - 1]],
            pickerTitleText: 'Select year and month',
            onPickerConfirm: (pickedValue, pickedIndex) => {
                var month = (parseInt(pickedIndex[1]) + 1);
                var value;
                if (month < 10)
                    value = "0" + month;
                else
                    value = month;
                this.setState({
                    pickedDate: pickedValue[0] + "-" + value + "-01",
                    selectedYear: parseInt(pickedValue[0]),
                    selectedMonth: parseInt(value),
                    displayDate: pickedValue[0] + "년 " + value + "월"
                });
                //console.log("gggg", this.state);
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Picker.show();
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {

        return (
            <View style={styles.container}>
                {/* <NavigationEvents
                    onWillFocus={payload => this.setUserTitle()}
                    onDidFocus={payload => console.log('did focus', payload)}
                    onWillBlur={payload => console.log('will blur', payload)}
                    onDidBlur={payload => console.log('did blur', payload)}
                /> */}

                {/*modal부분 start*/}
                <Modal
                    animationType="slide"
                    transparent={false}
                    style={{ flex: 1 }}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <ActionBar
                            containerStyle={styles.bar}
                            allowFontScaling={true}
                            title={"수강생 기록 조회"}
                            backgroundColor={"#f9f9fa"}
                            titleStyle={modalStyles.titleStyle}
                            titleContainerStyle={modalStyles.titleContainerStyle}
                            iconImageStyle={modalStyles.iconImageStyle}
                            leftIconName={"back"}
                            onLeftPress={() => this.setModalVisible(!this.state.modalVisible)}
                            leftIconContainerStyle={modalStyles.leftIconContainerStyle}
                        />
                        <Student_LogFlatList userLogData={this.state.userLogDataArray} />
                    </View>
                </Modal>
                {/*modal부분 end*/}


                {/*title부분 start*/}
                <View style={titleStyles.container}>
                    <View
                        style={{ flex: 0.4, flexDirection: "row", alignItems: "center" }}
                    >
                        {/*Month Picker 부분 start*/}
                        <TouchableOpacity style={{ flexDirection: "row" }} onPress={this._showDatePicker.bind(this)}>
                            <View style={{ flexDirection: "row" }}>
                                <Image style={{ marginRight: 5, marginTop: 7, width: 16, height: 16, tintColor: "#82889c", resizeMode: 'contain' }} source={require('../images/clock.png')} />
                                <Text style={{ color: '#82889c', fontSize: 14, fontFamily: "Spoqa Han Sans Bold" }}>{this.state.displayDate}</Text>
                                <Image style={{ marginLeft: 8, marginTop: 9, width: 10, height: 10, tintColor: "#82889c", resizeMode: 'contain' }} source={require('../images/down-triangular.png')} />
                            </View>
                        </TouchableOpacity>
                        {/*Month Picker 부분 end*/}
                    </View>
                </View>
                {/*title부분 end*/}

                {/*Callendar부분 start*/}
                <ScrollView style={styles.container}>
                    <Calendar
                        style={styles.calendarStyle}
                        current={this.state.pickedDate}
                        maxDate={this.state.maxdate}
                        onDayPress={this.onDayPress}
                        markedDates={this.state.markedDates}
                        //onDayLongPress={(day) => { console.log('selected day', day) }}
                        // markedDates={{
                        //     [this.state.selected]: {
                        //         selected: true,
                        //         //disableTouchEvent: true,                            
                        //         color: '#2f52c4'
                        //     },
                        //     [this.state.markedDates]:{
                        //         marked:true,
                        //     }
                        // }}
                        monthFormat={'yyyy년 MM월'}
                        onMonthChange={(months) => {
                            var month = months.month;
                            var value;
                            if (month < 10) {
                                value = "0" + month;
                            }
                            else {
                                value = month;
                            }
                            this.setState({
                                pickedDate: months.year + "-" + value + "-01",
                                selectedYear: months.year,
                                selectedMonth: months.month,
                                displayDate: months.year + "년 " + value + "월"
                            });
                        }}
                        onPressArrowLeft={substractMonth => substractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        theme={{
                            backgroundColor: '#f9f9fa',
                            calendarBackground: '#f9f9fa',
                            selectedDayBackgroundColor: '#2f52c4',
                        }}
                    />
                </ScrollView>
                {/*Callendar부분 end*/}
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
});


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
        fontFamily: 'SpoqaHanSans-Bold'
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9fa",
    },
    calendarStyle: {
        borderWidth: 1,
        borderColor: "gray",
        height: 350,
        flex: 1,
        backgroundColor: "#f9f9fa",
        borderWidth: 0
    },
    bar: {
        height: 55,
        alignItems: "center"
    }
});
