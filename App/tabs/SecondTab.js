import React, { Component } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableHighlight
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

import { LocaleConfig } from "react-native-calendars";

// LocaleConfig.locales['kr'] = {
//   monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
//   monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
//   dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
//   dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.']
// };

// LocaleConfig.defaultLocale = 'kr';

const programmingLanguages = [
    {
      label: '1월',
      value: '1월',
    },
    {
      label: '2월',
      value: '2월',
    },
    {
      label: '3월',
      value: '3월',
    },
    {
      label: '4월',
      value: '4월',
    },
    {
      label: '5월',
      value: '5월',
    },
    {
      label: '6월',
      value: '6월',
    },
    {
      label: '7월',
      value: '7월',
    },
    {
      label: '8월',
      value: '8월',
    },
    {
      label: '9월',
      value: '9월',
    },
    {
      label: '10월',
      value: '10월',
    },
    {
      label: '11월',
      value: '11월',
    },
    {
      label: '12월',
      value: '12월',
    }
  ];
  

export default class SecondScreen extends Component {
    onDayPress(day) {
        if (day.dateString == this.state.selected) {
            this.setState({
                selected: null
            });
        }
        else {
            this.setState({
                selected: day.dateString
            });
        }
    }
    constructor(props) {
        super(props);
        this.state = {};
        this.onDayPress = this.onDayPress.bind(this);
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
                 
                </View>
                {/*title부분 end*/}

                {/*Callendar부분 start*/}
                <ScrollView style={styles.container}>
                    <CalendarList
                        style={styles.calendarStyle}
                        maxDate={new Date()}
                        onDayPress={this.onDayPress}
                        onDayLongPress={(day) => { console.log('selected day', day) }}
                        markedDates={{
                            [this.state.selected]: {
                                selected: true,
                                //disableTouchEvent: true,                            
                                color: '#2f52c4'
                            }
                        }}
                        //monthFormat={'yyyy년 MM월'}
                        onMonthChange={(month) => { console.log('month changed', month) }}
                        onPressArrowLeft={substractMonth => substractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        theme={{
                            backgroundColor: '#f9f9fa',
                            calendarBackground: '#f9f9fa',
                            selectedDayBackgroundColor: '#2f52c4',
                        }}

                        horizontal
                        pagingEnabled
                        hideArrows={false}
                    />
                    <Text style={styles.text}>Calendar with marked dates and hidden arrows</Text>
                    <Calendar
                        style={styles.calendar}
                        current={'2012-05-16'}
                        minDate={'2012-05-10'}
                        maxDate={'2012-05-29'}
                        firstDay={1}
                        markedDates={{
                            '2012-05-23': { selected: true, marked: true },
                            '2012-05-24': { selected: true, marked: true, dotColor: 'green' },
                            '2012-05-25': { marked: true, dotColor: 'red' },
                            '2012-05-26': { marked: true },
                            '2012-05-27': { disabled: true, activeOpacity: 0 }
                        }}
                        // disabledByDefault={true}
                        hideArrows={true}
                    />
                    <CalendarList
                        current={'2012-05-16'}
                        pastScrollRange={24}
                        futureScrollRange={24}
                        horizontal
                        pagingEnabled
                        hideArrows={false}
                        style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}
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
        borderWidth : 0        
    },
});
