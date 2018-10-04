import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import SurfCodeMainScreenNavigator from "./App/navigators/SurfCodeTabnNavigator"

import LoginNaviagtor from "./App/navigators/LoginNavigator";

export default class App extends Component {
  state = {
    isAuth: false 
  }

  render() {
    const { isAuth } = this.state;
    return (
      <View style={styles.container}>
   
        {isAuth ? (
          <SafeAreaView style={{ flex: 1 }}>
          <LoginNaviagtor />
      </SafeAreaView>
        ) : (
          <SafeAreaView style={{ flex: 1 }}>           
          <SurfCodeMainScreenNavigator />            
        </SafeAreaView>)
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loading: {
    flex: 1,
    backgroundColor: '#42cef4',
    justifyContent: 'flex-end',
    paddingLeft: 25
  },
  loadingText: {
    fontSize: 40,
    marginBottom: 100
  }
});