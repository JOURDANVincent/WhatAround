import React, { useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack'


import SplashScreen from '../screens/SplashScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'


const Stack = createStackNavigator();


const ConnectionStackNavigator = ( props ) => {

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
        
        </Stack.Navigator>

    );
};

export default ConnectionStackNavigator;
