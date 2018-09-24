import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';

export default class SignInStudent extends Component {

    render() {

        return (
            <View style={styles.container}>
                <Text>SignInStudent</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});