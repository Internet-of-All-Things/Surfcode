/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BluetoothManager from './App/utils/BluetoothManager';

//BluetoothManager.getBluetoothManager().enable();
AppRegistry.registerComponent(appName, () => App);
