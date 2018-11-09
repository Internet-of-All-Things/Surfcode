import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { NavigationEvents } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Weather_BasicFlatList from '../components/Weather_BasicFlatList'
import Wave_BasicFlatList from '../components/Wave_BasicFlatList'

import { getLocation, getData } from 'react-native-weather-api';

getLocation();
let cityName = "";
let temperature = "";
let windSpeed = "";
setTimeout(function () {
    let data = new getData()
    cityName = data.city;
    temperature = data.tempC;
    windSpeed = data.windKph;
    //console.log(cityName + " " + temperature + "~~")

}, 2000)
export default class ThirdTab extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        currentLocation: '부산 송정',
        gradientTitle: '10시, 조금 쌀살해요',
        currentTemperature: '15°C',
    }
    constructor(props) {
        super(props)
        //let dateObj = new Date();
        //this.state.gradientTitle = dateObj.getHours + ", "

    }


    isFocused() {
        this.setState({
            currentLocation: cityName,
            currentTemperature: temperature + "°C"
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents
                    onWillFocus={payload => this.isFocused()}
                />
                {/*title부분 start*/}
                <View style={titleStyles.container}>
                    <View
                        style={{ flex: 0.4, flexDirection: "column"}}
                    >
                        {/*Location 부분 start*/}
                        <TouchableOpacity style={{ flexDirection: "row" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image style={{ marginRight: 5, marginTop: 7, width: 16, height: 16, tintColor: "#82889c", resizeMode: 'contain' }} source={require('../images/location.png')} />
                                <Text style={{ color: '#82889c', fontSize: 14, fontFamily: 'Spoqa Han Sans Bold' }}>현위치</Text>
                                <Text style={{ color: '#3b3e4c', marginLeft: 5, fontSize: 14, fontFamily: 'Spoqa Han Sans Regular' }}>{this.state.currentLocation}</Text>
                            </View>
                        </TouchableOpacity>
                        {/*Location 부분 end*/}
                    </View>
                </View>
                {/*title부분 end*/}

                {/*Gradient 부분 start*/}
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#1F34EC', '#78C2E9']} style={gradientStye.container}>
                    <View style={{ flexDirection: "column" }}>
                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: "#f9f9fa", marginTop: 30, fontFamily: 'Spoqa Han Sans Regular' }}>{this.state.gradientTitle}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ marginRight: 5, marginTop: 4, width: 32, tintColor: "#f9f9fa", resizeMode: 'contain' }} source={require('../images/clockmdpi.png')} />
                            <Text style={{ color: '#f9f9fa', marginLeft: 5, fontSize: 47, fontFamily: 'Spoqa Han Sans Bold' }}>{this.state.currentTemperature}</Text>
                        </View>
                    </View>
                </LinearGradient>
                {/*Gradient 부분 end*/}

                <Text style={{ color: '##3b3e4c', fontSize: 14, paddingLeft: 16, paddingRight: 16, paddingTop: 10, fontFamily: 'Spoqa Han Sans Bold' }}>다음 24시간</Text>
                <Weather_BasicFlatList />

                <Text style={{ color: '##3b3e4c', fontSize: 14, paddingLeft: 16, paddingRight: 16, paddingTop: 10, fontFamily: 'Spoqa Han Sans Bold' }}>파도</Text>
                <Wave_BasicFlatList />
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
        fontFamily: 'SpoqaHanSans-Bold'
    },
});

const gradientStye = StyleSheet.create({
    container: {
        height: 160,
        alignItems: "center",
        backgroundColor: "#ff00ff"
    },
});
const styles = StyleSheet.create({
    container: {
        flex: 1

    }
});
