import {
    createStackNavigator,
} from 'react-navigation';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import SignInTeacher from '../screens/SignInTeacher';
import SignInStudent from '../screens/SignInStudent';
import MainTabNavigator from './MainTabNavigator';

const Navigator = createStackNavigator({
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    SignInTeacher: { screen: SignInTeacher},
    SignInStudent: { screen: SignInStudent},    
    MainTabNavigator: { screen: MainTabNavigator,
        navigationOptions: {
            header: null
        } },
},{ 
    initialRouteName: 'Login',
});

export default Navigator;