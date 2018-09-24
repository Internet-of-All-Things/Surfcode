import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, ViewPagerAndroid, TouchableHighlight } from "react-native";


//import Icon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
//import Icon from 'react-native-vector-icons/FontAwesome';

import FirstScreen from "./tabs/FirstScreen"
import SecondScreen from "./tabs/SecondScreen"

//import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
//import { createMaterialTopTabNavigator, StackNavigator } from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation';
import {AddButton} from "./components/AddButton";

const SurfCodeMainScreenNavigator = createBottomTabNavigator({//createMaterialBottomTabNavigator({
    Biometrics: {
        screen: FirstScreen,
        navigationOptions:() => ({
            title: '생체정보',
            tabBarLabel: 'Biometrics',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="heart" color={tintColor} size={24}/>
            ),
            tabBarColor: '#f2f2f2',
        })
    },
    Book: {
        screen: SecondScreen,
        navigationOptions:() => ({
            title: '파도정보',
            tabBarLabel: 'WeatherInfo',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="weather-lightning-rainy" color={tintColor} size={24} />
            ),
            tabBarColor: '#ff0000'
        })
    },
    Adding: {
        screen: () => null,
        navigationOptions: () => ({
            tabBarIcon: <AddButton />
        })
    },
    WeatherInfo: {
        screen: SecondScreen,
        navigationOptions:() => ({
            title: '파도정보',
            tabBarLabel: 'WeatherInfo',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="weather-lightning-rainy" color={tintColor} size={24} />
            ),
            tabBarColor: '#ff0000'
        })
    },
    Setting: {
        screen: SecondScreen,
        navigationOptions:() => ({
            title: '파도정보',
            tabBarLabel: 'Setting',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="weather-lightning-rainy" color={tintColor} size={24} />
            ),
            tabBarColor: '#ff0000'
        })
    }
}, {
    tabBarOptions: {
        showLabel: false,
        activeTintColor: '#000000',
        inactiveTintColor: '#000000',
        order: ['Biometrics', 'Book', 'Adding', 'WeatherInfo', 'Setting'],//표시 순서
        style: {
            backgroundColor: '#f9f9fa'
        },
        tabStyle: {},
    }
})
// }, {
//         initialRouteName: 'Biometrics',
//         order: ['Biometrics', 'Book', 'Adding', 'WeatherInfo', 'Setting'],//표시 순서
//         tabBarPosition: 'bottom',
//         swipeEnabled: true,
//         animationEnabled: true,
//         activeTintColor: 'orange',
//         inactiveTintColor: 'grey',
//         barStyle: {
//             backgroundColor: '#f2f2f2',
//             borderBottomWidth: 0.5,
//             borderBottomColor: 'grey'
//         },
//         indicatorStyle: {
//             height: 2
//         },
//         shifting: true
//     })

export default SurfCodeMainScreenNavigator;