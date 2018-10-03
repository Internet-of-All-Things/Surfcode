import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import SurfCodeMainScreenNavigator from "./SurfCode"
import {AddButton} from "./components/AddButton";

import LoginNaviagtor from "./navigators/LoginNavigator";
import firebase from 'react-native-firebase';

export default class App extends Component {
  state = {
    isLoaded: false 
  }

  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    firebase.auth().signInAnonymously()
      .then(() => {
        this.setState({
          isAuthenticated: true,
        });
      });
  }

  render() {
    const { isLoaded } = this.state;
    return (
      <View style={styles.container}>
      
        {isLoaded ? (
          <SafeAreaView style={{ flex: 1 }}>           
            <SurfCodeMainScreenNavigator />            
          </SafeAreaView>
        ) : (
          <SafeAreaView style={{ flex: 1 }}>
              <LoginNaviagtor />
          </SafeAreaView>
          )}
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