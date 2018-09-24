import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';

export default class SignInTeacher extends Component {

    render() {

        return (
            <View style={styles.container}>
                <Text>SignInTeacher</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});