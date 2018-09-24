import {
    createStackNavigator,
} from 'react-navigation';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import SignInTeacher from '../screens/SignInTeacher';
import SignInStudent from '../screens/SignInStudent';

const LoginNavigator = createStackNavigator({
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    SignInTeacher: { screen: SignInTeacher},
    SignInStudent: { screen: SignInStudent},
},{ 
    initialRouteName: 'Login',
});

export default LoginNavigator;