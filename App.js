import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView,StatusBar } from 'react-native';

import Naviagtor from "./App/navigators/Navigator";
import NavigationService from './App/utils/NavigationService';

export default class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <SafeAreaView style={{ flex: 1 }}>
          <Naviagtor 
          ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}/>
        </SafeAreaView>
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