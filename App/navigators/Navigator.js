import {
    createStackNavigator,
} from 'react-navigation';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import SignInTeacher from '../screens/SignInTeacher';
import SignInStudent from '../screens/SignInStudent';
import FindDevice from '../screens/FindDevice';
import Main from '../screens/Main';
import MainTabNavigator from './MainTabNavigator';

const Navigator = createStackNavigator({
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    SignInTeacher: { screen: SignInTeacher},
    SignInStudent: { screen: SignInStudent},  
    FindDevice: {screen: FindDevice},
    MainTabNavigator: {screen: MainTabNavigator},  
    Main: { screen: Main },
},{ 
    initialRouteName: 'Main',
});

export default Navigator;
