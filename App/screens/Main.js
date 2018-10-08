import React, { Component, } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    PermissionsAndroid,
    BackHandler,
} from 'react-native';

import MainTabNavigator from '../navigators/MainTabNavigator';
import PermissionManager from '../utils/PermissionManager';

export default class Main extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionManager.getPermissions(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
        }
    }

    goBack = async () =>{
        BackHandler.exitApp();
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

    render() {
        return (
            <View style={styles.containers}>
                <MainTabNavigator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containers: {
        flex: 1,
    },
});