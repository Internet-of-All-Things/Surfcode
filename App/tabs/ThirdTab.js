import React, { Component } from "react";
import { Platform, StyleSheet, Alert, Text, View, TouchableOpacity, Image } from "react-native";
import { NavigationEvents } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Weather_BasicFlatList from '../components/Weather_BasicFlatList'
import Wave_BasicFlatList from '../components/Wave_BasicFlatList'
import { weather_imageData } from '../data/weather_imageData'

const API_KEY = '4313783d92a2d34971a8339e4442f8b8';


export default class ThirdTab extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        isLoaded: false,
        currentLocation: '부산 송정',
        gradientTitle: '10시, 조금 쌀살해요',
        currentTemperature: '15',
        weatherData: [],
        gradientColor: [],
        weatherImage: weather_imageData["Clouds"].line,
        focused: false
    }
    constructor(props) {
        super(props)
        //let dateObj = new Date();
        //this.state.gradientTitle = dateObj.getHours + ", "
        let dateObj = new Date();

        var hour = dateObj.getHours();
        if (hour >= 0 && hour < 7)
            this.state.gradientColor = ['#096C8B', '#7DECBA'];
        else if (hour >= 7 && hour < 18)
            this.state.gradientColor = ['#1F34EC', '#78C2E9'];
        else if (hour >= 18 && hour < 24)
            this.state.gradientColor = ['#DC510B', '#FF7084'];

    }
    _getWeather = (lat, lon) => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`)
            .then(response => response.json())
            .then(json => {
                //console.log(json);
                let status = json.weather[0].main;
                if (json.weather[0].id >= 700 && json.weather[0].id < 800)
                    this.setState({ weatherImage: weather_imageData["Clouds"].line })
                else
                    this.setState({ weatherImage: weather_imageData[status].line })

                this.setState({
                    currentLocation: json.name,
                    currentTemperature: ((parseFloat(json.main.temp) - 273.15)).toFixed(1)
                });
                let dateObj = new Date();
                if (this.state.currentTemperature <= 20 && this.state.currentTemperature >= 10) {
                    this.setState({
                        gradientTitle: dateObj.getHours() + "시, 조금 쌀쌀해요"
                    })
                }
                else if (this.state.currentTemperature < 10) {
                    this.setState({
                        gradientTitle: dateObj.getHours() + "시, 추운 날씨에요"
                    })
                }
                if (this.state.currentTemperature > 20) {
                    this.setState({
                        gradientTitle: dateObj.getHours() + "시, 더운 날씨에요"
                    })
                }

            });
    }
    _getFutureWeather = (lat, lon) => {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${API_KEY}`)
            .then(response => response.json())
            .then(json => {

                this.setState({ weatherData: [] });//clear data
                var len = json.list.length;
                if (len >= 9)
                    len = 9;
                for (var i = 0; i < len; i++) {
                    this.state.weatherData.push({
                        key: "[" + i + "]",
                        temperature: ((parseFloat(json.list[i].main.temp) - 273.15)).toFixed(1),
                        hour: (parseInt(json.list[i].dt_txt.substring(11, 13)) + 9) % 24 + ":00",//seoul +9 UTC시간
                        id: json.list[i].weather[0].id,
                        status: json.list[i].weather[0].main,
                        wind: json.list[i].wind.speed
                    });
                }
            });
    }

    isFocused() {
        this.setState({ focused: true })
    }
    willBlur() {
        this.setState({ focused: false })
    }
    componentDidMount() {
        //navigator.geolocation.requestAuthorization();
        navigator.geolocation.getCurrentPosition(
            position => {
                this._getWeather(position.coords.latitude, position.coords.longitude)
                this._getFutureWeather(position.coords.latitude, position.coords.longitude)
                this.setState({
                    isLoaded: true,
                })
            },
            error => {
                if (this.state.focused) {
                    Alert.alert(
                        'GPS Error',
                        '내 위치를 확인 할 수 없습니다.',
                        [
                            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false }
                    )
                }
                this.setState({
                    error: error
                })
            },
            { enableHighAccuracy: false, timeout: 20000 }
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents
                    onWillFocus={payload => this.isFocused()}
                    onWillBlur={payload => this.willBlur()}
                />
                {/*title부분 start*/}
                <View style={titleStyles.container}>
                    <View
                        style={{ flex: 0.4, flexDirection: "column" }}
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
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={this.state.gradientColor} style={gradientStye.container}>
                    <View style={{ flexDirection: "column" }}>
                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: "#f9f9fa", marginTop: 30, fontFamily: 'Spoqa Han Sans Regular' }}>{this.state.gradientTitle}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ width: 32, height: 32, tintColor: "#f9f9fa", resizeMode: 'contain' }} source={this.state.weatherImage} />
                            <Text style={{ color: '#f9f9fa', marginLeft: 5, fontSize: 47, fontFamily: 'Spoqa Han Sans Bold' }}>{this.state.currentTemperature}°C</Text>
                        </View>
                    </View>
                </LinearGradient>
                {/*Gradient 부분 end*/}

                <Text style={{ color: '##3b3e4c', fontSize: 14, paddingLeft: 16, paddingRight: 16, paddingTop: 10, fontFamily: 'Spoqa Han Sans Bold' }}>다음 24시간</Text>
                <Weather_BasicFlatList weatherData={this.state.weatherData} />

                <Text style={{ color: '##3b3e4c', fontSize: 14, paddingLeft: 16, paddingRight: 16, paddingTop: 10, fontFamily: 'Spoqa Han Sans Bold' }}>풍속</Text>
                <Wave_BasicFlatList weatherData={this.state.weatherData} />
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
