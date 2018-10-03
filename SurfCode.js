import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ViewPagerAndroid,
  TouchableHighlight
} from "react-native";

//import Icon from 'react-native-vector-icons/Ionicons'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
//import Icon from 'react-native-vector-icons/FontAwesome';

import FirstScreen from "./tabs/FirstScreen";
import SecondScreen from "./tabs/SecondScreen";

//import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
//import { createMaterialTopTabNavigator, StackNavigator } from 'react-navigation'
import { createBottomTabNavigator } from "react-navigation";
import { AddButton } from "./components/AddButton";
this.state = {
  addingBtnVisable: false
};

const SurfCodeMainScreenNavigator = createBottomTabNavigator(
  {
    //createMaterialBottomTabNavigator({

    Biometrics: {
      screen: FirstScreen,
      navigationOptions: ({ navigation }) => ({
        title: "생체정보",
        tabBarLabel: "Biometrics",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="heart" color={tintColor} size={24} />
        ),
        tabBarColor: "#f2f2f2",
        tabBarVisible: homeTabbarVisible(navigation),        
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          this.state.addingBtnVisable = true;
          console.log(`~~~~navigation = ${JSON.stringify(navigation)}`);  
          //Navigation.push(SurfCodeMainScreenNavigator, { component: { name: 'NEXT_PAGE', options: { bottomTabs: { visible: false, drawBehind: true, animate: true } } }, });                  
          console.log(`~~~~navigation = ${(Navigation)}`);  
          defaultHandler();
        }
      })
    },
    Book: {
      screen: SecondScreen,
      navigationOptions: ({ navigation }) => ({
        title: "파도정보",
        tabBarLabel: "WeatherInfo",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="weather-lightning-rainy" color={tintColor} size={24} />
        ),
        tabBarColor: "#ff0000",
        tabBarOnPress: ({ navigation, defaultHandler }) => {         
          this.state.addingBtnVisable = false;
          defaultHandler();
        }
      })
    },
    Adding: {
      screen: () => null,
      navigationOptions: ({ navigation }) => ({
        //tabBarVisible: this.state.addingBtnVisable,
        tabBarIcon: <AddButton />
      })
    },
    WeatherInfo: {
      screen: SecondScreen,      
      navigationOptions: ({ navigation }) => ({
        title: "파도정보",
        tabBarLabel: "WeatherInfo",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="weather-lightning-rainy" color={tintColor} size={24} />
        ),
        tabBarColor: "#ff0000"
      })
    },
    Setting: {
      screen: SecondScreen,
      navigationOptions: ({ navigation }) => ({
        title: "파도정보",
        tabBarLabel: "Setting",        
        tabBarIcon: ({ tintColor }) => (
          <Icon name="weather-lightning-rainy" color={tintColor} size={24} />
        ),
        tabBarColor: "#ff0000"
      })
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "#000000",
      inactiveTintColor: "#000000",
      //order: ["Biometrics", "Book", "Adding", "WeatherInfo", "Setting"], //표시 순서
      style: {
        backgroundColor: "#f9f9fa"
      },
      tabStyle: {}
    }
  }
);

SurfCodeMainScreenNavigator.navigationOptions = ({ navigation }) => {
  alert(navigation.state.index);
  if (navigation.state.index == 0) {
    this.state.addingBtnVisable = true;
  } else {
    this.state.addingBtnVisable = false;
  }
  // const routes = navigation.state.routes;
  // if (routes && routes.length > 0) {
  //     const route = routes[routes.length - 1];
  //     if (route.routeName == 'Biometrics') {  // match by last routeName
  //         this.state.addingBtnVisable = true;
  //     }
  //     else {
  //         this.state.addingBtnVisable = false;
  //     }
  // }
};
const homeTabbarVisible = navigation => {
  //alert(`!!!!navigation = ${JSON.stringify(navigation)}`);
 //console.log(`!!!!navigation = ${JSON.stringify(navigation)}`);
  //console.log(`!!!!navigation2 = ${JSON.stringify(SurfCodeMainScreenNavigator.navigationOptions)}`);
  const routes = navigation.state.routes;
  if (navigation.state.routeName == "Biometrics") {
    this.state.addingBtnVisable = true;
  } else {
    this.state.addingBtnVisable = false;
  }
  if (routes && routes.length > 0) {
    const route = routes[routes.length - 1];
    if (route.routeName == "Biometrics") {
      // match by last routeName
      return false;
    }
  }
  return true;
};
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
