import React, { useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack'


import MapScreen from '../screens/MapScreen'


const Stack = createStackNavigator();


const UnknownStackNavigator = ( props ) => {

    const { currentPosition, search, setSearch } = props

    
    return (
        
        <Stack.Navigator
            initialRouteName='Splash'
        >

            <Stack.Screen
                name="Home"
                options={{ 
                    title: 'Accueil',
                    header: (props) => null
                }}
            >
                {props => <MapScreen {...props} currentPosition={currentPosition} search={search} setSearch={setSearch} />}
            </Stack.Screen>

        </Stack.Navigator>

    );
};

export default UnknownStackNavigator;
