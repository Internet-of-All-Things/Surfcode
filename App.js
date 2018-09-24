import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import SurfCodeMainScreenNavigator from "./SurfCode"
import {AddButton} from "./components/AddButton";
export default class App extends Component {
  state = {
    isLoaded: true
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
              <View style={styles.loading}>
                <Text style={styles.loadingText}>SurfCode</Text>
              </View>
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