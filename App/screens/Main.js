import React, { Component, } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    PermissionsAndroid,
    BackHandler,
} from 'react-native';

import MainScreen from '../tabs/MainScreen';
import PermissionManager from '../utils/PermissionManager';
import RNExitApp from 'react-native-exit-app';

export default class Main extends Component {

    state = {
        first : true,
    }

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            let array = [];
            array.push(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
            array.push(PermissionsAndroid.PERMISSIONS.SEND_SMS)
            PermissionManager.getMultiplePermissions(array);
        }
    }

    goBack = async () =>{
        //BackHandler.exitApp();
        RNExitApp.exitApp();
    }

    componentWillMount(){
        console.log("componentWillMount!!!!!!!!!!!!!!!!!!!!~~~~~~");
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.goBack();
            return true;
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    componentDidUpdate(){
        console.log("Main.js componentDidUpdate")
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.goBack();
            return true;
        });
    }

    render() {
        return (
            <View style={styles.containers}>
                <MainScreen/>
                {/* <MainTabNavigator /> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containers: {
        flex: 1,
    },
});