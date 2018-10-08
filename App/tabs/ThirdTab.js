import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

export default class SecondScreen extends Component {
     render() {
        return (
            <View style={styles.container}>
                <Text>Ths is tab 2</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
});