import React, { Component } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableHighlight,
    TouchableOpacity
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

import { LocaleConfig } from "react-native-calendars";

import Picker from 'react-native-picker';
import moment from 'moment'

// LocaleConfig.locales['kr'] = {
//   monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
//   monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
//   dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
//   dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.']
// };

// LocaleConfig.defaultLocale = 'kr';


export default class SecondScreen extends Component {

    onDayPress(day) {
        console.log("!!" + day.dateString + " " + this.state.selected);
        if (this.state.selected == undefined || this.state.selected == null) {
            //console.log(this.state.selected + " : " + day.dateString + "!!!!!!!");
            this.setState({
                selected: day.dateString
            });
        }
        else if (day.dateString == this.state.selected) {
            //console.log(day.dateString + "!!!!!!!");
            this.setState({
                selected: undefined
            });
        }
        else {
            //console.log(this.state.selected + " : " + day.dateString + "!!!!!!!");
            this.setState({
                selected: day.dateString
            });
        }
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
        console.log("ttttttttt " + dateObj.getFullYear() + " " + value);
        this.state = {
            maxdate: moment(dateObj).format('YYYY-MM-DD'),
            pickedDate: moment(dateObj).format('YYYY-MM-DD'),
            selectedYear: dateObj.getFullYear(),
            selectedMonth: dateObj.getMonth(),
            displayDate: dateObj.getFullYear() + "년 " + value + "월"
        };
        this.onDayPress = this.onDayPress.bind(this);
    }
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
                console.log("gggg",this.state);
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Picker.show();
    }
    render() {

        return (
            <View style={styles.container}>
                {/*title부분 start*/}
                <View style={titleStyles.container}>
                    <View
                        style={{ flex: 0.6, flexDirection: "row", alignItems: "center" }}
                    >
                        <Text style={[titleStyles.titleStyle, { flex: 0.8 }]}>사용 기록</Text>
                        <TouchableHighlight underlayColor="#ffffff" style={titleStyles.titleRightStyle} onPress={() => {
                            this.setModalVisible(true);
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="heart" color={"#ff0000"} size={24} />
                                <Text style={titleStyles.titleUserText} ref='userName'>{this.state.userName = '최용석'}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View
                        style={{ flex: 0.4, flexDirection: "row", alignItems: "center" }}
                    >
                        {/*Month Picker 부분 start*/}
                        <TouchableOpacity onPress={this._showDatePicker.bind(this)}>
                            <Text>{this.state.displayDate}</Text>
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
                        onDayLongPress={(day) => { console.log('selected day', day) }}
                        markedDates={{
                            [this.state.selected]: {
                                selected: true,
                                //disableTouchEvent: true,                            
                                color: '#2f52c4'
                            }
                        }}
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
                                pickedDate:months.year + "-" + value + "-01",
                                selectedYear: months.year,
                                selectedMonth: months.month,
                                displayDate: months.year + "년 " + value + "월"
                            });
                            console.log("fff", this.state);
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
            </View>
        );
    }
}
const titleStyles = StyleSheet.create({
    container: {
        height: 107, flexDirection: "column", paddingLeft: 16, paddingRight: 16, backgroundColor: '#f9f9fa'
    },
    titleStyle: {
        fontSize: 21,
        color: "#3b3e4c",
        fontFamily: 'SpoqaHanSans-Bold'
    },
    titleRightStyle: {
        flexDirection: "row",
        flex: 0.2,
        justifyContent: "center"
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
        color: '#f33c17'
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
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
});
