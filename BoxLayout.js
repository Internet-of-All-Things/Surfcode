import React, { Component } from "react";
import { StyleSheet, Text, View, ViewPagerAndroid } from "react-native";

export default class BoxLayout extends Component {
    handleSettingsPress = () => {
        this.props.navigation.navigate('../Bluetooth');
      };
    render() {
        return (
            <View style={styles.container} onPress={this.handleSettingsPress}>
                {/* <Icon type='entypo' name="user" size={24} />
                <View style={styles.data}>
                    <Icon type='material-community' name="temperature-celsius" size={10} />
                    <Icon type='font-awesome' name="heart" size={10} />
                    <Icon type='font-awesome' name="heartbeat" size={10} />
                </View> */}
                <View style={styles.data}>
                    <Text>12</Text>
                    <Text>12</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        margin : 10,
        width:'40%',
        height:'20%',
        padding: 10,
        backgroundColor: "#00ff00"
    },
    user:{
        flex: 7
    },
    data:{
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});