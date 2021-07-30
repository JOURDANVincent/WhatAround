import React, { useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack'


import SplashScreen from '../../screens/OLD/SplashScreen'
import LoginScreen from '../../screens/OLD/LoginScreen'
import RegisterScreen from '../../screens/RegisterScreen'
import RegisterScreen2 from '../screens/RegisterScreen2'
import RegisterScreen3 from '../screens/RegisterScreen3'


const Stack = createStackNavigator();


const MainStackNavigator = ( props ) => {

    const { currentPosition, search, setSearch, setConnection } = props
    
    return (
        
        <Stack.Navigator
            initialRouteName='Splash'
        >
            <Stack.Screen
                name="Splash"
                options={{ 
                    title: 'Splash',
                    header: (props) => null
                }}
            >
                {props => <SplashScreen {...props} setConnection={setConnection} />}
            </Stack.Screen>

            <Stack.Screen
                name="Login"
                options={{ 
                    title: 'Connexion',
                }}
            >
                {props => <LoginScreen {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name="Register"
                options={{ 
                    title: 'Inscription',
                }}
            >
                {props => <RegisterScreen {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name="Register2"
                options={{ 
                    title: 'Inscription2',
                }}
            >
                {props => <RegisterScreen2 {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name="Register3"
                options={{ 
                    title: 'Inscription3',
                }}
            >
                {props => <RegisterScreen3 {...props} />}
            </Stack.Screen>
        
        </Stack.Navigator>

    );
};

export default MainStackNavigator;
